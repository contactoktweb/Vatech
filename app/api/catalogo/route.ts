import { deliverLead, field, HONEYPOT, readBody } from "@/lib/email/lead";
import { getProduct } from "@/lib/cms";
import { NextResponse } from "next/server";

// Descarga de catálogo desde la ficha de un producto: avisa al equipo de mercadeo con los datos del prospecto
export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });

  const product = await getProduct(field(body, "producto", 120));
  if (!product) return NextResponse.json({ error: "Producto no encontrado." }, { status: 400 });

  const name = field(body, "nombre");
  const email = field(body, "correo", 200);
  const phone = field(body, "celular", 40);
  const city = field(body, "ciudad", 120);
  if (!city) return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });

  const hasPdf = !!product.catalogPdf?.local;

  return deliverLead(
    {
      kind: "Descarga de catálogo",
      source: `Ficha de ${product.name}`,
      name,
      email,
      phone,
      fields: [
        { label: "Nombre completo", value: name },
        { label: "Equipo", value: product.name },
        { label: "Correo", value: email, href: `mailto:${email}` },
        { label: "Celular / WhatsApp", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
        { label: "Ciudad", value: city },
        { label: "Catálogo", value: hasPdf ? "Descargado desde el sitio" : "Este equipo no tiene catálogo PDF en el sitio: enviarlo por correo" },
      ],
    },
    field(body, HONEYPOT),
    field(body, "autorizacion"),
  );
}
