import { productCatalog } from "../../lib/productCatalog";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SOCIAL, absoluteUrl } from "../../lib/site";

export const dynamic = "force-static";

// llms.txt: resumen en texto plano para asistentes de IA (GEO), generado desde el catálogo
export function GET() {
  const byCategory = new Map<string, typeof productCatalog>();
  for (const product of productCatalog) {
    byCategory.set(product.category, [...(byCategory.get(product.category) || []), product]);
  }

  const sections = [...byCategory.entries()].map(([category, products]) =>
    `## ${category}\n\n${products
      .map((p) => `- [${p.name}](${absoluteUrl(`/productos/${p.slug}`)}): ${p.summary}${p.isComingSoon ? " (Próximamente en Colombia)" : ""}`)
      .join("\n")}`,
  );

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

VATECH es una empresa coreana fundada en 1992, líder mundial en imagenología digital dental. ${SITE_NAME} es su presencia oficial en el país, con sede en Bogotá y red de distribuidores autorizados en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero y Cartagena.

## Contacto

- Correo: ${CONTACT.email}
- Teléfono y WhatsApp: ${CONTACT.phone} (${CONTACT.whatsapp})
- Dirección: ${CONTACT.address.street}, ${CONTACT.address.city}, Colombia
- Redes: ${SOCIAL.join(" · ")}

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
