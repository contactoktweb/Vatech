import type { Metadata } from "next";
import DistributorsPage from "../../components/DistributorsPage";

export const metadata: Metadata = {
  title: "Distribuidores oficiales en Colombia",
  alternates: { canonical: "/distribuidores" },
  description: "Red nacional de distribuidores autorizados VATECH en Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero y Cartagena.",
};

export default function Page() {
  return <DistributorsPage />;
}
