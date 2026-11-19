// Envío de correos con Resend (https://resend.com/docs/api-reference/emails/send-email)
// Variables: RESEND_API_KEY (obligatoria), LEADS_FROM_EMAIL y LEADS_TO_EMAIL (opcionales)

export const LEADS_FROM = process.env.LEADS_FROM_EMAIL || "VATECH Colombia <info@vatechcolombia.com.co>";
export const LEADS_TO = (process.env.LEADS_TO_EMAIL || "marketing.colombia@vatechglobal.com")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

type Email = { subject: string; html: string; text: string; replyTo?: string };

/** Error de envío con un código corto (sin datos sensibles) para diagnosticar desde la respuesta del formulario */
export class LeadEmailError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

export async function sendLeadEmail({ subject, html, text, replyTo }: Email) {
  // Se limpian espacios y comillas que suelen colarse al pegar la clave en el panel de Vercel
  const apiKey = process.env.RESEND_API_KEY?.trim().replace(/^["']+|["']+$/g, "").trim();
  if (!apiKey) throw new LeadEmailError("sin_clave", "Falta la variable RESEND_API_KEY");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: LEADS_FROM, to: LEADS_TO, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });

  if (!response.ok) throw new LeadEmailError(`resend_${response.status}`, `Resend respondió ${response.status}: ${await response.text()}`);
  return (await response.json()) as { id: string };
}
