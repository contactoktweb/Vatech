import type { StructureResolver } from "sanity/structure";
import { CogIcon, CubeIcon, DesktopIcon, DocumentsIcon, PackageIcon } from "./icons";

const singleton = (S: Parameters<StructureResolver>[0], id: string, title: string) =>
  S.listItem().id(id).title(title).schemaType(id).child(S.document().schemaType(id).documentId(id).title(title));

const CATALOG_GROUPS = [
  { value: "3d", title: "Sistema de imagen 3D" },
  { value: "2d", title: "Sistema de imagen 2D" },
  { value: "intraoral", title: "Sistema intraoral" },
  { value: "software", title: "Software" },
  { value: "none", title: "Fuera del catálogo" },
];

// Menú lateral del Studio: configuración, páginas y productos agrupados por pestaña
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido del sitio")
    .items([
      singleton(S, "siteSettings", "Configuración general").icon(CogIcon),
      S.divider(),
      S.listItem()
        .title("Páginas")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Páginas")
            .items([
              singleton(S, "homePage", "Inicio"),
              singleton(S, "aboutPage", "Quiénes somos"),
              singleton(S, "philosophyPage", "Filosofía"),
              singleton(S, "worldNetworkPage", "Red mundial"),
              singleton(S, "distributorsPage", "Distribuidores"),
              singleton(S, "productsPage", "Página de productos").icon(DesktopIcon),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Productos")
        .icon(PackageIcon)
        .child(
          S.list()
            .title("Productos")
            .items([
              S.documentTypeListItem("product").title("Todos los productos").icon(PackageIcon),
              S.divider(),
              ...CATALOG_GROUPS.map((group) =>
                S.listItem()
                  .id(`products-${group.value}`)
                  .title(group.title)
                  .icon(CubeIcon)
                  .child(
                    S.documentList()
                      .title(group.title)
                      .schemaType("product")
                      .filter('_type == "product" && catalogGroup == $group')
                      .params({ group: group.value })
                      .defaultOrdering([{ field: "order", direction: "asc" }]),
                  ),
              ),
            ]),
        ),
    ]);
