"use client";

import { ReactNode, useEffect } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function SubpageShell({ eyebrow, title, lead, children, heroAside }: { eyebrow: string; title: ReactNode; lead: string; children: ReactNode; heroAside?: ReactNode }) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subhero">
        <div className="subhero-grid" />
        <div className="subhero-ring ring-one" />
        <div className="subhero-ring ring-two" />
        <div className="subhero-copy">
          <p className="eyebrow red">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
          <div className="subhero-line"><i /><span>VATECH · COLOMBIA</span></div>
        </div>
        {heroAside && <div className="subhero-aside">{heroAside}</div>}
      </section>
      {children}
      <SiteFooter />
    </main>
  );
}
