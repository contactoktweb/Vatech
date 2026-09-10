"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const RED = "#c92c36";

const remoteAssets = {
  // Recursos históricos originales del Home. Se muestran cerca de su resolución nativa.
  picasso: { local: "/assets/home/picasso-1.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/picasso-1.png" },
  duo: { local: "/assets/home/PAXDUO3D.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/PAXDUO3D.png" },
  uni: { local: "/assets/home/PAXUNI3D.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/PAXUNI3D.png" },
  reve: { local: "/assets/home/PAXREVE.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/PAXREVE.png" },
  paxi: { local: "/assets/home/PAXI.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/PAXI.png" },
  greenLegacy: { local: "/assets/home/PAXI3DGREEN.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/PAXI3DGREEN.png" },
  ezSensorSoft: { local: "/assets/home/EZSENSORSOFT.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/EZSENSORSOFT.png" },
  paxiInsight: { local: "/assets/home/PAXIINSIGHT.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/PAXIINSIGHT.png" },
  ezRayAirP: { local: "/assets/home/EZRAY-AIR-P.png", source: "https://vatechmexico.com/wp-content/uploads/2026/06/EZRAY-AIR-P.png" },

  // Renders grandes tomados de las fichas originales para evitar ampliar miniaturas del Home.
  greenX16: { local: "/assets/products/X18X16.png", source: "https://vatechmexico.com/wp-content/uploads/2026/07/X18X16.png" },
  greenX12: { local: "/assets/product-details/green-x12/GreenX12.png", source: "https://vatechmexico.com/wp-content/uploads/2023/07/GreenX12.png" },
  a9: { local: "/assets/product-details/a9/A9_.png", source: "https://vatechmexico.com/wp-content/uploads/2023/07/A9_.png" },
  greenX21: { local: "/assets/product-details/green-x21/Green_X_21_03.webp", source: "https://vatechmexico.com/wp-content/uploads/2026/03/Green_X_21_03.webp" },
  smartPlus: { local: "/assets/products/SMARTPLUS.png", source: "https://vatechmexico.com/wp-content/uploads/2026/07/SMARTPLUS.png" },
  paxiHQ: { local: "/assets/products/PAXI-.png", source: "https://vatechmexico.com/wp-content/uploads/2026/07/PAXI-.png" },
};

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">→</span>;
}

function DeviceImage({ asset, alt, className = "" }: { asset: { local: string; source: string }; alt: string; className?: string }) {
  const [src, setSrc] = useState(asset.local);
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`device-fallback ${className}`} role="img" aria-label={alt}>
        <div className="fallback-head" />
        <div className="fallback-arm left" />
        <div className="fallback-arm right" />
        <div className="fallback-console" />
        <div className="fallback-screen" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} data-original-source={asset.source} onError={() => src === asset.local ? setSrc(asset.source) : setFailed(true)} />;
}

const milestones = [
  { year: "2005", name: "Picasso Trio", note: "Primer sistema 3 en 1", image: remoteAssets.picasso },
  { year: "2007", name: "PaX-Duo3D", note: "Primer sistema Auto-Switching", image: remoteAssets.duo },
  { year: "2008", name: "PaX-Uni3D", note: "Primer sistema One Shot · 0–9 seg CEPH", image: remoteAssets.uni },
  { year: "2009", name: "PaX-Reve3D", note: "Primer sistema con FOV libre", image: remoteAssets.reve },
  { year: "2012", name: "PaX-i", note: "Primer sistema con mejor imagen panorámica", image: remoteAssets.paxi },
  { year: "2013", name: "PaX-i 3D Green", note: "Primer sistema de baja radiación", image: remoteAssets.greenLegacy },
  { year: "2015", name: "EzSensor SOFT", note: "Primer sensor suave y flexible", image: remoteAssets.ezSensorSoft },
  { year: "2017", name: "PaX-i Insight", note: "41 capas digitales de radiografía panorámica", image: remoteAssets.paxiInsight },
  { year: "2020", name: "EzRay Air P", note: "Primer rayo X portátil y ligero", image: remoteAssets.ezRayAirP },
  { year: "2022", name: "A9", note: "Primer sistema lite 3 en 1 con función extra de CT", image: remoteAssets.a9 },
  { year: "2022", name: "Green X", note: "Modo ENDO de 49.5 micras · voxel más pequeño", image: remoteAssets.greenX21 },
];

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroShift, setHeroShift] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useReveal();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? (y / max) * 100 : 0);
        setHeroShift(Math.min(y * 0.11, 72));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <SiteHeader />

      <section id="top" className="hero" ref={heroRef as React.RefObject<HTMLElement>}>
        <div className="hero-grid" />
        <div className="hero-orbit orbit-a" />
        <div className="hero-orbit orbit-b" />
        <div className="hero-copy" style={{ transform: `translateY(${heroShift * -0.16}px)` }}>
          <p className="eyebrow hero-reveal delay-1">VATECH · DENTAL IMAGING TECHNOLOGY</p>
          <h1 className="hero-title hero-reveal delay-2">
            El futuro de la<br />
            <span>imagenología dental.</span>
          </h1>
          <p className="hero-lead hero-reveal delay-3">
            Líder mundial en innovación radiológica dental en Colombia y Latinoamérica.
          </p>
          <div className="hero-actions hero-reveal delay-4">
            <a className="btn btn-primary" href="#products">Explorar productos <Arrow /></a>
            <a className="btn btn-ghost" href="#company">Conocer VATECH <Arrow /></a>
          </div>
          <a href="#company" className="scroll-cue hero-reveal delay-5">
            <span className="mouse"><i /></span>
            Scroll to explore
          </a>
        </div>
        <div className="hero-product" style={{ transform: `translate3d(0, ${heroShift * 0.25}px, 0) scale(${1 + heroShift / 2200})` }}>
          <div className="scan-ring ring-1" />
          <div className="scan-ring ring-2" />
          <div className="scan-ring ring-3" />
          <DeviceImage asset={remoteAssets.greenX21} alt="Equipo CBCT dental VATECH Green X21" className="hero-device" />
          <div className="floating-spec spec-a"><b>SMART</b><span>PRECISION<br />IMAGING</span></div>
          <div className="floating-spec spec-b"><span>3D / CBCT</span><b>SCAN</b></div>
        </div>
      </section>

      <section className="stats" id="company">
        <div className="stats-heading" data-reveal>
          <p className="eyebrow red">LIDERAZGO GLOBAL</p>
          <h2>Innovación que<br />marca el estándar.</h2>
        </div>
        <div className="stat" data-reveal><strong>+70</strong><span>países</span><p>Presencia internacional de la tecnología VATECH.</p></div>
        <div className="stat" data-reveal><strong>15+</strong><span>años de innovación</span><p>Desarrollando soluciones para imagenología dental.</p></div>
        <div className="stat" data-reveal><strong>1ª</strong><span>empresa mundial</span><p>Referente internacional en ortopantomografía.</p></div>
      </section>

      <section className="ally section-light">
        <div className="section-copy" data-reveal>
          <p className="eyebrow red">DISEÑADO PARA TI</p>
          <h2>Tu mejor aliado<br />en el consultorio.</h2>
          <p>Más de 15 años de innovación constante a nivel global. Desarrollamos y fabricamos cada componente de nuestros equipos, con presencia en Colombia, soporte especializado en Bogotá y una red nacional de distribuidores.</p>
          <a href="/distribuidores" className="text-link">Conoce nuestra red <Arrow /></a>
        </div>
        <div className="ally-visual" data-reveal>
          <div className="technical-circle" />
          <DeviceImage asset={remoteAssets.greenX12} alt="Equipo VATECH Green X12" className="ally-device" />
          <div className="tag-cloud">
            {["3D", "CBCT", "Panoramic", "Imaging", "Precision"].map((t, i) => <span key={t} style={{ "--i": i } as CSSProperties}><i />{t}</span>)}
          </div>
        </div>
      </section>

      <section className="technology">
        <div className="section-copy" data-reveal>
          <p className="eyebrow red">TECNOLOGÍA INTELIGENTE</p>
          <h2>Tecnología que<br />ve más.</h2>
          <p>Una experiencia visual que comunica precisión, profundidad y control alrededor de cada equipo.</p>
          <a href="#products" className="text-link">Explorar tecnología <Arrow /></a>
        </div>
        <div className="technology-stage" data-reveal>
          <DeviceImage asset={remoteAssets.a9} alt="Equipo CBCT dental VATECH A9" className="technology-device" />
          {[
            { x: "38%", y: "20%", title: "Imagenología digital", body: "Detalle y lectura visual de alto nivel." },
            { x: "68%", y: "54%", title: "Flujo clínico", body: "Diseñado para integrarse al consultorio." },
            { x: "32%", y: "76%", title: "Precisión", body: "Tecnología orientada al diagnóstico moderno." },
          ].map((h, i) => (
            <button
              key={h.title}
              className={`hotspot ${activeHotspot === i ? "active" : ""}`}
              style={{ left: h.x, top: h.y }}
              onMouseEnter={() => setActiveHotspot(i)}
              onFocus={() => setActiveHotspot(i)}
              aria-label={h.title}
            >+
            </button>
          ))}
          <div className="hotspot-card">
            <small>0{activeHotspot + 1}</small>
            <h3>{[
              "Imagenología digital",
              "Flujo clínico",
              "Precisión",
            ][activeHotspot]}</h3>
            <p>{[
              "Detalle y lectura visual de alto nivel.",
              "Diseñado para integrarse al consultorio.",
              "Tecnología orientada al diagnóstico moderno.",
            ][activeHotspot]}</p>
          </div>
        </div>
      </section>

      <section className="cinematic">
        <div className="cinematic-sticky">
          <div className="cinematic-copy" data-reveal>
            <p className="eyebrow red">PRECISIÓN EN MOVIMIENTO</p>
            <h2>Más detalle.<br /><span>Mayor precisión.</span></h2>
            <p>Una nueva dimensión de imagen para una experiencia clínica más clara, intuitiva y moderna.</p>
          </div>
          <div className="cinematic-visual" data-reveal>
            <div className="red-glow" />
            <DeviceImage asset={remoteAssets.greenX21} alt="Equipo VATECH Green X21 en composición cinematográfica" className="cinematic-device" />
            <div className="scan-line" />
          </div>
        </div>
      </section>

      <section className="history" id="history">
        <div className="history-intro" data-reveal>
          <p className="eyebrow red">INNOVACIÓN QUE TRASCIENDE</p>
          <h2>Una historia de<br />primeros mundos.</h2>
          <p>Proporcionamos a la industria dental soluciones innovadoras que permiten mejorar la calidad de vida de las personas.</p>
        </div>
        <div className="timeline" data-reveal>
          {milestones.map((m, i) => (
            <button className={`timeline-card ${activeTimeline === i ? "active" : ""}`} key={m.year + m.name} onMouseEnter={() => setActiveTimeline(i)} onFocus={() => setActiveTimeline(i)}>
              <span className="timeline-year">{m.year}</span>
              <DeviceImage asset={m.image} alt={m.name} className="timeline-img" />
              <strong>{m.name}</strong>
              <small>{m.note}</small>
              <i className="timeline-dot" />
            </button>
          ))}
        </div>
      </section>

      <section className="products section-light" id="products">
        <div className="products-heading" data-reveal>
          <div>
            <p className="eyebrow red">EQUIPOS DESTACADOS</p>
            <h2>Soluciones diseñadas<br />para cada necesidad.</h2>
          </div>
          <a href="/productos" className="text-link">Ver todos los productos <Arrow /></a>
        </div>
        <div className="product-grid">
          {[
            { name: "Green X16 / Green X18", desc: "Sistema de imagen 3D", img: remoteAssets.greenX16, href: "/productos/green-x16-green-x18" },
            { name: "Green X12", desc: "CBCT · Multi FOV", img: remoteAssets.greenX12, href: "/productos/green-x12" },
            { name: "A9", desc: "Sistema 3 en 1", img: remoteAssets.a9, href: "/productos/a9" },
            { name: "Green X21", desc: "FOV 21×19", img: remoteAssets.greenX21, href: "/productos/green-x21" },
          ].map((p, i) => (
            <article className={`product-card p${i + 1}`} key={p.name} data-reveal>
              <div className="product-meta"><span>0{i + 1}</span><small>{p.desc}</small></div>
              <h3>{p.name}</h3>
              <DeviceImage asset={p.img} alt={p.name} className="product-img" />
              <a href={p.href}>Explorar equipo <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="service" id="service">
        <div className="service-heading" data-reveal>
          <p className="eyebrow red">SIEMPRE CONTIGO</p>
          <h2>Tecnología avanzada.<br />Soporte a la misma altura.</h2>
        </div>
        <div className="service-list">
          {[
            ["01", "Instalación", "Puesta en marcha profesional y acompañamiento especializado."],
            ["02", "Mantenimiento", "Atención preventiva para proteger el rendimiento del equipo."],
            ["03", "Garantía", "Respaldo oficial para tu inversión tecnológica."],
            ["04", "Soporte especializado", "Asistencia técnica cuando más la necesitas."],
          ].map(([n, title, text]) => (
            <article key={n} data-reveal>
              <span>{n}</span>
              <div className="service-icon"><i /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="global" id="global">
        <div className="global-copy" data-reveal>
          <p className="eyebrow red">PRESENCIA GLOBAL</p>
          <h2>Tecnología presente<br />en más de 70 países.</h2>
          <p>Una red internacional respaldada por presencia local, distribuidores y soporte especializado.</p>
          <a href="/distribuidores" className="text-link light">Encontrar distribuidor <Arrow /></a>
        </div>
        <div className="world-map" aria-hidden="true" data-reveal>
          <svg viewBox="0 0 900 360" role="presentation">
            <g className="map-lines">
              <path d="M90 120 C160 60, 250 64, 302 130 S398 190, 454 132 S580 72, 670 120 S784 196, 840 160" />
              <path d="M180 170 C250 220, 310 210, 360 178 S470 130, 530 180 S650 240, 760 210" />
              <path d="M300 86 C350 120, 380 150, 450 150 S570 140, 620 90" />
            </g>
            <g className="map-dots">
              {[110,150,190,235,280,325,380,430,475,520,565,610,655,700,745,790].map((x, i) => (
                <circle key={x} cx={x} cy={90 + ((i * 47) % 160)} r={i % 4 === 0 ? 6 : 3.2} className={i % 4 === 0 ? "hot" : ""} />
              ))}
            </g>
          </svg>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="cta-radar" />
        <div data-reveal>
          <p className="eyebrow light">EL SIGUIENTE PASO</p>
          <h2>Ve más.<br />Diagnostica mejor.</h2>
          <p>Descubre cómo la tecnología VATECH puede transformar tu práctica.</p>
        </div>
        <div className="cta-actions" data-reveal>
          <a className="btn btn-white" href="mailto:contacto@vatechcolombia.com">Hablar con un especialista <Arrow /></a>
          <a className="btn btn-red-outline" href="/productos">Explorar productos <Arrow /></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
