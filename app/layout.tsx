import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VATECH Colombia | Innovación en radiología dental para tu clínica",
  description:
    "Innovación en radiología dental para tu clínica: equipos radiológicos 3D/2D, tecnología biomédica avanzada, soporte técnico oficial y presencia en Colombia.",
};

import WhatsAppButton from "../components/WhatsAppButton";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
