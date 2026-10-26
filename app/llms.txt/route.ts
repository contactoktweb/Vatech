import { getProducts, getSiteSettings } from "../../lib/cms";
import { absoluteUrl } from "../../lib/site";

export const revalidate = 3600;

// llms.txt: resumen en texto plano para asistentes de IA (GEO), generado desde el catálogo
export async function GET() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const { siteName: SITE_NAME, seo, contact } = settings;
  const byCategory = new Map<string, typeof products>();
  for (const product of products) {
    byCategory.set(product.category, [...(byCategory.get(product.category) || []), product]);
  }

  const sections = [...byCategory.entries()].map(([category, products]) =>
    `## ${category}\n\n${products
      .map((p) => `- [${p.name}](${absoluteUrl(`/productos/${p.slug}`)}): ${p.summary}${p.isComingSoon ? " (Próximamente en Colombia)" : ""}`)
      .join("\n")}`,
  );

  const body = `# ${SITE_NAME}

> ${seo.description}

VATECH es una empresa coreana fundada en 1992, líder mundial en imagenología digital dental. ${SITE_NAME} es su presencia oficial en el país, con sede en Bogotá y red de distribuidores autorizados en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero y Cartagena.

## Contacto

- Correo: ${contact.email}
- Teléfono y WhatsApp: ${contact.phoneDisplay} (https://wa.me/${contact.whatsappNumber})
- Dirección: ${contact.addressLines.join(", ")}
- Redes: ${settings.social.map((s) => s.url).join(" · ")}

## Páginas principales

- [Inicio](${absoluteUrl("/")})
- [Productos](${absoluteUrl("/productos")}): catálogo completo de equipos y software
- [Quiénes somos](${absoluteUrl("/quienes-somos")})
- [Filosofía VATECH](${absoluteUrl("/filosofia")})
- [Red mundial VATECH](${absoluteUrl("/red-mundial-vatech")}): oficinas en el mundo
- [Distribuidores oficiales](${absoluteUrl("/distribuidores")}): red en Colombia y cómo ser distribuidor

${sections.join("\n\n")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
