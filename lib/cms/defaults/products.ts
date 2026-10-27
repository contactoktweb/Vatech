import rawProducts from "../../../data/product-catalog.json";
import cards from "./cards.json";
import { groupSpecs } from "../specs";
import type { CatalogGroup, CmsFile, ProductDetail } from "../types";

type RawProduct = (typeof rawProducts)[number] & { isComingSoon?: boolean };
type Card = { group: CatalogGroup; order: number; description: string; image: ProductDetail["cardImage"] };

const cardBySlug = cards as Record<string, Card>;

export const defaultProducts: ProductDetail[] = (rawProducts as RawProduct[]).map((raw, index) => {
  const card = cardBySlug[raw.slug];
  return {
    slug: raw.slug,
    name: raw.name,
    category: raw.category,
    catalogGroup: card?.group ?? "none",
    order: card?.order ?? 100 + index,
    eyebrow: raw.eyebrow,
    tagline: raw.tagline,
    summary: raw.summary,
    intro: raw.intro,
    heroImage: raw.heroImage,
    heroVideo: (raw.heroVideo as CmsFile | null) ?? null,
    highlights: raw.highlights,
    features: raw.features,
    specs: groupSpecs((raw.specifications as string[][][])[0] ?? []),
    dimensionImages: raw.dimensionImages,
    gallery: raw.gallery,
    catalogPdf: (raw.catalogPdf as CmsFile | null) ?? null,
    trainingVideos: raw.trainingVideos as Array<CmsFile | string>,
    cardImage: raw.cardImage,
    card: card
      ? { description: card.description, image: card.image }
      : { description: raw.summary, image: raw.cardImage },
    isComingSoon: Boolean(raw.isComingSoon),
  };
});
