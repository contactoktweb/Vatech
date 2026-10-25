"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import OriginalAssetImage from "./OriginalAssetImage";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import ProductComparisonTable3D from "./ProductComparisonTable3D";

type Product = {
  name: string;
  desc: string;
  local: string;
  source: string;
  href: string;
  isComingSoon?: boolean;
};

const products3d: Product[] = [
  { name:"A9", desc:"Tecnología LITE en nuestro equipo con sistema 3 en 1 proporcionando imágenes precisas y de alta calidad, incluyendo una función extra de CT que permite realizar diagnósticos fundamentales y planificar tratamientos.", local:"/assets/products/A9.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/A9.png", href:"/productos/a9" },
  { name:"Green X12", desc:"El nuevo Green X 12 mejora la calidad de su imagen con mucho menos ruido a través de su Compressed Sensing Technology (CST), aumentando el proceso de reconstrucción 10 veces más rápido de lo normal.", local:"/assets/products/X12.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/X12.png", href:"/productos/green-x12" },
  { name:"Green X-12 SE", desc:"Avanzado sistema de imagenología digital dental 4 en 1 (Pano, Ceph opcional, CBCT y escaneo de modelos) con tecnología de baja radiación y máxima resolución diagnóstica para tu clínica.", local:"/assets/products/X12.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/X12.png", href:"/productos/green-x-12-se" },
  { name:"Green X 16", desc:"Green X 16 proporciona un gran campo de visión con la más alta resolución a través de tecnología CST de reconstrucción ultrarrápida, ideal para endodoncistas e implantólogos.", local:"/assets/products/X18X16.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/X18X16.png", href:"/productos/green-x16" },
  { name:"Green X 18", desc:"Green X 18 amplía las posibilidades diagnósticas con campo de visión extendido de un solo escaneo, diseñado para especialistas de ATM, periodoncistas y cirujanos maxilofaciales.", local:"/assets/products/X18X16.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/X18X16.png", href:"/productos/green-x18" },
  { name:"Green X21", desc:"El nuevo Green X21 con la máxima amplitud en diagnóstico 3D (FOV expandido hasta 21x19 cm) y escaneo facial. Próximamente disponible en Colombia.", local:"/assets/products/X21-scaled.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/03/X21-scaled.png", href:"/productos/green-x21", isComingSoon: true },
];

const products2d: Product[] = [
  { name:"PaX-i Plus", desc:"Calidad de Imagen Panorámica de 5.0 LP/MM CEPH RÁPIDO Tiempo de adquisición de 1.9 segundos", local:"/assets/products/PAXIPLUS.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/PAXIPLUS.png", href:"/productos/pax-i-plus" },
  { name:"PaX-i", desc:"Proporciona la imagen panorámica más precisa y de alta calidad al combinar el procesamiento de imágenes.", local:"/assets/products/PAXI-.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/PAXI-.png", href:"/productos/pax-i" },
];

const intraoral: Product[] = [
  { name:"Ez Sensor HD", desc:"Haga su práctica fácil, rápida y profesional", local:"/assets/products/HD.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/HD.png", href:"/productos/ezsensor-hd" },
  { name:"Ez Sensor CLASSIC", desc:"Más delgado, más cómodo", local:"/assets/products/CLASSIC.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/CLASSIC.png", href:"/productos/ezsensor-classic" },
  { name:"EzRay Air Portátil", desc:"Ligero, portátil y seguro", local:"/assets/products/EZRAY-AIR-PORTATIL.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/EZRAY-AIR-PORTATIL.png", href:"/productos/ezray-air-portatil" },
];

const software: Product[] = [
  { name:"Software 3D (Ez3D-i)", desc:"Visualización 3D precisa en tiempo real. Herramientas avanzadas de diagnóstico CBCT, simulación de implantes y vías aéreas.", local:"/assets/products/EZ3D-I.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/EZ3D-I.webp", href:"/productos/ez3d-i" },
  { name:"Software 2D (EzDent-i)", desc:"Gestión eficiente de imágenes 2D. Diagnóstico ágil, medición precisa, informes clínicos en un clic y administración de pacientes.", local:"/assets/products/EZDENTIpng.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/EZDENTIpng.webp", href:"/productos/ezdent-i" },
  { name:"Software Especialidades (EzOrtho)", desc:"Diagnóstico avanzado para ortodoncia. Trazados cefalométricos automáticos con IA DAVIS, análisis ortodóncico y simulación 3D.", local:"/assets/products/EZORTHOSOMBRA.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/EZORTHOSOMBRA.webp", href:"/productos/ezortho" },
  { name:"Clever RC", desc:"Plataforma inteligente de gestión operativa e imagenológica de Vatech. Próximamente disponible en Colombia.", local:"/assets/products/CLEVER-RC-scaled.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/08/CLEVER-RC-scaled.png", href:"/productos/clever-rc", isComingSoon: true },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <a className={`catalog-card ${product.isComingSoon ? "catalog-card-coming-soon" : ""}`} href={product.href} style={{"--delay":`${index * 70}ms`} as CSSProperties}>
      <div className="catalog-card-top">
        <span>{String(index + 1).padStart(2,"0")}</span>
        {product.isComingSoon ? (
          <span className="catalog-badge-soon">PRÓXIMAMENTE</span>
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
        <em>{product.isComingSoon ? "Ver adelanto oficial" : "Explorar equipo"} <span>→</span></em>
      </div>
    </a>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return <div className="catalog-grid">{products.map((p,i)=><ProductCard key={p.name} product={p} index={i}/>)}</div>
}

export default function ProductsPage(){
  const [tab,setTab] = useState("3d");
  useEffect(()=>{
    const nodes = document.querySelectorAll("[data-product-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(e=>e.isIntersecting && e.target.classList.add("in-view")),{threshold:.12});
    nodes.forEach(n=>observer.observe(n));
    return ()=>observer.disconnect();
  },[]);

  // Precarga las imágenes de todas las categorías para que el cambio de pestaña sea instantáneo
  useEffect(()=>{
    const preload = () => [...products3d, ...products2d, ...intraoral].forEach(p => { const img = new Image(); img.decoding = "async"; img.src = p.local; });
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(preload); else setTimeout(preload, 600);
  },[]);

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
          <p className="eyebrow red">PRODUCTOS VATECH</p>
          <h1>Imagen digital<br/><span>sin límites.</span></h1>
          <p>Explora nuestros sistemas de imagen digital más avanzados: desde soluciones 2D y 3D, hasta equipos intraorales.</p>
          <div className="product-anchor-row">
            <a href="#equipos">Equipos <span>↓</span></a>
            <a href="#comparativa-3d">Comparativa 3D <span>↓</span></a>
            <a href="#software">Software <span>↓</span></a>
          </div>
        </div>
        <div className="product-hero-stage">
          <div className="product-radar r1"/><div className="product-radar r2"/><div className="product-radar r3"/>
          <OriginalAssetImage localSrc="/assets/products/X18X16.png" sourceSrc="https://vatechmexico.com/wp-content/uploads/2026/07/X18X16.png" alt="Green X16 y Green X18" className="product-hero-machine" />
          <span className="hero-tech-label hero-tech-a">3D · CBCT</span><span className="hero-tech-label hero-tech-b">DENTAL IMAGING</span>
        </div>
      </section>

      <section className="product-catalog-section" id="equipos">
        <div className="product-section-head" data-product-reveal><div><p className="eyebrow red">EQUIPOS VATECH</p><h2>Precisión diseñada<br/>para cada diagnóstico.</h2></div><p>Selecciona una categoría para explorar el portafolio de sistemas VATECH.</p></div>
        <div className="product-tabs" data-product-reveal>
          <button className={tab==="3d"?"active":""} onClick={()=>setTab("3d")}><span>01</span>Sistema de imagen 3D</button>
          <button className={tab==="2d"?"active":""} onClick={()=>setTab("2d")}><span>02</span>Sistema de imagen 2D</button>
          <button className={tab==="intra"?"active":""} onClick={()=>setTab("intra")}><span>03</span>Sistema intraoral</button>
        </div>
        <ProductGrid products={active}/>
      </section>

      {/* Tabla comparativa de productos 3D inspirada en Vatech España */}
      <ProductComparisonTable3D />

      <section className="software-section" id="software">
        <div className="software-head" data-product-reveal>
          <div>
            <p className="eyebrow red">SOFTWARE ESPECIALIZADO</p>
            <h2>Eleva tu diagnóstico con la excelencia<br/>de nuestros softwares 2D y 3D.</h2>
          </div>
          <p>Herramientas clínicas de alta precisión para visualización 3D, simulación de implantes, ortodoncia y gestión.</p>
        </div>
        <div className="software-grid">
          {software.map((p, i) => (
            <a href={p.href} className={`software-card ${p.isComingSoon ? "software-card-soon" : ""}`} data-product-reveal key={p.name}>
              <div className="software-visual">
                <OriginalAssetImage localSrc={p.local} sourceSrc={p.source} alt={p.name}/>
                {p.isComingSoon ? (
                  <span className="software-badge-soon">PRÓXIMAMENTE</span>
                ) : (
                  <span>0{i + 1}</span>
                )}
              </div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <em>{p.isComingSoon ? "Ver adelanto ↗" : "Más información ↗"}</em>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="products-final-cta"><div className="products-final-ring"/><div><p className="eyebrow light">VATECH COLOMBIA</p><h2>Encuentra la tecnología<br/>ideal para tu práctica.</h2></div><a href="mailto:marketing.colombia@vatechglobal.com" className="btn btn-white">Hablar con un especialista <span>→</span></a></section>
    </main>
    <SiteFooter/>
  </>;
}
