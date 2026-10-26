import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Cliente de solo lectura para el sitio (contenido publicado, vía CDN)
export const client = createClient({
  projectId: projectId || "sin-configurar",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
