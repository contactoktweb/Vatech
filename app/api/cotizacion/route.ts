import { deliverLead, field, HONEYPOT, readBody } from "@/lib/email/lead";
import { NextResponse } from "next/server";

// Solicitud de cotización del formulario de contacto de la página de inicio
export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });

  const name = field(body, "name");
  const email = field(body, "email", 200);
  const phone = field(body, "phone", 40);
  const product = field(body, "product", 200);

  return deliverLead(
    {
      kind: "Solicitud de cotización",
      source: "Formulario de contacto · Inicio",
      name,
      email,
      phone,
      message: field(body, "message", 4000),
      fields: [
        { label: "Nombre", value: name },
        { label: "Equipo de interés", value: product },
        { label: "Correo", value: email, href: `mailto:${email}` },
        { label: "Celular / WhatsApp", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
      ],
    },
    field(body, HONEYPOT),
  );
}
