import type { Metadata } from "next";
import UnderConstructionPage from "@/components/UnderConstructionPage";
import { getSiteSettings } from "@/lib/cms";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, underConstruction, contact } = await getSiteSettings();
  return {
    title: { absolute: `${siteName} | Sitio Web Oficial en Construcción` },
    description: `Sitio oficial de ${siteName} en construcción. Próximamente el portal definitivo con la más avanzada tecnología en tomografía 3D CBCT, radiología 2D, sensores intraorales y soporte biomédico oficial para clínicas odontológicas en Colombia. Contacto comercial: ${contact.phoneDisplay}. ${underConstruction.domain}`,
    robots: { index: false, follow: true },
  };
}

export default function ConstructionRoute() {
  return <UnderConstructionPage />;
}
