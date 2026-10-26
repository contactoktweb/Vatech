"use client";

import { useEffect, useState } from "react";
import { useSiteSettings, useWhatsAppLink } from "./SiteSettingsProvider";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const { whatsappButtonLabel } = useSiteSettings();
  const whatsappUrl = useWhatsAppLink()();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside aria-label="Contacto por WhatsApp" className="whatsapp-floating-widget">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        aria-label="Contactar a VATECH por WhatsApp corporativo"
      >
        <span className="whatsapp-pulse-ring" aria-hidden="true" />
        <WhatsAppIcon className="whatsapp-icon" size={24} />
        <span className="whatsapp-label">{whatsappButtonLabel}</span>
      </a>
    </aside>
  );
}
