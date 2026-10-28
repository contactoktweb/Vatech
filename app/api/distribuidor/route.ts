import { deliverLead, field, HONEYPOT, readBody } from "@/lib/email/lead";
import { NextResponse } from "next/server";

// Postulación para ser distribuidor: envía el correo del prospecto al equipo de mercadeo
export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });

  const name = field(body, "nombre");
  const email = field(body, "correo", 200);
  const phone = field(body, "celular", 40);
  const city = field(body, "ciudad", 120);
  const message = field(body, "mensaje", 4000);

  if (!city) return NextResponse.json({ error: "Todos los campos obligatorios deben ser completados." }, { status: 400 });

  return deliverLead(
    {
      kind: "Quiero ser distribuidor",
      source: "Formulario de distribuidores",
      name,
      email,
      phone,
      message,
      fields: [
        { label: "Nombre / Empresa", value: name },
        { label: "Correo", value: email, href: `mailto:${email}` },
        { label: "Celular / WhatsApp", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
        { label: "Ciudad / Región", value: city },
      ],
    },
    field(body, HONEYPOT),
  );
}
