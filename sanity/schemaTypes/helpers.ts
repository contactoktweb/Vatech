import { defineField } from "sanity";

// Atajos para declarar campos en español sin repetir configuración

type Opts = { description?: string; hidden?: boolean; group?: string | string[]; fieldset?: string; required?: boolean; rows?: number };

const rule = (required?: boolean) => (required ? (r: { required: () => unknown }) => r.required() : undefined);

export const str = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "string", description: o.description, group: o.group, fieldset: o.fieldset, hidden: o.hidden, validation: rule(o.required) as never });

export const txt = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "text", rows: o.rows ?? 3, description: o.description, group: o.group, fieldset: o.fieldset, hidden: o.hidden, validation: rule(o.required) as never });

/** Título que admite saltos de línea (Enter = salto de línea en la web). */
export const title = (name = "title", label = "Título", o: Opts = {}) =>
  txt(name, label, { rows: 2, description: o.description ?? "Usa Enter para hacer un salto de línea.", ...o });

export const bool = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "boolean", description: o.description, group: o.group, fieldset: o.fieldset, initialValue: false });

export const num = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "number", description: o.description, group: o.group, fieldset: o.fieldset });

export const image = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "imageWithAlt", description: o.description, group: o.group, fieldset: o.fieldset, validation: rule(o.required) as never });

export const link = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "cmsLink", description: o.description, group: o.group, fieldset: o.fieldset });

export const strings = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], description: o.description, group: o.group, fieldset: o.fieldset });

export const paragraphs = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "array", of: [{ type: "text", rows: 4 }], description: o.description, group: o.group, fieldset: o.fieldset });

export const images = (name: string, title: string, o: Opts = {}) =>
  defineField({ name, title, type: "array", of: [{ type: "imageWithAlt" }], options: { layout: "grid" }, description: o.description, group: o.group, fieldset: o.fieldset });

/** Objeto (sección) con campos propios, plegable en el Studio. */
export const section = (name: string, label: string, fields: ReturnType<typeof defineField>[], o: Opts & { collapsed?: boolean } = {}) =>
  defineField({
    name,
    title: label,
    type: "object",
    description: o.description,
    group: o.group,
    options: { collapsible: true, collapsed: o.collapsed ?? true },
    fields,
  });

/** Lista de objetos con vista previa por un campo. */
export const list = (
  name: string,
  label: string,
  fields: ReturnType<typeof defineField>[],
  preview: { title: string; subtitle?: string; media?: string },
  o: Opts & { itemTitle?: string } = {},
) =>
  defineField({
    name,
    title: label,
    type: "array",
    description: o.description,
    group: o.group,
    fieldset: o.fieldset,
    of: [{ type: "object", name: `${name}Item`, title: o.itemTitle ?? label, fields, preview: { select: preview } }],
  });

/** Antetítulo + título + texto, el encabezado que repiten casi todas las secciones. */
export const headFields = (o: { text?: boolean } = { text: true }) => [
  str("eyebrow", "Antetítulo", { description: "Texto pequeño en rojo sobre el título." }),
  title(),
  ...(o.text === false ? [] : [txt("text", "Texto", { rows: 3 })]),
];

/** Encabezado de página interna: antetítulo, título, parte resaltada en rojo y bajada. */
export const heroFields = () => [
  str("eyebrow", "Antetítulo"),
  str("title", "Título"),
  str("highlight", "Título resaltado (rojo)", { description: "Segunda línea del título, en rojo." }),
  txt("lead", "Bajada", { rows: 3 }),
];

export const seoField = (group = "seo") =>
  defineField({ name: "seo", title: "SEO", type: "seo", group });
