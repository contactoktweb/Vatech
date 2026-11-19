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
  basePath: "/admin",
  projectId: projectId || "sin-configurar",
  dataset,
  schema: {
    types: schemaTypes,
    // Las páginas únicas no aparecen en «Crear nuevo»
    // Los prospectos los crea el sitio, no se crean a mano
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType) && schemaType !== "lead"),
  },
  document: {
    // Las páginas únicas no se pueden duplicar ni borrar
    // Los prospectos solo se pueden consultar o borrar
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : context.schemaType === "lead"
          ? input.filter(({ action }) => action === "delete")
          : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
