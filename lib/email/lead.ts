import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { renderLeadEmail, type Lead } from "./lead-template";
import { LeadEmailError, sendLeadEmail } from "./send";
import { saveLead, setLeadEmailStatus } from "./store";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Lee un campo de texto del cuerpo, recortado y con un largo máximo */
export const field = (body: Record<string, unknown>, key: string, max = 300) =>
  typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "";

/** Campo trampa: los humanos no lo ven; si viene lleno, es un bot */
export const HONEYPOT = "sitio_web";

export async function readBody(request: Request) {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Valida lo mínimo, arma la plantilla y envía el correo del prospecto */
export async function deliverLead(lead: Lead, honeypot: string, consent: string) {
  // A un bot se le responde como si todo hubiera salido bien, sin enviar nada
  if (honeypot) return NextResponse.json({ success: true });

  if (!consent) {
    return NextResponse.json({ error: "Debes autorizar el tratamiento de tus datos personales." }, { status: 400 });
  }

  if (!lead.name || !lead.phone || !EMAIL.test(lead.email)) {
    return NextResponse.json({ error: "Revisa el nombre, el celular y el correo electrónico." }, { status: 400 });
  }

  // Primero se guarda en el administrador; así el prospecto queda registrado aunque el correo falle
  const saved = await saveLead(lead);

  try {
    const settings = await getSiteSettings();
    const logo = settings.logos.light?.local || "/brand/vatech-colombia-white.png";
    const fields = [...lead.fields, { label: "Autorización de datos", value: "Sí, aceptó la política de privacidad" }];
    const email = renderLeadEmail({ ...lead, fields }, {
      siteName: settings.siteName,
      siteUrl: SITE_URL,
      logoUrl: absoluteUrl(logo),
      address: settings.contact.addressLines.join(", "),
    });
    const { id } = await sendLeadEmail({ ...email, replyTo: lead.email });
    await setLeadEmailStatus(saved, "Enviado");
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error(`[Prospecto] No se pudo enviar el correo (${lead.kind}):`, error);
    const code = error instanceof LeadEmailError ? error.code : "error_interno";
    await setLeadEmailStatus(saved, `No enviado (${code})`);
    // Si quedó guardado en el administrador, la solicitud no se pierde
    if (saved) return NextResponse.json({ success: true, guardado: true, correo: code });
    return NextResponse.json({ error: "No se pudo enviar la solicitud por correo.", codigo: code }, { status: 502 });
  }
}
