import { defineField, defineType } from "sanity";
import {
  CaseIcon, CheckmarkCircleIcon, EarthGlobeIcon, EnvelopeIcon, HeartIcon, InfoOutlineIcon, PinIcon,
  RocketIcon, SearchIcon, StarIcon, UsersIcon,
} from "../../icons";
import { headFields, heroFields, image, list, paragraphs, section, seoField, str, strings, title, txt } from "../helpers";

const heroGroup = { name: "hero", title: "Encabezado", icon: RocketIcon, default: true };
const seoGroup = { name: "seo", title: "SEO", icon: SearchIcon };

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Quiénes somos",
  type: "document",
  icon: UsersIcon,
  groups: [heroGroup, { name: "content", title: "Contenido", icon: InfoOutlineIcon }, seoGroup],
  fields: [
    section("hero", "Encabezado", heroFields(), { group: "hero", collapsed: false }),
    section("intro", "Introducción", [str("eyebrow", "Antetítulo"), title(), paragraphs("paragraphs", "Párrafos")], { group: "content", collapsed: false }),
    section(
      "support",
      "Respaldo global",
      [str("eyebrow", "Antetítulo"), title(), list("stats", "Cifras", [str("value", "Cifra"), str("label", "Etiqueta")], { title: "value", subtitle: "label" }, { itemTitle: "Cifra" })],
      { group: "content" },
    ),
    section("reasons", "¿Por qué elegir VATECH?", [str("eyebrow", "Antetítulo"), title(), image("image", "Imagen"), strings("items", "Razones")], { group: "content" }),
    seoField(),
  ],
  preview: { prepare: () => ({ title: "Quiénes somos", media: UsersIcon }) },
});

const pillar = (name: string, label: string) =>
  section(name, label, [str("tag", "Etiqueta"), str("title", "Título"), txt("quote", "Cita", { rows: 4 }), txt("text", "Texto", { rows: 3 })]);

export const philosophyPage = defineType({
  name: "philosophyPage",
  title: "Filosofía",
  type: "document",
  icon: HeartIcon,
  groups: [heroGroup, { name: "corporate", title: "Misión y valores", icon: CheckmarkCircleIcon }, { name: "stages", title: "Etapas", icon: StarIcon }, seoGroup],
  fields: [
    section(
      "hero",
      "Encabezado",
      [...heroFields(), str("symbol", "Símbolo", { description: "Carácter grande decorativo." }), str("symbolCaption", "Texto bajo el símbolo")],
      { group: "hero", collapsed: false },
    ),
    section(
      "corporate",
      "Filosofía institucional",
      [
        ...headFields(),
        pillar("mission", "Misión"),
        pillar("vision", "Visión"),
        section("quality", "Política de calidad", [str("tag", "Etiqueta"), str("title", "Título"), txt("text", "Texto", { rows: 4 }), strings("checklist", "Puntos de verificación")]),
        section("values", "Valores", [
          str("tag", "Etiqueta"),
          str("title", "Título"),
          list("items", "Valores", [str("title", "Valor"), txt("text", "Descripción", { rows: 2 })], { title: "title" }, { itemTitle: "Valor" }),
        ]),
      ],
      { group: "corporate", collapsed: false },
    ),
    section("intro", "Introducción", headFields(), { group: "stages" }),
    str("stageLabel", "Palabra antes del número de etapa", { group: "stages" }),
    list(
      "stages",
      "Etapas del viaje humanista",
      [str("title", "Título"), str("quote", "Cita"), txt("text", "Texto", { rows: 4 }), image("image", "Imagen")],
      { title: "title", subtitle: "quote", media: "image" },
      { group: "stages", itemTitle: "Etapa" },
    ),
    section("epilogue", "Epílogo", headFields(), { group: "stages" }),
    seoField(),
  ],
  preview: { prepare: () => ({ title: "Filosofía", media: HeartIcon }) },
});

export const worldNetworkPage = defineType({
  name: "worldNetworkPage",
  title: "Red mundial",
  type: "document",
  icon: EarthGlobeIcon,
  groups: [heroGroup, { name: "offices", title: "Oficinas", icon: PinIcon }, seoGroup],
  fields: [
    section("hero", "Encabezado", [...heroFields(), str("badge", "Cifra del globo", { description: "Ejemplo: +70" })], { group: "hero", collapsed: false }),
    section("intro", "Introducción", headFields(), { group: "offices" }),
    list(
      "offices",
      "Oficinas",
      [
        str("country", "País"),
        str("name", "Nombre de la oficina"),
        txt("address", "Dirección", { rows: 2 }),
        str("contact", "Contacto", { description: "Correo y teléfono separados por · . El correo se convierte en enlace." }),
        defineField({ name: "mapUrl", title: "Enlace de Google Maps (opcional)", type: "url" }),
        image("image", "Mapa del país"),
      ],
      { title: "name", subtitle: "country", media: "image" },
      { group: "offices", itemTitle: "Oficina" },
    ),
    txt("quote", "Frase final", { rows: 2, group: "offices" }),
    seoField(),
  ],
  preview: { prepare: () => ({ title: "Red mundial", media: EarthGlobeIcon }) },
});

export const distributorsPage = defineType({
  name: "distributorsPage",
  title: "Distribuidores",
  type: "document",
  icon: CaseIcon,
  groups: [heroGroup, { name: "directory", title: "Directorio", icon: PinIcon }, { name: "join", title: "Ser distribuidor", icon: UsersIcon }, { name: "form", title: "Formulario", icon: EnvelopeIcon }, seoGroup],
  fields: [
    section("hero", "Encabezado", [...heroFields(), str("badge", "Texto del círculo", { description: "Ejemplo: CO" })], { group: "hero", collapsed: false }),
    section(
      "directory",
      "Directorio de distribuidores",
      [
        str("eyebrow", "Antetítulo"),
        title(),
        str("coverageLabel", "Texto junto al número de regiones"),
        list(
          "regions",
          "Regiones",
          [
            str("place", "Ciudad o región"),
            defineField({
              name: "distributors",
              title: "Distribuidores",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "distributor",
                  title: "Distribuidor",
                  icon: CaseIcon,
                  fields: [
                    str("name", "Nombre"),
                    defineField({
                      name: "status",
                      title: "Estado",
                      type: "string",
                      options: { list: ["Certificado", "Distribuidor Autorizado"] },
                      description: "Los certificados se marcan con un punto rojo.",
                    }),
                  ],
                  preview: { select: { title: "name", subtitle: "status" } },
                },
              ],
            }),
          ],
          { title: "place" },
          { itemTitle: "Región" },
        ),
      ],
      { group: "directory", collapsed: false },
    ),
    section(
      "join",
      "¿Quieres ser distribuidor?",
      [
        ...headFields(),
        list("benefits", "Beneficios", [str("title", "Título"), txt("text", "Texto", { rows: 2 })], { title: "title" }, { itemTitle: "Beneficio" }),
        str("whatsappLabel", "Texto antes del WhatsApp"),
        txt("whatsappMessage", "Mensaje de WhatsApp", { rows: 2 }),
        str("emailLabel", "Texto antes del correo"),
        str("emailSubject", "Asunto del correo"),
      ],
      { group: "join", collapsed: false },
    ),
    section(
      "form",
      "Formulario de postulación",
      [
        str("badge", "Etiqueta"),
        str("title", "Título"),
        txt("text", "Texto", { rows: 2 }),
        section(
          "fields",
          "Campos",
          ["name", "email", "phone", "city", "message"].map((key) =>
            section(key, { name: "Nombre o razón social", email: "Correo", phone: "Celular", city: "Ciudad", message: "Mensaje" }[key] as string, [str("label", "Etiqueta"), str("placeholder", "Texto de ejemplo")]),
          ),
        ),
        str("whatsappButton", "Botón: enviar por WhatsApp"),
        str("emailButton", "Botón: enviar por correo"),
        str("submittingLabel", "Texto mientras se envía"),
        str("requiredError", "Error de campos obligatorios"),
        txt("disclaimer", "Aviso de tratamiento de datos", { rows: 2 }),
        str("whatsappIntro", "Primera línea del mensaje de WhatsApp"),
        str("successTitle", "Éxito: título"),
        txt("successText", "Éxito: texto", { rows: 2 }),
        str("successWhatsapp", "Éxito: botón WhatsApp"),
        str("successEmail", "Éxito: botón correo"),
        str("resetLabel", "Botón para enviar otra"),
      ],
      { group: "form", collapsed: false },
    ),
    section("cta", "Llamado final", [...headFields(), str("buttonLabel", "Botón"), txt("whatsappMessage", "Mensaje de WhatsApp", { rows: 2 })], { group: "join" }),
    seoField(),
  ],
  preview: { prepare: () => ({ title: "Distribuidores", media: CaseIcon }) },
});
