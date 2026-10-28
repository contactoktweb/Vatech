/**
 * Aplica en Sanity los cambios de contenido del 28 de octubre, sin tocar el resto de lo editado:
 *   - Redes sociales: sin TikTok y con el YouTube de Vatech America.
 *   - Imágenes nuevas o de mejor calidad en las características de Green X16, Green X18, PaX-i,
 *     EzOrtho, EzSensor Classic y Ez3D-i.
 *
 * Uso:
 *   pnpm sanity:update            → aplica los cambios
 *   pnpm sanity:update --dry-run  → muestra qué cambiaría, sin subir nada
 *
 * Variables necesarias en .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */
import { defaultProducts, defaultSettings } from "../lib/cms/defaults";
import { client, dataset, dryRun, projectId, toSanity } from "./sanity-shared";

const PRODUCTS = ["green-x16", "green-x18", "green-x16-green-x18", "pax-i", "ezortho", "ezsensor-classic", "ez3d-i"];

type SanityFeature = { _key: string; title?: string; images?: { asset?: { _ref?: string } }[] };

async function main() {
  console.log(`Sanity · proyecto ${projectId} · dataset ${dataset}${dryRun ? " · simulación" : ""}`);

  // Redes sociales
  const social = await toSanity(defaultSettings.social, ["social"]);
  console.log(`→ Redes sociales: ${defaultSettings.social.map((s) => s.platform).join(", ")}`);
  if (!dryRun) await client.patch("siteSettings").set({ social }).commit();

  // Imágenes de características, buscando cada característica por su título
  for (const slug of PRODUCTS) {
    const product = defaultProducts.find((p) => p.slug === slug);
    if (!product) continue;
    const id = `product-${slug}`;
    const doc = dryRun ? null : await client.getDocument<{ features?: SanityFeature[] }>(id);
    if (!dryRun && !doc) {
      console.warn(`  ! No existe ${id} en Sanity; se omite.`);
      continue;
    }
    const patch = client.patch(id);
    let changes = 0;
    for (const feature of product.features) {
      if (!feature.images.length) continue;
      const target = doc?.features?.find((f) => f.title?.trim().toLowerCase() === feature.title.trim().toLowerCase());
      if (!dryRun && !target) {
        console.warn(`  ! ${product.name}: no se encontró la característica «${feature.title}»; se omite.`);
        continue;
      }
      const images = await toSanity(feature.images, ["images"]);
      if (target) patch.set({ [`features[_key=="${target._key}"].images`]: images });
      changes++;
    }
    console.log(`→ ${product.name}: ${changes} características con imágenes`);
    if (!dryRun && changes) await patch.commit();
  }

  console.log("\nListo. Los cambios se ven en el sitio en máximo 1 minuto.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
