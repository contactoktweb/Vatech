import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

// Buscadores y rastreadores de IA (GEO) pueden leer todo el sitio salvo la API y el administrador
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/en-construccion"] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/", "/admin"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
