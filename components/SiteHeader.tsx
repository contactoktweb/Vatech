"use client";

import Link from "next/link";
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
  intro?: string;
  items?: MenuItem[];
};

const menu: MenuGroup[] = [
  {
    label: "Compañía",
    href: "/quienes-somos",
    intro: "Innovación global con una visión profundamente humana.",
    items: [
      { label: "Filosofía", href: "/filosofia" },
      { label: "Quiénes Somos", href: "/quienes-somos" },
      { label: "Red Mundial Vatech", href: "/red-mundial-vatech" },
      {
        label: "Instituto VATECH",
        href: "/instituto-vatech",
        children: [
          { label: "Plan de trabajo", href: "/instituto-vatech#plandetrabajo" },
          { label: "Equipo de profesionales", href: "/instituto-vatech#equipo" },
        ],
      },
    ],
  },
  {
    label: "Productos",
    href: "/productos",
    intro: "Imagenología digital, restauración y software de diagnóstico.",
    items: [
      { label: "Equipos Vatech", href: "/productos#equipos" },
      { label: "Zirconia", href: "/productos#zirconia" },
      { label: "Software", href: "/productos#software" },
    ],
  },
  { label: "Servicio técnico", href: "/servicio-tecnico" },
  { label: "Distribuidores", href: "/distribuidores" },
  {
    label: "Programas de renovación",
    href: "https://vatechmexico.com/programas-de-renovacion/",
    intro: "Alternativas para renovar y actualizar tu tecnología VATECH.",
    items: [
      { label: "Buyback Vatech", href: "https://vatechmexico.com/buyback-2/" },
      { label: "Tradein|up Vatech", href: "https://vatechmexico.com/tradeinup-vatech/" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    intro: "Promociones, noticias y contenido audiovisual de VATECH México.",
    items: [
      { label: "Promociones", href: "/media#promociones" },
      { label: "Noticias", href: "/media#noticias" },
      { label: "Fotos y videos", href: "/media#fotos" },
    ],
  },
];

function SmartLink({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const external = href.startsWith("http");
  if (external) return <a href={href} className={className} onClick={onClick}>{children}</a>;
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="brand" aria-label="VATECH México">
          <img src="/brand/vatech-logo.png" alt="VATECH" />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {menu.map((group) => group.items ? (
            <div className={`nav-dropdown ${group.items.length <= 3 ? "nav-dropdown-small" : ""}`} key={group.label}>
              <SmartLink href={group.href} className="nav-dropdown-trigger">{group.label} <span>⌄</span></SmartLink>
              <div className="nav-dropdown-panel">
                <div className="nav-dropdown-intro">
                  <small>VATECH MÉXICO</small>
                  <strong>{group.intro}</strong>
                </div>
                <div className="nav-dropdown-links">
                  {group.items.map((item, i) => (
                    <div className="nav-menu-item-wrap" key={item.label}>
                      <SmartLink href={item.href}><span>0{i + 1}</span>{item.label}<b>↗</b></SmartLink>
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

        <a href="mailto:contacto@vatechmexico.com" className="header-cta">Contacto <span className="arrow">→</span></a>
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
