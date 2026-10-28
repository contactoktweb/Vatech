// Plantilla del correo de nuevo prospecto, con los colores y el logo del sitio.
// Se arma con tablas y estilos en línea para que se vea igual en Gmail, Outlook y Apple Mail.

const RED = "#c92c36";
const DARK = "#151519";
const TEXT = "#2b2b30";
const MUTED = "#6d6d72";
const LINE = "#e7e7ea";
const SOFT = "#f5f5f6";
const FONT = "'Pretendard', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export type LeadField = { label: string; value: string; href?: string };

export type Lead = {
  /** Tipo de prospecto, p. ej. "Solicitud de cotización" */
  kind: string;
  /** Dónde se llenó el formulario, p. ej. "Formulario de contacto · Inicio" */
  source: string;
  name: string;
  email: string;
  phone: string;
  fields: LeadField[];
  message?: string;
};

type Brand = { siteName: string; siteUrl: string; logoUrl: string; address: string };

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

// Número para WhatsApp: solo dígitos; un celular colombiano de 10 dígitos recibe el indicativo 57
export const whatsappNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 && digits.startsWith("3") ? `57${digits}` : digits;
};

const bogotaDate = () =>
  new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short", timeZone: "America/Bogota" }).format(new Date());

function button(href: string, label: string, primary: boolean) {
  const style = primary
    ? `background:${RED};color:#ffffff;border:1px solid ${RED};`
    : `background:#ffffff;color:${DARK};border:1px solid #cfcfd4;`;
  return `<a href="${escapeHtml(href)}" style="${style}display:inline-block;padding:13px 20px;border-radius:999px;font-family:${FONT};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:.01em">${label}</a>`;
}

export function renderLeadEmail(lead: Lead, brand: Brand) {
  const date = bogotaDate();
  const wa = whatsappNumber(lead.phone);
  const subjectName = lead.name.trim();
  const rows = lead.fields
    .filter((field) => field.value.trim())
    .map(
      (field, index) => `<tr>
        <td style="padding:14px 18px;${index ? `border-top:1px solid ${LINE};` : ""}width:38%;font-family:${FONT};font-size:12px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${escapeHtml(field.label)}</td>
        <td style="padding:14px 18px;${index ? `border-top:1px solid ${LINE};` : ""}font-family:${FONT};font-size:15px;color:${TEXT};vertical-align:top">${
          field.href ? `<a href="${escapeHtml(field.href)}" style="color:${RED};text-decoration:none">${escapeHtml(field.value)}</a>` : escapeHtml(field.value)
        }</td>
      </tr>`,
    )
    .join("");

  const message = lead.message?.trim()
    ? `<tr><td style="padding:28px 40px 0">
        <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;font-weight:800;color:${RED};letter-spacing:.18em;text-transform:uppercase">Mensaje</p>
        <div style="background:${SOFT};border-left:3px solid ${RED};padding:18px 20px;font-family:${FONT};font-size:15px;line-height:1.65;color:${TEXT};white-space:pre-line">${escapeHtml(lead.message.trim())}</div>
      </td></tr>`
    : "";

  const replySubject = encodeURIComponent(`Re: ${lead.kind} · ${brand.siteName}`);
  const actions = [
    button(`mailto:${lead.email}?subject=${replySubject}`, "Responder por correo", true),
    wa ? button(`https://wa.me/${wa}`, "Escribir por WhatsApp", false) : "",
  ]
    .filter(Boolean)
    .join(`<span style="display:inline-block;width:10px"></span>`);

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(lead.kind)} · ${escapeHtml(subjectName)}</title>
</head>
<body style="margin:0;padding:0;background:#ececee">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(`${lead.kind}: ${subjectName} · ${lead.phone} · ${lead.email}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ececee">
  <tr><td align="center" style="padding:32px 14px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
      <tr><td style="background:${DARK};padding:30px 40px 26px">
        <a href="${escapeHtml(brand.siteUrl)}" style="text-decoration:none"><img src="${escapeHtml(brand.logoUrl)}" width="190" alt="${escapeHtml(brand.siteName)}" style="display:block;width:190px;max-width:100%;height:auto;border:0"></a>
      </td></tr>
      <tr><td style="height:4px;background:${RED};font-size:0;line-height:0">&nbsp;</td></tr>
      <tr><td style="padding:36px 40px 6px">
        <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;font-weight:800;color:${RED};letter-spacing:.18em;text-transform:uppercase">Nuevo prospecto · ${escapeHtml(lead.kind)}</p>
        <h1 style="margin:0 0 10px;font-family:${FONT};font-size:30px;line-height:1.12;font-weight:800;color:${DARK};letter-spacing:-.02em">${escapeHtml(subjectName)}</h1>
        <p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.6;color:${MUTED}">${escapeHtml(lead.source)} · ${escapeHtml(date)}</p>
      </td></tr>
      <tr><td style="padding:24px 40px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:10px;border-collapse:separate">${rows}</table>
      </td></tr>
      ${message}
      <tr><td style="padding:30px 40px 38px">${actions}</td></tr>
      <tr><td style="background:${SOFT};border-top:1px solid ${LINE};padding:22px 40px">
        <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED}">Este correo se envió automáticamente desde el sitio web de ${escapeHtml(brand.siteName)}. Al responder, el mensaje le llega directamente al prospecto.</p>
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED}">${escapeHtml(brand.address)} · <a href="${escapeHtml(brand.siteUrl)}" style="color:${RED};text-decoration:none">${escapeHtml(brand.siteUrl.replace(/^https?:\/\//, ""))}</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    `Nuevo prospecto · ${lead.kind}`,
    `${lead.source} · ${date}`,
    "",
    ...lead.fields.filter((field) => field.value.trim()).map((field) => `${field.label}: ${field.value}`),
    lead.message?.trim() ? `\nMensaje:\n${lead.message.trim()}` : "",
    "",
    `Responder: ${lead.email}${wa ? ` · WhatsApp: https://wa.me/${wa}` : ""}`,
    "",
    `${brand.siteName} · ${brand.siteUrl}`,
  ].join("\n");

  return { subject: `${lead.kind}: ${subjectName}`, html, text };
}
