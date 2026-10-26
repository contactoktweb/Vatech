import type { Metadata } from "next";
import ProductsPage from "../../components/ProductsPage";

export const metadata: Metadata = {
  title: "Productos: tomógrafos 3D, panorámicos 2D y sensores intraorales",
  description: "Catálogo VATECH en Colombia: tomógrafos CBCT Green X y A9, panorámicos PaX-i, sensores EzSensor, rayos X portátiles EzRay Air y software Ez3D-i, EzDent-i y EzOrtho.",
  alternates: { canonical: "/productos" },
};

export default function Page(){ return <ProductsPage/>; }
