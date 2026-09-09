import type { Metadata } from "next";
import ProductsPage from "../../components/ProductsPage";

export const metadata: Metadata = {
  title: "Productos | VATECH México",
  description: "Sistemas de imagen 3D, 2D, intraorales, zirconia y software VATECH México.",
};

export default function Page(){ return <ProductsPage/>; }
