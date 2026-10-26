import type { MetadataRoute } from "next";
import { getProducts } from "../lib/cms";
import { absoluteUrl } from "../lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/productos"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/quienes-somos"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/filosofia"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/red-mundial-vatech"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/distribuidores"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const products: MetadataRoute.Sitemap = (await getProducts()).map((product) => ({
    url: absoluteUrl(`/productos/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: product.isComingSoon ? 0.6 : 0.8,
    images: [absoluteUrl(product.heroImage.local)],
  }));
  return [...pages, ...products];
}
