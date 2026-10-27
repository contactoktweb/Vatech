"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import OriginalAssetImage from "./OriginalAssetImage";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useSiteSettings } from "./SiteSettingsProvider";
import ProductComparisonTable3D from "./ProductComparisonTable3D";
import { Lines } from "@/lib/cms/text";
import type { ProductDetail, ProductsPageContent } from "@/lib/cms/types";

type Product = {
  name: string;
  desc: string;
  local: string;
  source: string;
  href: string;
  isComingSoon?: boolean;
};

// Tarjeta del catálogo a partir del documento del producto
const toCard = (p: ProductDetail): Product => ({
  name: p.name,
  desc: p.card.description,
  local: p.card.image.local,
  source: p.card.image.source,
  href: `/productos/${p.slug}`,
  isComingSoon: p.isComingSoon,
});

const byGroup = (products: ProductDetail[], group: ProductDetail["catalogGroup"]) =>
  products.filter((p) => p.catalogGroup === group).sort((a, b) => a.order - b.order).map(toCard);

type Labels = ProductsPageContent["catalog"];

function ProductCard({ product, index, labels }: { product: Product; index: number; labels: Labels }) {
  return (
    <a className={`catalog-card ${product.isComingSoon ? "catalog-card-coming-soon" : ""}`} href={product.href} style={{"--delay":`${index * 70}ms`} as CSSProperties}>
      <div className="catalog-card-top">
        <span>{String(index + 1).padStart(2,"0")}</span>
        {product.isComingSoon ? (
          <span className="catalog-badge-soon">{labels.comingSoonLabel}</span>
        ) : (
          <b>↗</b>
        )}
      </div>
      <div className="catalog-image">
        <OriginalAssetImage localSrc={product.local} sourceSrc={product.source} alt={product.name} />
        <div className="catalog-scan" />
        <p className="catalog-hover-desc">{product.desc}</p>
      </div>
      <div className="catalog-copy">
        <h3>{product.name}</h3>
        <em>{product.isComingSoon ? labels.teaserLabel : labels.exploreLabel} <span>→</span></em>
      </div>
    </a>
  );
}

function ProductGrid({ products, labels }: { products: Product[]; labels: Labels }) {
  return <div className="catalog-grid">{products.map((p,i)=><ProductCard key={p.href} product={p} index={i} labels={labels}/>)}</div>
}

export default function ProductsPage({ content, products }: { content: ProductsPageContent; products: ProductDetail[] }){
  const { hero, catalog, software: softwareSection, finalCta } = content;
  const products3d = byGroup(products, "3d");
  const products2d = byGroup(products, "2d");
  const intraoral = byGroup(products, "intraoral");
  const software = byGroup(products, "software");
  const { contact } = useSiteSettings();
  const [tab,setTab] = useState("3d");
  useEffect(()=>{
    const nodes = document.querySelectorAll("[data-product-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(e=>e.isIntersecting && e.target.classList.add("in-view")),{threshold:.12});
    nodes.forEach(n=>observer.observe(n));
    return ()=>observer.disconnect();
  },[]);

  // Precarga las imágenes de todas las categorías para que el cambio de pestaña sea instantáneo
  useEffect(()=>{
    const preload = () => [...byGroup(products, "3d"), ...byGroup(products, "2d"), ...byGroup(products, "intraoral")].forEach(p => { const img = new Image(); img.decoding = "async"; img.src = p.local; });
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(preload); else setTimeout(preload, 600);
  },[products]);

  // Permite abrir una categoría desde el menú: /productos#sistema-3d, #sistema-2d, #sistema-intraoral
  useEffect(()=>{
    const tabsByHash: Record<string,string> = { "#sistema-3d":"3d", "#sistema-2d":"2d", "#sistema-intraoral":"intra" };
    const syncTab = () => {
      const next = tabsByHash[window.location.hash];
      if (!next) return;
      setTab(next);
      document.getElementById("equipos")?.scrollIntoView({ behavior:"smooth", block:"start" });
    };
    syncTab();
    window.addEventListener("hashchange", syncTab);
    return ()=>window.removeEventListener("hashchange", syncTab);
  },[]);

  const active = tab === "3d" ? products3d : tab === "2d" ? products2d : intraoral;

  return <>
    <SiteHeader/>
    <main className="product-page">
      <section className="product-hero">
        <div className="product-hero-grid"/>
        <div className="product-hero-copy">
          <p className="eyebrow red">{hero.eyebrow}</p>
          <h1>{hero.title}<br/><span>{hero.highlight}</span></h1>
          <p>{hero.lead}</p>
          <div className="product-anchor-row">
            {hero.anchors.map((anchor) => <a href={anchor.href} key={anchor.href}>{anchor.label} <span>↓</span></a>)}
          </div>
        </div>
        <div className="product-hero-stage">
          <div className="product-radar r1"/><div className="product-radar r2"/><div className="product-radar r3"/>
          {hero.image?.local && <OriginalAssetImage localSrc={hero.image.local} sourceSrc={hero.image.source} alt={hero.image.alt || ""} className="product-hero-machine" />}
          {hero.labels[0] && <span className="hero-tech-label hero-tech-a">{hero.labels[0]}</span>}{hero.labels[1] && <span className="hero-tech-label hero-tech-b">{hero.labels[1]}</span>}
        </div>
      </section>

      <section className="product-catalog-section" id="equipos">
        <div className="product-section-head" data-product-reveal><div><p className="eyebrow red">{catalog.eyebrow}</p><h2><Lines text={catalog.title} /></h2></div><p>{catalog.text}</p></div>
        <div className="product-tabs" data-product-reveal>
          <button className={tab==="3d"?"active":""} onClick={()=>setTab("3d")}><span>01</span>{catalog.tabs.threeD}</button>
          <button className={tab==="2d"?"active":""} onClick={()=>setTab("2d")}><span>02</span>{catalog.tabs.twoD}</button>
          <button className={tab==="intra"?"active":""} onClick={()=>setTab("intra")}><span>03</span>{catalog.tabs.intraoral}</button>
        </div>
        <ProductGrid products={active} labels={catalog}/>
      </section>

      {/* Tabla comparativa de productos 3D inspirada en Vatech España */}
      <ProductComparisonTable3D comparison={content.comparison} teaser={content.teaser} />

      <section className="software-section" id="software">
        <div className="software-head" data-product-reveal>
          <div>
            <p className="eyebrow red">{softwareSection.eyebrow}</p>
            <h2><Lines text={softwareSection.title} /></h2>
          </div>
          <p>{softwareSection.text}</p>
        </div>
        <div className="software-grid">
          {software.map((p, i) => (
            <a href={p.href} className={`software-card ${p.isComingSoon ? "software-card-soon" : ""}`} data-product-reveal key={p.href}>
              <div className="software-visual">
                <OriginalAssetImage localSrc={p.local} sourceSrc={p.source} alt={p.name}/>
                {p.isComingSoon ? (
                  <span className="software-badge-soon">{softwareSection.comingSoonLabel}</span>
                ) : (
                  <span>0{i + 1}</span>
                )}
              </div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <em>{p.isComingSoon ? softwareSection.previewLabel : softwareSection.moreLabel} ↗</em>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="products-final-cta"><div className="products-final-ring"/><div><p className="eyebrow light">{finalCta.eyebrow}</p><h2><Lines text={finalCta.title} /></h2></div><a href={`mailto:${contact.email}`} className="btn btn-white">{finalCta.buttonLabel} <span>→</span></a></section>
    </main>
    <SiteFooter/>
  </>;
}
