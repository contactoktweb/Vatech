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
import { createReadStream, existsSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { Readable } from "node:stream";
import { createClient } from "next-sanity";
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

if (!dryRun && (!projectId || !token)) {
  console.error("Faltan variables: define NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_API_WRITE_TOKEN en .env.local");
  process.exit(1);
}

const client = createClient({ projectId: projectId || "dry-run", dataset, token, apiVersion: "2025-10-01", useCdn: false });

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);
const PUBLIC_DIR = join(process.cwd(), "public");

type Media = { local: string; source: string; alt?: string };
type Json = unknown;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isMedia = (v: unknown): v is Media => isObject(v) && typeof v.local === "string" && typeof v.source === "string";
const pathOf = (url: string) => decodeURIComponent(url.split("?")[0]);
const isImage = (m: Media) => IMAGE_EXT.has(extname(pathOf(m.local)).toLowerCase());

let keyCounter = 0;
const newKey = () => `k${(++keyCounter).toString(36)}${Math.random().toString(36).slice(2, 7)}`;

// Sube cada imagen una sola vez aunque se repita en varias páginas
const uploaded = new Map<string, Promise<string | null>>();

function uploadImage(media: Media): Promise<string | null> {
  const id = media.local || media.source;
  if (dryRun && !uploaded.has(id)) {
    const localFile = media.local.startsWith("/") ? join(PUBLIC_DIR, pathOf(media.local)) : "";
    if (localFile && !existsSync(localFile)) console.warn(`  ! Falta el archivo local ${media.local} (se usaría ${media.source})`);
    uploaded.set(id, Promise.resolve(`image-dryrun${uploaded.size}`));
  }
  if (!uploaded.has(id)) {
    uploaded.set(
      id,
      (async () => {
        const localFile = media.local.startsWith("/") ? join(PUBLIC_DIR, pathOf(media.local)) : "";
        try {
          if (localFile && existsSync(localFile)) {
            const asset = await client.assets.upload("image", createReadStream(localFile), { filename: basename(localFile) });
            return asset._id;
          }
          const url = media.source.startsWith("http") ? media.source : media.local.startsWith("http") ? media.local : "";
          if (!url) throw new Error("no existe el archivo local ni una URL de respaldo");
          const response = await fetch(url);
          if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);
          const asset = await client.assets.upload("image", Readable.fromWeb(response.body as never), { filename: basename(pathOf(url)) });
          return asset._id;
        } catch (error) {
          console.warn(`  ! No se pudo subir ${id}: ${(error as Error).message}`);
          return null;
        }
      })(),
    );
  }
  return uploaded.get(id)!;
}

async function image(media: Media) {
  const ref = await uploadImage(media);
  if (!ref) return undefined;
  return { _type: "imageWithAlt", asset: { _type: "reference", _ref: ref }, ...(media.alt ? { alt: media.alt } : {}) };
}

// Los videos y PDF se enlazan por su ruta en /public (no se suben); se pueden reemplazar subiendo el archivo en el Studio
const file = (media: Media) => ({ _type: "cmsFile", url: media.local });

// Tipo de cada elemento de lista según dónde está (debe coincidir con los esquemas en sanity/schemaTypes)
function itemType(path: string[]): string {
  const key = path[path.length - 1];
  const parent = path[path.length - 2];
  if (key === "navigation") return "navGroup";
  if (key === "items" && parent === "navigation[]") return "cmsLink";
  if (key === "links" || key === "anchors") return "cmsLink";
  if (key === "social") return "socialLink";
  if (key === "specs") return "specGroup";
  if (key === "items" && parent === "specs[]") return "specItem";
  if (key === "distributors") return "distributor";
  return `${key}Item`;
}

async function toSanity(value: Json, path: string[] = []): Promise<Json> {
  const key = path[path.length - 1];

  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      if (key === "trainingVideos") {
        if (typeof item === "string") out.push({ _key: newKey(), _type: "productVideo", kind: "embed", embedUrl: item });
        else if (isMedia(item)) out.push({ _key: newKey(), _type: "productVideo", kind: "file", file: file(item) });
        continue;
      }
      if (isMedia(item)) {
        const img = isImage(item) ? await image(item) : file(item);
        if (img) out.push({ _key: newKey(), ...img });
        continue;
      }
      if (isObject(item)) {
        out.push({ _key: newKey(), _type: itemType(path), ...((await toSanity(item, [...path.slice(0, -1), `${key}[]`])) as object) });
        continue;
      }
      out.push(item);
    }
    return out;
  }

  if (isMedia(value)) {
    if (!value.local && !value.source) return undefined;
    return isImage(value) ? image(value) : file(value);
  }

  if (isObject(value)) {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined || v === null || v === "") continue;
      const converted = await toSanity(v, [...path, k]);
      if (converted !== undefined) out[k] = converted;
    }
    return out;
  }

  return value;
}

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
