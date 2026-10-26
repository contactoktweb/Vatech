import { dataset, projectId } from "../env";

// Convierte documentos de Sanity a la forma que usan los componentes:
// imágenes y archivos → { local, source, alt }, slugs → texto, sin claves internas (_key, _type…).

const IMAGE_REF = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/;
const FILE_REF = /^file-([a-f0-9]+)-(\w+)$/;

export function imageUrl(ref: string) {
  const match = IMAGE_REF.exec(ref);
  if (!match) return "";
  const [, id, size, ext] = match;
  const format = ext === "svg" || ext === "gif" ? "" : "?auto=format&fit=max&w=2400";
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${ext}${format}`;
}

export function fileUrl(ref: string) {
  const match = FILE_REF.exec(ref);
  if (!match) return "";
  const [, id, ext] = match;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

type Raw = Record<string, unknown>;

const isObject = (value: unknown): value is Raw => typeof value === "object" && value !== null && !Array.isArray(value);
const assetRef = (value: unknown) => (isObject(value) && isObject(value.asset) ? String(value.asset._ref ?? "") : "");

export function fromSanity(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(fromSanity).filter((item) => item !== undefined);
  if (!isObject(value)) return value;

  const type = value._type;

  // Imagen con texto alternativo
  if (type === "image" || type === "imageWithAlt") {
    const url = imageUrl(assetRef(value));
    return url ? { local: url, source: url, alt: (value.alt as string) || undefined } : undefined;
  }

  // Archivo: se prefiere el archivo subido; si no, la URL escrita
  if (type === "cmsFile") {
    const url = fileUrl(assetRef(value.file)) || (value.url as string) || "";
    return url ? { local: url, source: url } : undefined;
  }

  // Video: enlace para insertar (texto) o archivo
  if (type === "productVideo") {
    if (value.kind === "embed") return (value.embedUrl as string) || undefined;
    return fromSanity(value.file);
  }

  if (type === "slug") return value.current;

  const out: Raw = {};
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("_")) continue;
    const converted = fromSanity(child);
    if (converted !== undefined && converted !== null) out[key] = converted;
  }
  return out;
}

/**
 * Combina el contenido de Sanity sobre el contenido por defecto:
 * un campo vacío en Sanity conserva el valor por defecto, y una lista escrita en Sanity reemplaza la lista por defecto.
 */
export function mergeContent<T>(base: T, override: unknown): T {
  if (override === undefined || override === null || override === "") return base;
  if (Array.isArray(base) || Array.isArray(override)) return (Array.isArray(override) ? override : base) as T;
  if (isObject(base) && isObject(override)) {
    const out: Raw = { ...base };
    for (const [key, value] of Object.entries(override)) out[key] = mergeContent((base as Raw)[key], value);
    return out as T;
  }
  return override as T;
}
