// Envío de correos con Resend (https://resend.com/docs/api-reference/emails/send-email)
// Variables: RESEND_API_KEY (obligatoria), LEADS_FROM_EMAIL y LEADS_TO_EMAIL (opcionales)

export const LEADS_FROM = process.env.LEADS_FROM_EMAIL || "VATECH Colombia <info@vatechcolombia.com.co>";
export const LEADS_TO = (process.env.LEADS_TO_EMAIL || "marketing.colombia@vatechglobal.com")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

type Email = { subject: string; html: string; text: string; replyTo?: string };

export async function sendLeadEmail({ subject, html, text, replyTo }: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Falta la variable RESEND_API_KEY");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: LEADS_FROM, to: LEADS_TO, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });

  if (!response.ok) throw new Error(`Resend respondió ${response.status}: ${await response.text()}`);
  return (await response.json()) as { id: string };
}
