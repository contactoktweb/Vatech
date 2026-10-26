import type { Metadata } from "next";
import ProductsPage from "@/components/ProductsPage";
import { getProducts, getProductsPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getProductsPage()).seo, "/productos");
}

export default async function Page() {
  const [content, products] = await Promise.all([getProductsPage(), getProducts()]);
  return <ProductsPage content={content} products={products} />;
}
