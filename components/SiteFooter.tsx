"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useSiteSettings, useWhatsAppLink } from "./SiteSettingsProvider";
import { CreditIcon, SOCIAL_ICONS, SOCIAL_NAMES, WhatsAppIcon } from "./icons";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  if (/^https?:\/\//.test(href)) return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link href={href}>{children}</Link>;
}

export default function SiteFooter() {
  const { siteName, logos, contact, social, footer } = useSiteSettings();
  const whatsappUrl = useWhatsAppLink()();

  return (
    <footer id="footer" className="footer">
      <div className="footer-brand">
        <img src={logos.light.local} alt={logos.light.alt || siteName} style={{ maxWidth: "180px", height: "auto" }} />
        <p>{footer.tagline}</p>
        {footer.showConstructionNotice && footer.constructionNotice && (
          <div className="footer-status-pill">
            <span className="footer-status-pulse" aria-hidden="true" />
            <span>{footer.constructionNotice}</span>
          </div>
        )}
        <div className="socials">
          {social.map(({ platform, url }) => {
            const Icon = SOCIAL_ICONS[platform];
            if (!Icon) return null;
            return (
              <a key={`${platform}-${url}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${SOCIAL_NAMES[platform]} de ${siteName}`}>
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>

      {footer.columns.map((column) => (
        <div key={column.title}>
          <h4>{column.title}</h4>
          {column.links.map((link) => <FooterLink key={`${link.label}-${link.href}`} href={link.href}>{link.label}</FooterLink>)}
        </div>
      ))}

      <div>
        <h4>{footer.contactTitle}</h4>
        <p>
          <a href={`mailto:${contact.email}`} className="footer-link-highlight">
            {contact.email}
          </a>
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-whatsapp-btn"
          aria-label={`Contactar por WhatsApp corporativo al ${contact.phoneDisplay}`}
        >
          <WhatsAppIcon size={16} />
          <span>{footer.whatsappLabel} {contact.phoneDisplay}</span>
        </a>
        <p>
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address-link"
            title={`Abrir ubicación de ${siteName} en Google Maps`}
          >
            {contact.addressLines.map((line, i) => (
              <span key={i}>{line}{i < contact.addressLines.length - 1 ? <br /> : " ↗"}</span>
            ))}
          </a>
        </p>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {footer.copyright}</span>
        {footer.showConstructionNotice && footer.constructionNotice && <span className="footer-site-construction">{footer.constructionNotice}</span>}
        <a
          href={footer.credit.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "inherit", textDecoration: "none" }}
        >
          {footer.credit.label}{" "}
          <span style={{ display: "inline-flex", color: "#ffffff" }}><CreditIcon size={13} /></span>
        </a>
        <a href={footer.privacy.href} target="_blank" rel="noopener noreferrer">
          {footer.privacy.label}
        </a>
      </div>
    </footer>
  );
}
