import { defineField, defineType } from "sanity";
import { UserIcon } from "../../icons";

// Prospectos que llegan por los formularios del sitio. Los crea el sitio; en el administrador solo se consultan.
export const lead = defineType({
  name: "lead",
  title: "Prospecto",
  type: "document",
  icon: UserIcon,
  readOnly: true,
  fields: [
    defineField({ name: "kind", title: "Tipo de solicitud", type: "string", description: "Cotización, distribuidor o descarga de catálogo." }),
    defineField({ name: "source", title: "Formulario", type: "string", description: "Dónde se llenó el formulario." }),
    defineField({ name: "receivedAt", title: "Fecha", type: "datetime", options: { dateFormat: "D [de] MMMM [de] YYYY", timeFormat: "h:mm a" } }),
    defineField({ name: "name", title: "Nombre", type: "string" }),
    defineField({ name: "email", title: "Correo", type: "string" }),
    defineField({ name: "phone", title: "Celular / WhatsApp", type: "string" }),
    defineField({
      name: "details",
      title: "Datos del formulario",
      type: "array",
      of: [
        {
          type: "object",
          name: "leadDetail",
          fields: [defineField({ name: "label", title: "Campo", type: "string" }), defineField({ name: "value", title: "Valor", type: "string" })],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({ name: "message", title: "Mensaje", type: "text", rows: 4 }),
    defineField({ name: "consent", title: "Autorizó el tratamiento de datos", type: "boolean" }),
    defineField({
      name: "emailStatus",
      title: "Correo a mercadeo",
      type: "string",
      description: "«Enviado» si el aviso llegó al correo de mercadeo. Si dice «No enviado», el prospecto solo quedó aquí.",
    }),
  ],
  orderings: [{ title: "Más recientes", name: "receivedDesc", by: [{ field: "receivedAt", direction: "desc" }] }],
  preview: {
    select: { name: "name", kind: "kind", source: "source", date: "receivedAt" },
    prepare: ({ name, kind, source, date }) => ({
      title: name || "Sin nombre",
      subtitle: [kind, source, date ? new Date(date).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" }) : ""].filter(Boolean).join(" · "),
      media: UserIcon,
    }),
  },
});
