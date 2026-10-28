"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useSiteSettings } from "./SiteSettingsProvider";

function SmartLink({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  // Los enlaces externos y los que llevan a una sección (#) usan un enlace normal:
  // así el navegador avisa el cambio de sección (p. ej. la pestaña de /productos#sistema-2d)
  const native = href.startsWith("http") || href.includes("#");
  if (native) return <a href={href} className={className} onClick={onClick}>{children}</a>;
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}

export default function SiteHeader({ solid }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { navigation: menu, logos, headerCta, siteName } = useSiteSettings();

  const isDetailPage = Boolean(pathname && pathname.startsWith("/productos/") && pathname !== "/productos");
  const isSolid = Boolean(solid || isDetailPage);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""} ${isSolid ? "header-solid" : ""}`}>
        <Link href="/" className="brand" aria-label={siteName}>
          <img src={logos.light.local} alt={logos.light.alt || siteName} className="brand-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {menu.map((group) => group.items?.length ? (
            <div className="nav-dropdown" key={group.label}>
              <SmartLink href={group.href} className="nav-dropdown-trigger">{group.label} <span>⌄</span></SmartLink>
              <div className="nav-dropdown-panel">
                <div className="nav-dropdown-links">
                  {group.items.map((item, i) => (
                    <div className="nav-menu-item-wrap" key={item.label}>
                      <SmartLink href={item.href}>
                        <span className="nav-item-num">0{i + 1}</span>
                        <span className="nav-item-label">{item.label}</span>
                        <b className="nav-item-arrow" aria-hidden="true">↗</b>
                      </SmartLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : <SmartLink href={group.href} key={group.label}>{group.label}</SmartLink>)}
        </nav>

        <a href={headerCta.href} className="header-cta">{headerCta.label} <span className="arrow">→</span></a>
        <button className={`menu-button ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <aside className={`mobile-menu mega-mobile ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner mobile-menu-tree">
          {menu.map((group, gi) => (
            <section className="mobile-menu-group" key={group.label}>
              <SmartLink href={group.href} className="mobile-parent" onClick={() => setMenuOpen(false)}><span>{String(gi + 1).padStart(2,"0")}</span>{group.label}</SmartLink>
              {group.items?.length ? <div className="mobile-submenu">
                {group.items.map(item => <div key={item.label}>
                  <SmartLink href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</SmartLink>
                </div>)}
              </div> : null}
            </section>
          ))}
        </div>
      </aside>
    </>
  );
}
