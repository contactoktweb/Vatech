import type { Metadata } from "next";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

// Layout raíz mínimo: el sitio usa app/(site)/layout.tsx y el administrador de contenido usa /studio
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>{children}</body>
    </html>
  );
}
