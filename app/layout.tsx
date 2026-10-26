import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "../components/WhatsAppButton";
import JsonLd from "../components/JsonLd";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL, absoluteUrl } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VATECH Colombia | Radiología dental 3D y 2D para tu clínica",
    template: "%s | VATECH Colombia",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "VATECH Colombia", "tomógrafo dental", "CBCT", "rayos X dental", "radiología dental",
    "panorámico dental", "sensor intraoral", "Green X", "PaX-i", "EzSensor", "EzRay Air",
    "Ez3D-i", "EzDent-i", "equipos odontológicos Bogotá",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "VATECH Colombia | Radiología dental 3D y 2D para tu clínica",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "VATECH Colombia | Radiología dental 3D y 2D para tu clínica",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  other: { "geo.region": "CO-DC", "geo.placename": "Bogotá" },
};

export const viewport: Viewport = {
  themeColor: "#0e0e10",
};

// Organización y sede local: ayuda a Google y a los asistentes de IA a identificar la empresa
const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/brand/vatech-colombia-color.png"),
      description: SITE_DESCRIPTION,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      sameAs: SOCIAL,
      parentOrganization: { "@type": "Organization", name: "Vatech Co., Ltd.", url: "https://www.vatech.co.kr" },
    },
    {
      "@type": "MedicalBusiness",
      "@id": absoluteUrl("/#bogota"),
      name: `${SITE_NAME} · Bogotá`,
      url: SITE_URL,
      image: absoluteUrl("/opengraph-image.png"),
      email: CONTACT.email,
      telephone: CONTACT.phone,
      hasMap: CONTACT.maps,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.city,
        addressRegion: CONTACT.address.region,
        addressCountry: CONTACT.address.country,
      },
      areaServed: { "@type": "Country", name: "Colombia" },
      parentOrganization: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "es-CO",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>
        <JsonLd data={organization} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
