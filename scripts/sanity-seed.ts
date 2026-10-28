/**
 * Carga inicial del contenido del sitio en Sanity.
 *
 * Sube el contenido actual (textos, productos, logos e imágenes) usando el token de escritura.
 * Uso:
 *   pnpm sanity:seed            → crea solo los documentos que aún no existen (no pisa ediciones)
 *   pnpm sanity:seed --force    → reemplaza todos los documentos con el contenido por defecto
 *   pnpm sanity:seed --dry-run  → muestra lo que se cargaría, sin conectarse a Sanity
 *
 * Variables necesarias en .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */
import {
  defaultAbout,
  defaultDistributors,
  defaultHome,
  defaultPhilosophy,
  defaultProducts,
  defaultProductsPage,
  defaultSettings,
  defaultWorld,
} from "../lib/cms/defaults";
import { client, dataset, dryRun, projectId, toSanity, uploaded, type Json } from "./sanity-shared";

const force = process.argv.includes("--force");

const saved: Record<string, unknown>[] = [];

async function save(doc: { _id: string; _type: string; [key: string]: Json }) {
  if (dryRun) {
    saved.push(doc);
    return;
  }
  if (force) await client.createOrReplace(doc);
  else await client.createIfNotExists(doc);
}

async function main() {
  console.log(`Sanity · proyecto ${projectId} · dataset ${dataset}${force ? " · reemplazando documentos" : ""}`);

  if (!force && !dryRun) {
    const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, {
      ids: ["siteSettings", "homePage", "aboutPage", "philosophyPage", "worldNetworkPage", "distributorsPage", "productsPage", ...defaultProducts.map((p) => `product-${p.slug}`)],
    });
    if (existing.length) console.log(`  Ya existen ${existing.length} documentos; se conservan (usa --force para reemplazarlos).`);
  }

  const singletons: [string, unknown][] = [
    ["siteSettings", defaultSettings],
    ["homePage", defaultHome],
    ["aboutPage", defaultAbout],
    ["philosophyPage", defaultPhilosophy],
    ["worldNetworkPage", defaultWorld],
    ["distributorsPage", defaultDistributors],
    ["productsPage", { ...defaultProductsPage, detailLabels: defaultProductsPage.detailLabels }],
  ];

  for (const [id, content] of singletons) {
    process.stdout.write(`→ ${id}… `);
    await save({ _id: id, _type: id, ...((await toSanity(content)) as object) });
    console.log("listo");
  }

  for (const product of defaultProducts) {
    process.stdout.write(`→ producto ${product.name}… `);
    const { slug, ...rest } = product;
    await save({
      _id: `product-${slug}`,
      _type: "product",
      slug: { _type: "slug", current: slug },
      ...((await toSanity(rest)) as object),
    });
    console.log("listo");
  }

  if (dryRun) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync("sanity-seed-preview.json", JSON.stringify(saved, null, 2));
    console.log("\nVista previa guardada en sanity-seed-preview.json (no se subió nada).");
  }
  console.log(`\nCarga completa: ${singletons.length} páginas, ${defaultProducts.length} productos, ${uploaded.size} imágenes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
