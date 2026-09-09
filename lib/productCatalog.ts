import rawProducts from "../data/product-catalog.json";

export type ProductAsset = {
  local: string;
  source: string;
  alt?: string;
};

export type ProductFeature = {
  title: string;
  text: string[];
  images: ProductAsset[];
};

export type ProductGalleryGroup = {
  title: string;
  text: string[];
  images: ProductAsset[];
};

export type ProductDetail = {
  slug: string;
  name: string;
  category: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  intro: string[];
  heroImage: ProductAsset;
  heroVideo: ProductAsset | null;
  highlights: string[];
  features: ProductFeature[];
  configurationImages: ProductAsset[];
  specifications: string[][][];
  dimensionImages: ProductAsset[];
  gallery: ProductGalleryGroup[];
  catalogPdf: ProductAsset | null;
  trainingVideos: Array<ProductAsset | string>;
  cardImage: ProductAsset;
  sourceComplete: boolean;
};

export const productCatalog = rawProducts as ProductDetail[];

export function getProduct(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}
