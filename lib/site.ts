// Datos centrales del sitio para SEO, datos estructurados y llms.txt
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vatechcolombia.com.co").replace(/\/$/, "");

export const SITE_NAME = "VATECH Colombia";

export const SITE_DESCRIPTION =
  "Distribuidor oficial de VATECH en Colombia: tomógrafos 3D CBCT, panorámicos 2D, sensores intraorales, rayos X portátiles y software de diagnóstico dental, con soporte técnico y red de distribuidores en todo el país.";

export const CONTACT = {
  email: "marketing.colombia@vatechglobal.com",
  phone: "+57 312 634 4188",
  whatsapp: "https://wa.me/573126344188",
  address: {
    street: "Cra. 7 # 113-43, Oficina 805, Teleport Business Park",
    city: "Bogotá",
    region: "Bogotá D.C.",
    country: "CO",
  },
  maps: "https://maps.app.goo.gl/2oGW1g6WhiqN3TLZ7",
};

export const SOCIAL = [
  "https://www.facebook.com/vatechcolombia/",
  "https://www.instagram.com/vatech.colombia/",
];

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
