import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "../../../components/ProductDetailPage";
import JsonLd from "../../../components/JsonLd";
import { getProduct, productCatalog } from "../../../lib/productCatalog";
import { SITE_NAME, absoluteUrl } from "../../../lib/site";

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const path = `/productos/${product.slug}`;
  const image = { url: product.heroImage.local, alt: product.heroImage.alt || product.name };
  return {
    title: `${product.name} · ${product.category}`,
    description: product.summary,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: `${product.name} | ${SITE_NAME}`, description: product.summary, images: [image] },
    twitter: { card: "summary_large_image", title: `${product.name} | ${SITE_NAME}`, description: product.summary, images: [image.url] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const url = absoluteUrl(`/productos/${product!.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product!.name,
      description: product!.summary,
      category: product!.category,
      image: absoluteUrl(product!.heroImage.local),
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
        { "@type": "ListItem", position: 3, name: product!.name, item: url },
      ],
    },
  ];
  return <>
    <JsonLd data={structuredData} />
    <ProductDetailPage product={product!} />
  </>;
}
