// URL pública del sitio para SEO, datos estructurados y llms.txt
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vatechcolombia.com.co").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`);
