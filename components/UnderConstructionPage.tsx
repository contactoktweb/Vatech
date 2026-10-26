"use client";

import { useSiteSettings, useWhatsAppLink } from "./SiteSettingsProvider";
import { CreditIcon, WhatsAppIcon } from "./icons";

export default function UnderConstructionPage() {
  const { siteName, logos, contact, footer, underConstruction: uc } = useSiteSettings();
  const whatsappUrl = useWhatsAppLink()();

  const currentYear = new Date().getFullYear();

  return (
    <main className="construction-minimal-page">
      <div className="construction-bg-glow" aria-hidden="true" />
      <div className="construction-bg-grid" aria-hidden="true" />

      <div className="construction-minimal-card">
        <div className="construction-minimal-logo">
          <img
            src={logos.light.local}
            alt={logos.light.alt || siteName}
            width={210}
            height={44}
          />
        </div>

        <div className="construction-status-pill">
          <span className="construction-status-pulse" aria-hidden="true" />
          <span>{uc.badge}</span>
        </div>

        <h1 className="construction-minimal-title">{uc.title}</h1>

        <p className="construction-minimal-desc">
          {uc.text}{" "}
          <strong>{uc.domain}</strong>.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="construction-minimal-btn"
          aria-label={`Contactar por WhatsApp al ${contact.phoneDisplay}`}
        >
          <WhatsAppIcon size={18} />
          <span>{uc.buttonLabel}</span>
        </a>
      </div>

      <footer className="construction-minimal-footer">
        <span>© {currentYear} {footer.copyright}</span>
        <a
          href={footer.credit.href}
          target="_blank"
          rel="noopener noreferrer"
          className="construction-footer-attribution"
        >
          <span>{footer.credit.label}</span>
          <span style={{ display: "inline-flex", color: "#ffffff" }}><CreditIcon size={13} /></span>
        </a>
      </footer>
    </main>
  );
}
