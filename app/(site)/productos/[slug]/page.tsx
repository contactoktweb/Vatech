import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";
import JsonLd from "@/components/JsonLd";
import { getProduct, getProducts, getProductsPage, getSiteSettings } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 60;
// Permite abrir productos nuevos creados en Sanity sin volver a desplegar
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [product, { siteName }] = await Promise.all([getProduct(slug), getSiteSettings()]);
  if (!product) return {};
  const path = `/productos/${product.slug}`;
  const title = product.seo?.title || `${product.name} · ${product.category}`;
  const description = product.seo?.description || product.summary;
  const imageAsset = product.seo?.ogImage?.local ? product.seo.ogImage : product.heroImage;
  const image = { url: imageAsset.local, alt: imageAsset.alt || product.name };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: `${product.name} | ${siteName}`, description, images: [image] },
    twitter: { card: "summary_large_image", title: `${product.name} | ${siteName}`, description, images: [image.url] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, products, page] = await Promise.all([getProduct(slug), getProducts(), getProductsPage()]);
  if (!product) notFound();

  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  const url = absoluteUrl(`/productos/${product.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.summary,
      category: product.category,
      image: absoluteUrl(product.heroImage.local),
      url,
      brand: { "@type": "Brand", name: "VATECH" },
      manufacturer: { "@type": "Organization", name: "Vatech Co., Ltd." },
      seller: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Productos", item: absoluteUrl("/productos") },
        { "@type": "ListItem", position: 3, name: product.name, item: url },
      ],
    },
  ];
  return <>
    <JsonLd data={structuredData} />
    <ProductDetailPage product={product} related={related} labels={page.detailLabels} />
  </>;
}
