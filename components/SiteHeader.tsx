"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type MenuItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

type MenuGroup = {
  label: string;
  href: string;
  items?: MenuItem[];
};

const menu: MenuGroup[] = [
  {
    label: "Compañía",
    href: "/quienes-somos",
    items: [
      { label: "Quiénes Somos", href: "/quienes-somos" },
      { label: "Filosofía VATECH", href: "/filosofia" },
      { label: "Red Mundial Vatech", href: "/red-mundial-vatech" },
    ],
  },
  {
    label: "Productos",
    href: "/productos",
    items: [
      { label: "Sistema de Imagen 3D", href: "/productos#sistema-3d" },
      { label: "Sistema de Imagen 2D", href: "/productos#sistema-2d" },
      { label: "Sistema Intraoral", href: "/productos#sistema-intraoral" },
    ],
  },
  {
    label: "Software",
    href: "/productos#software",
    items: [
      { label: "Software 3D (Ez3D-i)", href: "/productos/ez3d-i" },
      { label: "Software 2D (EzDent-i)", href: "/productos/ezdent-i" },
      { label: "Software Especialidades (EzOrtho)", href: "/productos/ezortho" },
      { label: "Clever RC (Próximamente)", href: "/productos/clever-rc" },
    ],
  },
  { label: "Contacto", href: "/#contact" },
  {
    label: "Distribuidores",
    href: "/distribuidores",
    items: [
      { label: "Distribuidores Oficiales", href: "/distribuidores" },
      { label: "¿Quieres ser distribuidor?", href: "/distribuidores#ser-distribuidor" },
    ],
  },
];

function SmartLink({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const external = href.startsWith("http");
  if (external) return <a href={href} className={className} onClick={onClick}>{children}</a>;
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}

export default function SiteHeader({ solid }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="brand" aria-label="VATECH Colombia">
          <img src="/brand/vatech-colombia-white.png" alt="VATECH Colombia" className="brand-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {menu.map((group) => group.items ? (
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
                      {item.children && <div className="nav-nested">
                        {item.children.map(child => <SmartLink key={child.label} href={child.href}>{child.label}<b>→</b></SmartLink>)}
                      </div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : <SmartLink href={group.href} key={group.label}>{group.label}</SmartLink>)}
        </nav>

        <a href="/#contact" className="header-cta">Cotizar <span className="arrow">→</span></a>
        <button className={`menu-button ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <aside className={`mobile-menu mega-mobile ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner mobile-menu-tree">
          {menu.map((group, gi) => (
            <section className="mobile-menu-group" key={group.label}>
              <SmartLink href={group.href} className="mobile-parent" onClick={() => setMenuOpen(false)}><span>{String(gi + 1).padStart(2,"0")}</span>{group.label}</SmartLink>
              {group.items && <div className="mobile-submenu">
                {group.items.map(item => <div key={item.label}>
                  <SmartLink href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</SmartLink>
                  {item.children && <div className="mobile-submenu-nested">{item.children.map(child => <SmartLink href={child.href} onClick={() => setMenuOpen(false)} key={child.label}>{child.label}</SmartLink>)}</div>}
                </div>)}
              </div>}
            </section>
          ))}
        </div>
      </aside>
    </>
  );
}
