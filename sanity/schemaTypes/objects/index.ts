import { defineField, defineType } from "sanity";
import { DocumentIcon, ImageIcon, LinkIcon, PlayIcon, SearchIcon, ShareIcon, ThListIcon } from "../../icons";
import { str, txt } from "../helpers";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagen",
  type: "image",
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      description: "Describe la imagen en pocas palabras (accesibilidad y SEO).",
    }),
  ],
});

export const cmsLink = defineType({
  name: "cmsLink",
  title: "Enlace",
  type: "object",
  icon: LinkIcon,
  fields: [
    str("label", "Texto"),
    str("href", "Destino", { description: "Ruta interna (/productos), ancla (#contact) o URL completa (https://…)." }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const cmsFile = defineType({
  name: "cmsFile",
  title: "Archivo",
  type: "object",
  icon: DocumentIcon,
  description: "Sube el archivo desde tu computador.",
  fields: [
    defineField({ name: "file", title: "Archivo", type: "file" }),
    // Ruta interna usada por el contenido inicial; no se muestra en el Studio. Si se sube un archivo, se usa el archivo.
    str("url", "URL del archivo", { hidden: true }),
  ],
});

export const productVideo = defineType({
  name: "productVideo",
  title: "Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "kind",
      title: "Tipo",
      type: "string",
      options: { list: [{ title: "Archivo de video", value: "file" }, { title: "Enlace para insertar (YouTube, Vimeo)", value: "embed" }], layout: "radio" },
      initialValue: "file",
    }),
    defineField({ name: "file", title: "Archivo de video", type: "cmsFile", hidden: ({ parent }) => parent?.kind === "embed" }),
    defineField({
      name: "embedUrl",
      title: "Enlace para insertar",
      type: "string",
      description: "Ejemplo: https://www.youtube.com/embed/XXXX",
      hidden: ({ parent }) => parent?.kind !== "embed",
    }),
  ],
  preview: {
    select: { kind: "kind", url: "embedUrl", fileName: "file.file.asset.originalFilename" },
    prepare: ({ kind, url, fileName }) => ({ title: kind === "embed" ? url : fileName || "Archivo de video", media: PlayIcon }),
  },
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    str("title", "Título para Google", { description: "Ideal: menos de 60 caracteres." }),
    txt("description", "Descripción para Google", { rows: 3, description: "Ideal: entre 120 y 160 caracteres." }),
    defineField({ name: "ogImage", title: "Imagen al compartir", type: "imageWithAlt", description: "Se ve al compartir el enlace en redes y WhatsApp (1200 × 630)." }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Red social",
  type: "object",
  icon: ShareIcon,
  fields: [
    defineField({
      name: "platform",
      title: "Red",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "LinkedIn", value: "linkedin" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", title: "Enlace", type: "url", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "platform", subtitle: "url" } },
});

export const specGroup = defineType({
  name: "specGroup",
  title: "Característica",
  type: "object",
  icon: ThListIcon,
  fields: [
    str("key", "Característica", { description: "Ejemplo: TIEMPO DE ESCANEO" }),
    defineField({
      name: "items",
      title: "Valores",
      type: "array",
      of: [
        {
          type: "object",
          name: "specItem",
          title: "Valor",
          fields: [
            str("label", "Subetiqueta (opcional)", { description: "Ejemplo: Pano, Ceph, Con CEPH. Déjalo vacío si no aplica." }),
            defineField({ name: "values", title: "Valores", type: "array", of: [{ type: "string" }] }),
          ],
          preview: {
            select: { label: "label", values: "values" },
            prepare: ({ label, values }) => ({ title: (values || []).join(" · "), subtitle: label }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "key", items: "items" },
    prepare: ({ title, items }) => ({
      title,
      subtitle: (items || []).map((i: { label?: string; values?: string[] }) => [i.label, (i.values || []).join(" / ")].filter(Boolean).join(": ")).join(" · "),
    }),
  },
});

export const objectTypes = [imageWithAlt, cmsLink, cmsFile, productVideo, seo, socialLink, specGroup];
