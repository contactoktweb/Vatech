import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VATECH México | Imagenología dental",
  description:
    "Concepto visual premium para VATECH México: tecnología avanzada de imagenología dental, soporte especializado y presencia global.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
