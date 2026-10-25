import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, correo, celular, ciudad, mensaje } = body;

    if (!nombre || !correo || !celular || !ciudad) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    // Correo de recepción de las postulaciones
    const targetEmail = process.env.DISTRIBUTOR_CONTACT_EMAIL || "marketing.colombia@vatechglobal.com";

    // Log para trazabilidad de leads de distribución
    console.log("[NUEVO LEAD DISTRIBUIDOR VATECH]:", {
      targetEmail,
      nombre,
      correo,
      celular,
      ciudad,
      mensaje,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Solicitud registrada con éxito. Notificación enviada a revisión.",
      targetEmail,
      lead: { nombre, correo, celular, ciudad, mensaje },
    });
  } catch (error) {
    console.error("Error al procesar solicitud de distribuidor:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
