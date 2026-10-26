import type { Metadata } from "next";
import DistributorsPage from "@/components/DistributorsPage";
import { getDistributorsPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getDistributorsPage()).seo, "/distribuidores");
}

export default async function Page() {
  return <DistributorsPage content={await getDistributorsPage()} />;
}
