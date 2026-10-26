"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, SINGLETONS } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type));
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "vatech-colombia",
  title: "VATECH Colombia",
  basePath: "/studio",
  projectId: projectId || "sin-configurar",
  dataset,
  schema: {
    types: schemaTypes,
    // Las páginas únicas no aparecen en «Crear nuevo»
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Las páginas únicas no se pueden duplicar ni borrar
    actions: (input, context) =>
      singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
