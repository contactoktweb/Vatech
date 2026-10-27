import { cache } from "react";
import { client } from "../../sanity/lib/client";
import { fromSanity, mergeContent } from "../../sanity/lib/transform";
import { isSanityConfigured } from "../../sanity/env";
import {
  defaultAbout,
  defaultDistributors,
  defaultHome,
  defaultPhilosophy,
  defaultProducts,
  defaultProductsPage,
  defaultSettings,
  defaultWorld,
} from "./defaults";
import type {
  AboutPageContent,
  DistributorsPageContent,
  HomePageContent,
  PhilosophyPageContent,
  ProductDetail,
  ProductsPageContent,
  SiteSettings,
  WorldNetworkPageContent,
} from "./types";

/** Segundos que una página guarda en caché el contenido de Sanity antes de volver a pedirlo. */
export const REVALIDATE_SECONDS = 60;

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity"] } });
  } catch (error) {
    console.warn("[Sanity] No se pudo leer el contenido, se usa el contenido por defecto.", error);
    return null;
  }
}

const singleton = <T,>(id: string, fallback: T) =>
  cache(async (): Promise<T> => mergeContent(fallback, fromSanity(await fetchSanity(`*[_id == $id][0]`, { id }))));

export const getSiteSettings = singleton<SiteSettings>("siteSettings", defaultSettings);
export const getHomePage = singleton<HomePageContent>("homePage", defaultHome);
export const getAboutPage = singleton<AboutPageContent>("aboutPage", defaultAbout);
export const getPhilosophyPage = singleton<PhilosophyPageContent>("philosophyPage", defaultPhilosophy);
export const getWorldNetworkPage = singleton<WorldNetworkPageContent>("worldNetworkPage", defaultWorld);
export const getDistributorsPage = singleton<DistributorsPageContent>("distributorsPage", defaultDistributors);
export const getProductsPage = singleton<ProductsPageContent>("productsPage", defaultProductsPage);

const EMPTY_PRODUCT: Omit<ProductDetail, "slug" | "name" | "heroImage" | "cardImage" | "card"> = {
  category: "",
  catalogGroup: "none",
  order: 100,
  eyebrow: "",
  tagline: "",
  summary: "",
  intro: [],
  heroVideo: null,
  highlights: [],
  features: [],
  specs: [],
  dimensionImages: [],
  gallery: [],
  catalogPdf: null,
  trainingVideos: [],
  isComingSoon: false,
};

const EMPTY_IMAGE = { local: "", source: "", alt: "" };

/** Producto de Sanity completado con su versión por defecto (mismo slug) o con campos vacíos. */
function completeProduct(raw: Partial<ProductDetail>): ProductDetail {
  const base = defaultProducts.find((p) => p.slug === raw.slug);
  const merged = mergeContent<ProductDetail>(
    base ?? ({ ...EMPTY_PRODUCT, slug: "", name: "", heroImage: EMPTY_IMAGE, cardImage: EMPTY_IMAGE, card: { description: "", image: EMPTY_IMAGE } } as ProductDetail),
    raw,
  );
  // La tarjeta muestra el nombre del producto; su descripción sigue al resumen salvo que se le escriba una propia
  // (el texto que dejó la carga inicial cuenta como "no editado")
  const ownDescription = merged.card?.description && merged.card.description !== base?.card.description ? merged.card.description : "";
  const resummarized = Boolean(base && merged.summary !== base.summary);
  return {
    ...merged,
    cardImage: merged.cardImage?.local ? merged.cardImage : merged.card?.image?.local ? merged.card.image : merged.heroImage,
    card: {
      description: ownDescription || (resummarized || !merged.card?.description ? merged.summary : merged.card.description),
      image: merged.card?.image?.local ? merged.card.image : merged.heroImage,
    },
  };
}

export const getProducts = cache(async (): Promise<ProductDetail[]> => {
  const docs = await fetchSanity<unknown[]>(`*[_type == "product" && defined(slug.current)] | order(order asc)`);
  if (!docs || docs.length === 0) return defaultProducts;
  return (fromSanity(docs) as Partial<ProductDetail>[]).map(completeProduct);
});

export const getProduct = cache(async (slug: string) => (await getProducts()).find((product) => product.slug === slug));

export { isSanityConfigured };
