/**
 * Aplica en Sanity los cambios de contenido del 5 de noviembre, sin tocar el resto de lo editado:
 *   - Distribuidores: la misma lista, en orden alfabético, en todas las regiones del directorio.
 *   - Clever RC: video teaser en la ficha del producto.
 *
 * Uso:
 *   pnpm sanity:update            → aplica los cambios
 *   pnpm sanity:update --dry-run  → muestra qué cambiaría, sin subir nada
 *
 * Variables necesarias en .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */
import { defaultDistributors, defaultProducts } from "../lib/cms/defaults";
import { client, dataset, dryRun, newKey, projectId, toSanity } from "./sanity-shared";

type Region = { _key: string; place?: string };

async function main() {
  console.log(`Sanity · proyecto ${projectId} · dataset ${dataset}${dryRun ? " · simulación" : ""}`);

  // Distribuidores: se conserva cada región (nombre y orden) y se reemplaza su lista
  const names = defaultDistributors.directory.regions[0].distributors.map((d) => d.name);
  console.log(`→ Distribuidores en todas las regiones: ${names.join(", ")}`);
  if (!dryRun) {
    const doc = await client.getDocument<{ directory?: { regions?: Region[] } }>("distributorsPage");
    const regions = doc?.directory?.regions ?? [];
    if (!regions.length) console.warn("  ! No hay regiones en la página de distribuidores; se omite.");
    else {
      const patch = client.patch("distributorsPage");
      for (const region of regions) {
        patch.set({ [`directory.regions[_key=="${region._key}"].distributors`]: names.map((name) => ({ _key: newKey(), _type: "distributor", name })) });
      }
      await patch.commit();
      console.log(`  ${regions.length} regiones actualizadas`);
    }
  }

  // Video teaser de Clever RC
  const clever = defaultProducts.find((p) => p.slug === "clever-rc");
  if (clever) {
    const trainingVideos = await toSanity(clever.trainingVideos as never, ["trainingVideos"]);
    console.log("→ Clever RC: video teaser en la ficha");
    if (!dryRun) {
      const exists = await client.getDocument("product-clever-rc");
      if (exists) await client.patch("product-clever-rc").set({ trainingVideos }).commit();
      else console.warn("  ! No existe product-clever-rc en Sanity; se omite.");
    }
  }

  console.log("\nListo. Los cambios se ven en el sitio en máximo 1 minuto.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
