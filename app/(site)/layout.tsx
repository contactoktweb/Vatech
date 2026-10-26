import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/cms";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, seo } = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: `%s | ${siteName}` },
    description: seo.description,
    applicationName: siteName,
    keywords: seo.keywords,
    authors: [{ name: siteName, url: SITE_URL }],
    creator: siteName,
    publisher: siteName,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: "es_CO", url: SITE_URL, siteName, title: seo.title, description: seo.description },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false },
    other: { "geo.region": "CO-DC", "geo.placename": "Bogotá" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0e0e10",
};

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const { siteName, seo, contact, social, logos } = settings;

  // Organización y sede local: ayuda a Google y a los asistentes de IA a identificar la empresa
  const organization = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteName,
        url: SITE_URL,
        logo: absoluteUrl(logos.color.local),
        description: seo.description,
        email: contact.email,
        telephone: contact.phoneDisplay,
        sameAs: social.map((s) => s.url),
        parentOrganization: { "@type": "Organization", name: "Vatech Co., Ltd.", url: "https://www.vatech.co.kr" },
      },
      {
        "@type": "MedicalBusiness",
        "@id": absoluteUrl("/#bogota"),
        name: `${siteName} · ${contact.officeName}`,
        url: SITE_URL,
        image: absoluteUrl("/opengraph-image.png"),
        email: contact.email,
        telephone: contact.phoneDisplay,
        hasMap: contact.mapsUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.addressLines.slice(0, 2).join(", "),
          addressLocality: "Bogotá",
          addressRegion: "Bogotá D.C.",
          addressCountry: "CO",
        },
        areaServed: { "@type": "Country", name: "Colombia" },
        parentOrganization: { "@id": absoluteUrl("/#organization") },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: SITE_URL,
        name: siteName,
        inLanguage: "es-CO",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
    ],
  };

  return (
    <SiteSettingsProvider settings={settings}>
      <JsonLd data={organization} />
      {children}
      <WhatsAppButton />
    </SiteSettingsProvider>
  );
}
