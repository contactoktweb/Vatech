import type { SiteSettings } from "../types";

const img = (local: string, alt: string, source = local) => ({ local, source, alt });

export const defaultSettings: SiteSettings = {
  siteName: "VATECH Colombia",
  logos: {
    light: img("/brand/vatech-colombia-white.png", "VATECH Colombia"),
    dark: img("/brand/vatech-colombia-black.png", "VATECH Colombia"),
    color: img("/brand/vatech-colombia-color.png", "VATECH Colombia"),
  },
  contact: {
    email: "marketing.colombia@vatechglobal.com",
    whatsappNumber: "573126344188",
    phoneDisplay: "+57 312 6344188",
    whatsappMessage: "Hola VATECH Colombia, me gustaría recibir más información y asesoría sobre sus equipos radiológicos.",
    officeName: "Sede Bogotá · Teleport Business Park",
    addressShort: "Cra. 7 # 113-43, Oficina 805",
    addressLines: ["Cra. 7 # 113-43, Oficina 805", "Torre Teleport Business Park", "Bogotá, Colombia"],
    mapsUrl: "https://maps.app.goo.gl/2oGW1g6WhiqN3TLZ7",
  },
  social: [
    { platform: "facebook", url: "https://www.facebook.com/vatechcolombia/?locale=es_LA" },
    { platform: "instagram", url: "https://www.instagram.com/vatech.colombia/?hl=en" },
    { platform: "youtube", url: "https://www.youtube.com/channel/UCUoUvlHzian9vm7rkKLRFQw?view_as=subscriber" },
    { platform: "tiktok", url: "https://www.tiktok.com/@vatechcolombia" },
  ],
  navigation: [
    {
      label: "Compañía",
      href: "/quienes-somos",
      items: [
        { label: "Quiénes Somos", href: "/quienes-somos" },
        { label: "Filosofía VATECH", href: "/filosofia" },
        { label: "Red Mundial Vatech", href: "/red-mundial-vatech" },
      ],
    },
    {
      label: "Productos",
      href: "/productos",
      items: [
        { label: "Sistema de Imagen 3D", href: "/productos#sistema-3d" },
        { label: "Sistema de Imagen 2D", href: "/productos#sistema-2d" },
        { label: "Sistema Intraoral", href: "/productos#sistema-intraoral" },
      ],
    },
    {
      label: "Software",
      href: "/productos#software",
      items: [
        { label: "Software 3D (Ez3D-i)", href: "/productos/ez3d-i" },
        { label: "Software 2D (EzDent-i)", href: "/productos/ezdent-i" },
        { label: "Software Especialidades (EzOrtho)", href: "/productos/ezortho" },
        { label: "Clever RC (Próximamente)", href: "/productos/clever-rc" },
      ],
    },
    { label: "Contacto", href: "/#contact" },
    {
      label: "Distribuidores",
      href: "/distribuidores",
      items: [
        { label: "Distribuidores Oficiales", href: "/distribuidores" },
        { label: "¿Quieres ser distribuidor?", href: "/distribuidores#ser-distribuidor" },
      ],
    },
  ],
  headerCta: { label: "Cotizar", href: "/#contact" },
  whatsappButtonLabel: "WhatsApp VATECH",
  footer: {
    tagline: "Tecnología de vanguardia en imagenología dental.",
    columns: [
      {
        title: "Compañía",
        links: [
          { label: "Quiénes somos", href: "/quienes-somos" },
          { label: "Filosofía", href: "/filosofia" },
          { label: "Red mundial", href: "/red-mundial-vatech" },
        ],
      },
      {
        title: "Productos",
        links: [
          { label: "Equipos Vatech", href: "/productos#equipos" },
          { label: "Comparativa 3D", href: "/productos#comparativa-3d" },
          { label: "Software", href: "/productos#software" },
        ],
      },
      {
        title: "Red & Distribución",
        links: [
          { label: "Distribuidores", href: "/distribuidores" },
          { label: "¿Quieres ser distribuidor?", href: "/distribuidores#ser-distribuidor" },
          { label: "Vatech Global", href: "https://vatech.com" },
          { label: "Catálogo de Equipos", href: "/productos" },
        ],
      },
    ],
    contactTitle: "Contacto",
    whatsappLabel: "WhatsApp directo:",
    copyright: "VATECH Colombia. Todos los derechos reservados.",
    showConstructionNotice: true,
    constructionNotice: "Sitio en construcción — próximamente www.vatechcolombia.com",
    credit: { label: "Desarrollado por K&T", href: "https://www.kytcode.lat" },
    privacy: { label: "Aviso de privacidad", href: "https://vatech.com/privacy-policy" },
  },
  underConstruction: {
    badge: "Próximamente",
    title: "Sitio en construcción",
    text: "Estamos preparando nuestra nueva plataforma oficial para",
    domain: "www.vatechcolombia.com.co",
    buttonLabel: "Asesoría directa por WhatsApp",
  },
  seo: {
    title: "VATECH Colombia | Radiología dental 3D y 2D para tu clínica",
    description:
      "Distribuidor oficial de VATECH en Colombia: tomógrafos 3D CBCT, panorámicos 2D, sensores intraorales, rayos X portátiles y software de diagnóstico dental, con soporte técnico y red de distribuidores en todo el país.",
    keywords: [
      "VATECH Colombia", "tomógrafo dental", "CBCT", "rayos X dental", "radiología dental",
      "panorámico dental", "sensor intraoral", "Green X", "PaX-i", "EzSensor", "EzRay Air",
      "Ez3D-i", "EzDent-i", "equipos odontológicos Bogotá",
    ],
  },
};
