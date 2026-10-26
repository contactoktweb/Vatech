"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { defaultSettings } from "@/lib/cms/defaults/settings";
import type { SiteSettings } from "@/lib/cms/types";

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings);

// Entrega la configuración general (logos, contacto, redes, menú, pie) a los componentes del sitio
export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export const useSiteSettings = () => useContext(SiteSettingsContext);

/** Enlace de WhatsApp con el número de la configuración general. */
export function useWhatsAppLink() {
  const { contact } = useSiteSettings();
  return (message = contact.whatsappMessage) => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
