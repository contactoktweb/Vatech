import type { Metadata } from "next";
import UnderConstructionPage from "../../components/UnderConstructionPage";

export const metadata: Metadata = {
  title: { absolute: "VATECH Colombia | Sitio Web Oficial en Construcción" },
  description:
    "Sitio oficial de VATECH Colombia en construcción. Próximamente el portal definitivo con la más avanzada tecnología en tomografía 3D CBCT, radiología 2D, sensores intraorales y soporte biomédico oficial para clínicas odontológicas en Colombia. Contacto comercial: +57 312 6344188.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConstructionRoute() {
  return <UnderConstructionPage />;
}
