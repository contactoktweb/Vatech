import Studio from "./Studio";

// Administrador de contenido de Sanity, disponible en /studio
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
