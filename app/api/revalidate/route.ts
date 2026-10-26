import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Webhook de Sanity: al publicar un cambio, el sitio se actualiza al instante (sin esperar el minuto de caché).
// Se configura en sanity.io/manage → API → Webhooks, con la URL https://<dominio>/api/revalidate y el secreto SANITY_REVALIDATE_SECRET.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Falta SANITY_REVALIDATE_SECRET" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
  if (!isValidSignature) return NextResponse.json({ message: "Firma inválida" }, { status: 401 });

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
}
