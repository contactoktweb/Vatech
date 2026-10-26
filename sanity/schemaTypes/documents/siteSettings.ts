import { defineField, defineType } from "sanity";
import { CogIcon, EnvelopeIcon, ImageIcon, MenuIcon, SearchIcon, ShareIcon, ThLargeIcon, WrenchIcon } from "../../icons";
import { bool, image, link, list, section, str, strings, txt } from "../helpers";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración general",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Marca y logos", icon: ImageIcon, default: true },
    { name: "contact", title: "Contacto", icon: EnvelopeIcon },
    { name: "social", title: "Redes sociales", icon: ShareIcon },
    { name: "menu", title: "Menú", icon: MenuIcon },
    { name: "footer", title: "Pie de página", icon: ThLargeIcon },
    { name: "construction", title: "Página en construcción", icon: WrenchIcon },
    { name: "seo", title: "SEO general", icon: SearchIcon },
  ],
  fields: [
    str("siteName", "Nombre del sitio", { group: "brand", required: true }),
    section(
      "logos",
      "Logos",
      [
        image("light", "Logo blanco", { description: "Se usa sobre fondos oscuros (menú, pie de página)." }),
        image("dark", "Logo negro", { description: "Para fondos claros." }),
        image("color", "Logo a color", { description: "Para datos de Google y documentos." }),
      ],
      { group: "brand", collapsed: false },
    ),

    section(
      "contact",
      "Datos de contacto",
      [
        defineField({ name: "email", title: "Correo", type: "string", validation: (r) => r.email() }),
        str("whatsappNumber", "Número de WhatsApp", { description: "Solo números con indicativo de país, sin + ni espacios. Ejemplo: 573126344188" }),
        str("phoneDisplay", "Teléfono como se muestra", { description: "Ejemplo: +57 312 6344188" }),
        txt("whatsappMessage", "Mensaje inicial de WhatsApp", { rows: 2, description: "Texto que aparece escrito al abrir WhatsApp desde el botón flotante." }),
        str("officeName", "Nombre de la sede", { description: "Ejemplo: Sede Bogotá · Teleport Business Park" }),
        str("addressShort", "Dirección corta"),
        strings("addressLines", "Dirección completa (una línea por renglón)"),
        defineField({ name: "mapsUrl", title: "Enlace de Google Maps", type: "url" }),
      ],
      { group: "contact", collapsed: false },
    ),

    defineField({ name: "social", title: "Redes sociales", type: "array", of: [{ type: "socialLink" }], group: "social" }),

    defineField({
      name: "navigation",
      title: "Menú principal",
      type: "array",
      group: "menu",
      of: [
        {
          type: "object",
          name: "navGroup",
          title: "Opción del menú",
          icon: MenuIcon,
          fields: [
            str("label", "Texto"),
            str("href", "Destino"),
            defineField({ name: "items", title: "Submenú", type: "array", of: [{ type: "cmsLink" }] }),
          ],
          preview: {
            select: { title: "label", subtitle: "href", items: "items" },
            prepare: ({ title, subtitle, items }) => ({ title, subtitle: items?.length ? `${items.length} opciones · ${subtitle}` : subtitle }),
          },
        },
      ],
    }),
    link("headerCta", "Botón del menú (Cotizar)", { group: "menu" }),
    str("whatsappButtonLabel", "Texto del botón flotante de WhatsApp", { group: "menu" }),

    section(
      "footer",
      "Pie de página",
      [
        txt("tagline", "Frase bajo el logo", { rows: 2 }),
        list(
          "columns",
          "Columnas de enlaces",
          [str("title", "Título de la columna"), defineField({ name: "links", title: "Enlaces", type: "array", of: [{ type: "cmsLink" }] })],
          { title: "title" },
          { itemTitle: "Columna" },
        ),
        str("contactTitle", "Título de la columna de contacto"),
        str("whatsappLabel", "Texto antes del número de WhatsApp"),
        str("copyright", "Texto de derechos", { description: "El año se agrega solo." }),
        bool("showConstructionNotice", "Mostrar aviso de sitio en construcción"),
        str("constructionNotice", "Aviso de sitio en construcción"),
        link("credit", "Crédito de desarrollo"),
        link("privacy", "Aviso de privacidad"),
      ],
      { group: "footer", collapsed: false },
    ),

    section(
      "underConstruction",
      "Página en construcción",
      [
        str("badge", "Etiqueta"),
        str("title", "Título"),
        txt("text", "Texto", { rows: 2, description: "El dominio se agrega al final en negrita." }),
        str("domain", "Dominio"),
        str("buttonLabel", "Texto del botón de WhatsApp"),
      ],
      { group: "construction", collapsed: false },
    ),

    section(
      "seo",
      "SEO general",
      [
        str("title", "Título por defecto"),
        txt("description", "Descripción por defecto", { rows: 3 }),
        strings("keywords", "Palabras clave"),
      ],
      { group: "seo", collapsed: false },
    ),
  ],
  preview: { prepare: () => ({ title: "Configuración general", media: CogIcon }) },
});
