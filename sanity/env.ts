// Variables de Sanity. Se definen en .env.local (local) y en Vercel (producción).
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** true cuando hay un proyecto de Sanity configurado; si no, el sitio usa el contenido por defecto. */
export const isSanityConfigured = Boolean(projectId);
