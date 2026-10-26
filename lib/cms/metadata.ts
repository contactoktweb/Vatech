import type { Metadata } from "next";
import type { Seo } from "./types";

/** Metadatos de una página a partir de su bloque SEO editable en Sanity. */
export function pageMetadata(seo: Seo, path: string, o: { absoluteTitle?: boolean } = {}): Metadata {
  const images = seo.ogImage?.local ? [{ url: seo.ogImage.local, alt: seo.ogImage.alt }] : undefined;
  return {
    title: seo.title ? (o.absoluteTitle ? { absolute: seo.title } : seo.title) : undefined,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: { title: seo.title, description: seo.description, url: path, ...(images ? { images } : {}) },
    ...(images ? { twitter: { card: "summary_large_image", images: images.map((i) => i.url) } } : {}),
  };
}
