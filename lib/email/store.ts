import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../../sanity/env";
import type { Lead } from "./lead-template";

// Copia de cada prospecto en el administrador (Sanity), para no perder datos si el correo falla.
// El _id empieza por «prospectos.»: Sanity no publica esos documentos aunque el dataset sea público;
// solo los ven quienes inician sesión en /admin.
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
const writer = projectId && token ? createClient({ projectId, dataset, apiVersion, token, useCdn: false }) : null;

export const canStoreLeads = Boolean(writer);

export async function saveLead(lead: Lead): Promise<string | null> {
  if (!writer) return null;
  try {
    const now = new Date().toISOString();
    const doc = await writer.create({
      _id: `prospectos.${crypto.randomUUID()}`,
      _type: "lead",
      kind: lead.kind,
      source: lead.source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message || undefined,
      details: lead.fields.map((f, i) => ({ _key: `d${i}`, label: f.label, value: f.value })),
      consent: true,
      receivedAt: now,
      emailStatus: "Pendiente",
    });
    return doc._id;
  } catch (error) {
    console.error("[Prospecto] No se pudo guardar en el administrador:", error);
    return null;
  }
}

export async function setLeadEmailStatus(id: string | null, status: string) {
  if (!writer || !id) return;
  try {
    await writer.patch(id).set({ emailStatus: status }).commit();
  } catch (error) {
    console.error("[Prospecto] No se pudo actualizar el estado del correo:", error);
  }
}
