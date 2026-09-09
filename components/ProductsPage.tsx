"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import OriginalAssetImage from "./OriginalAssetImage";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type Product = {
  name: string;
  desc: string;
  local: string;
  source: string;
  href: string;
};

const products3d: Product[] = [
  { name:"Green X16 / Green X18", desc:"Green X proporciona un gran campo de visión de un solo escaneo con la más alta resolución a través de nuestra innovadora tecnología de detección comprimida de tercera generación.", local:"/assets/products/X18X16.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/X18X16.png", href:"/productos/green-x16-green-x18" },
  { name:"Green X12", desc:"El nuevo Green X 12 mejora la calidad de su imagen con mucho menos ruido a través de su Compressed Sensing Technology (CST), aumentando el proceso de reconstrucción 10 veces más rápido de lo normal.", local:"/assets/products/X12.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/X12.png", href:"/productos/green-x12" },
  { name:"Green 16", desc:"Green 16 es un avanzado sistema de imagen de rayos X digital 4 en 1 que incorpora PANO, CEPH (opcional), CBCT y MODEL Scan.", local:"/assets/products/16.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/16.png", href:"/productos/green-16" },
  { name:"Smart Plus", desc:"Un escaneo con un Smart Plus no solamente le brinda una imagen CT, sino también una imagen Auto Pano.", local:"/assets/products/SMARTPLUS.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/SMARTPLUS.png", href:"/productos/smart-plus" },
  { name:"A9", desc:"Tecnología LITE en nuestro equipo con sistema 3 en 1 proporcionando imágenes precisas y de alta calidad, incluyendo una función extra de CT que permite realizar diagnósticos fundamentales y planificar tratamientos.", local:"/assets/products/A9.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/A9.png", href:"/productos/a9" },
  { name:"Green X21", desc:"El nuevo Green X21 con la máxima amplitud en diagnóstico 3D. Obtenga una visión panorámica y cefalométrica completa con un FOV expandido de 21x19. Innovación y precisión quirúrgica.", local:"/assets/products/X21-scaled.png", source:"https://vatechmexico.com/wp-content/uploads/2026/03/X21-scaled.png", href:"/productos/green-x21" },
];

const products2d: Product[] = [
  { name:"PaX-i Plus", desc:"Calidad de Imagen Panorámica de 5.0 LP/MM CEPH RÁPIDO Tiempo de adquisición de 1.9 segundos", local:"/assets/products/PAXIPLUS.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/PAXIPLUS.png", href:"/productos/pax-i-plus" },
  { name:"PaX-i", desc:"Proporciona la imagen panorámica más precisa y de alta calidad al combinar el procesamiento de imágenes.", local:"/assets/products/PAXI-.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/PAXI-.png", href:"/productos/pax-i" },
];

const intraoral: Product[] = [
  { name:"Ez Sensor HD", desc:"Haga su práctica fácil, rápida y profesional", local:"/assets/products/HD.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/HD.png", href:"/productos/ezsensor-hd" },
  { name:"Ez Sensor CLASSIC", desc:"Más delgado, más cómodo", local:"/assets/products/CLASSIC.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/CLASSIC.png", href:"/productos/ezsensor-classic" },
  { name:"EzRay Air Portátil", desc:"Ligero, portátil y seguro", local:"/assets/products/EZRAY-AIR-PORTATIL.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/EZRAY-AIR-PORTATIL.png", href:"/productos/ezray-air-portatil" },
  { name:"EzRay Air Wall", desc:"Rayos X intra oral de pared ligero.", local:"/assets/products/EZRAY-AIR-WALL.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/EZRAY-AIR-WALL.png", href:"/productos/ezray-air-wall" },
  { name:"EzRay Air C", desc:"Radiografía intra oral estandar", local:"/assets/products/EZRAYAIR.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/EZRAYAIR.png", href:"/productos/ezray-air-c" },
  { name:"Ez Scan", desc:"El EzScan es una solución de imágenes digitales 3D diseñada para brindarte simplicidad a tu trabajo.", local:"/assets/products/EZSCAN.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/EZSCAN.png", href:"/productos/ezscan" },
  { name:"EzCam", desc:"Con nuestro EzCam aseguramos ligereza, comodidad y una gran calidad de imagen rápidamente sin necesidad de un software y controlador.", local:"/assets/products/EZCAM.png", source:"https://vatechmexico.com/wp-content/uploads/2026/07/EZCAM.png", href:"/productos/ezcam" },
];

const zirconia: Product[] = [
  { name:"Perfit ZR", desc:"Nuestro nuevo DISCO de zirconia cuenta con una translucidez excelente y un desarrollo cromático de alta calidad que permite reproducir la biblioteca de colores VITA Shade, además contiene poca porosidad en su interior haciéndola estable (sin nano grietas ni astillas).", local:"/assets/products/PERFITSOMBREADOPAGINA.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/PERFITSOMBREADOPAGINA.webp", href:"/productos/perfit-zr" },
  { name:"Perfit FS", desc:"El primer BLOQUE de zirconia totalmente sinterizado. Perﬁt FS es la zirconia de aspecto más natural con una ﬂexión de fuerza de 500 MPa.", local:"/assets/products/perfit-FS.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/perfit-FS.webp", href:"/productos/perfit-fs" },
];

const software: Product[] = [
  { name:"EzOrtho", desc:"La nueva generación en softwares cefalométricos.", local:"/assets/products/EZORTHOSOMBRA.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/EZORTHOSOMBRA.webp", href:"/productos/ezortho" },
  { name:"Ez3D-i", desc:"Software de imágenes 3D rápido y fácil.", local:"/assets/products/EZ3D-I.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/EZ3D-I.webp", href:"/productos/ez3d-i" },
  { name:"EzDent-i", desc:"La primera solución de imágenes clínicas y de consulta.", local:"/assets/products/EZDENTIpng.webp", source:"https://vatechmexico.com/wp-content/uploads/2026/06/EZDENTIpng.webp", href:"/productos/ezdent-i" },
  { name:"Clever RC", desc:"La solución operativa No. 1 creada por Vatech.", local:"/assets/products/CLEVER-RC-scaled.png", source:"https://vatechmexico.com/wp-content/uploads/2026/08/CLEVER-RC-scaled.png", href:"/productos/clever-rc" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return <a className="catalog-card" href={product.href} style={{"--delay":`${index * 70}ms`} as CSSProperties}>
    <div className="catalog-card-top"><span>{String(index + 1).padStart(2,"0")}</span><b>↗</b></div>
    <div className="catalog-image">
      <OriginalAssetImage localSrc={product.local} sourceSrc={product.source} alt={product.name} loading="lazy" />
      <div className="catalog-scan" />
    </div>
    <div className="catalog-copy"><h3>{product.name}</h3><p>{product.desc}</p><em>Explorar equipo <span>→</span></em></div>
  </a>
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
          <div className="product-anchor-row"><a href="#equipos">Equipos <span>↓</span></a><a href="#zirconia">Zirconia <span>↓</span></a><a href="#software">Software <span>↓</span></a></div>
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

      <section className="material-section" id="zirconia">
        <div className="material-intro" data-product-reveal><p className="eyebrow light">ZIRCONIA</p><h2>Ingeniería de vanguardia<br/>para restauraciones de alta precisión.</h2><p>Materiales restaurativos desarrollados para integrarse a flujos digitales exigentes.</p></div>
        <div className="material-products">{zirconia.map((p,i)=><ProductCard key={p.name} product={p} index={i}/>)}</div>
      </section>

      <section className="software-section" id="software">
        <div className="software-head" data-product-reveal><p className="eyebrow red">SOFTWARE</p><h2>La mejor solución para<br/>un diagnóstico completo.</h2></div>
        <div className="software-grid">{software.map((p,i)=><a href={p.href} className="software-card" data-product-reveal key={p.name}>
          <div className="software-visual"><OriginalAssetImage localSrc={p.local} sourceSrc={p.source} alt={p.name}/><span>0{i+1}</span></div>
          <div><h3>{p.name}</h3><p>{p.desc}</p><em>Más información ↗</em></div>
        </a>)}</div>
      </section>

      <section className="products-final-cta"><div className="products-final-ring"/><div><p className="eyebrow light">VATECH MÉXICO</p><h2>Encuentra la tecnología<br/>ideal para tu práctica.</h2></div><a href="mailto:contacto@vatechmexico.com" className="btn btn-white">Hablar con un especialista <span>→</span></a></section>
    </main>
    <SiteFooter/>
  </>;
}
