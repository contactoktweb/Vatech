import type { Metadata } from "next";
import ProductsPage from "../../components/ProductsPage";

export const metadata: Metadata = {
  title: "Productos | VATECH Colombia",
  description: "Sistemas de imagen digital 3D, 2D, intraorales y software especializado VATECH Colombia.",
};

export default function Page(){ return <ProductsPage/>; }
