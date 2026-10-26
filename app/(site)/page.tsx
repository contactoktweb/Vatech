import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getHomePage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomePage();
  return pageMetadata(seo, "/", { absoluteTitle: true });
}

export default async function Page() {
  return <HomePage content={await getHomePage()} />;
}
