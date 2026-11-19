import { objectTypes } from "./objects";
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import { aboutPage, distributorsPage, philosophyPage, privacyPage, worldNetworkPage } from "./documents/pages";
import { product, productsPage } from "./documents/products";
import { lead } from "./documents/lead";

export const schemaTypes = [
  ...objectTypes,
  siteSettings,
  homePage,
  aboutPage,
  philosophyPage,
  worldNetworkPage,
  distributorsPage,
  productsPage,
  privacyPage,
  product,
  lead,
];

/** Documentos únicos: se editan, no se crean ni se borran. */
export const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Configuración general" },
  { id: "homePage", type: "homePage", title: "Inicio" },
  { id: "aboutPage", type: "aboutPage", title: "Quiénes somos" },
  { id: "philosophyPage", type: "philosophyPage", title: "Filosofía" },
  { id: "worldNetworkPage", type: "worldNetworkPage", title: "Red mundial" },
  { id: "distributorsPage", type: "distributorsPage", title: "Distribuidores" },
  { id: "productsPage", type: "productsPage", title: "Página de productos" },
  { id: "privacyPage", type: "privacyPage", title: "Política de privacidad" },
] as const;
