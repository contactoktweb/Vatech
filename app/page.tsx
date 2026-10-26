import type { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: { absolute: "VATECH Colombia | Radiología dental 3D y 2D para tu clínica" },
  description: "Tomógrafos 3D CBCT, panorámicos 2D, sensores intraorales y software VATECH con soporte oficial en Colombia. Cotiza con un especialista en Bogotá.",
  alternates: { canonical: "/" },
  openGraph: { title: "VATECH Colombia | Radiología dental 3D y 2D para tu clínica", description: "Tomógrafos 3D CBCT, panorámicos 2D, sensores intraorales y software VATECH con soporte oficial en Colombia. Cotiza con un especialista en Bogotá.", url: "/" },
};

export default function Page() {
  return <HomePage />;
}
