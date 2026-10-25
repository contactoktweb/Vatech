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
  greenX12SE: { local: "/assets/products/X12.png", source: "https://vatechmexico.com/wp-content/uploads/2026/07/X12.png" },
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
  const [isSpecialistModalOpen, setIsSpecialistModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useReveal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSpecialistModalOpen(false);
      }
    };
    if (isSpecialistModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSpecialistModalOpen]);

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
          <p className="eyebrow hero-reveal delay-1">VATECH COLOMBIA · LÍDER MUNDIAL EN IMAGENOLOGÍA DENTAL</p>
          <h1 className="hero-title hero-reveal delay-2">
            Innovación en radiología<br />
            <span>dental para tu clínica.</span>
          </h1>
          <p className="hero-lead hero-reveal delay-3">
            Fabricante #1 a nivel global en tomografía CBCT 3D/2D, sensores intraorales y software digital. Máxima precisión diagnóstica con la menor dosis de radiación y presencia oficial directa en Colombia.
          </p>
          <div className="hero-actions hero-reveal delay-4">
            <a className="btn btn-primary" href="#products">Explorar productos <Arrow /></a>
            <a className="btn btn-ghost" href="#contact">Solicitar cotización <Arrow /></a>
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

        {/* 1: 1a Empresa mundial */}
        <div className="stat" data-reveal>
          <div className="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
              <circle cx="24" cy="20" r="15" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="3 2" opacity="0.6" />
              <circle cx="24" cy="20" r="11" fill="rgba(219,7,47,0.08)" stroke="var(--red)" strokeWidth="2" />
              <path d="M24 13l2 4.3 4.7.7-3.4 3.3.8 4.7-4.1-2.2-4.1 2.2.8-4.7-3.4-3.3 4.7-.7L24 13z" fill="var(--red)" />
              <path d="M17 33l-3 9 10-3.5 10 3.5-3-9" stroke="#1a1a1d" strokeWidth="2" strokeLinejoin="round" fill="rgba(26,26,29,0.04)" />
            </svg>
          </div>
          <div className="stat-val-group">
            <strong>1ª</strong>
            <span>empresa mundial</span>
          </div>
          <p>Referente internacional en ortopantomografía y tomografía dental 3D.</p>
        </div>

        {/* 2: +70 países */}
        <div className="stat" data-reveal>
          <div className="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
              <circle cx="24" cy="24" r="18" stroke="#1a1a1d" strokeWidth="2" />
              <ellipse cx="24" cy="24" rx="7.5" ry="18" stroke="var(--red)" strokeWidth="1.8" />
              <path d="M6 24h36M8 15h32M8 33h32" stroke="rgba(26,26,29,0.3)" strokeWidth="1.5" />
              <circle cx="31" cy="18" r="3.5" fill="var(--red)" />
              <circle cx="16" cy="30" r="2.8" fill="var(--red)" />
            </svg>
          </div>
          <div className="stat-val-group">
            <strong>+70</strong>
            <span>países</span>
          </div>
          <p>Presencia internacional de la tecnología VATECH con sede directa en Colombia.</p>
        </div>

        {/* 3: 15+ años de innovación */}
        <div className="stat" data-reveal>
          <div className="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
              <path d="M24 5v5M24 38v5M5 24h5M38 24h5" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
              <rect x="13" y="13" width="22" height="22" rx="6" stroke="#1a1a1d" strokeWidth="2" />
              <circle cx="24" cy="24" r="5.5" fill="rgba(219,7,47,0.12)" stroke="var(--red)" strokeWidth="2" />
              <path d="M19 24h10M24 19v10" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="stat-val-group">
            <strong>15+</strong>
            <span>años de innovación</span>
          </div>
          <p>Desarrollando soluciones patentadas de vanguardia para imagenología dental.</p>
        </div>
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

      <section className="benefits-section" id="benefits">
        <div className="benefits-heading" data-reveal>
          <p className="eyebrow red">BENEFICIOS CLAVE</p>
          <h2>Por qué elegir VATECH<br />para tu clínica.</h2>
          <p className="benefits-lead">
            Desarrollamos y fabricamos cada componente de nuestros equipos para garantizar diagnósticos confiables, rápida adopción clínica y protección integral del paciente.
          </p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card" data-reveal>
            <div className="benefit-badge">01</div>
            <h3>Mínima Radiación</h3>
            <p><strong>Tecnología Green</strong> de ultra baja dosis de radiación que protege al paciente y a tu equipo sin comprometer la resolución diagnóstica.</p>
          </div>
          <div className="benefit-card" data-reveal>
            <div className="benefit-badge">02</div>
            <h3>Máxima Precisión 49.5 µm</h3>
            <p><strong>Modo ENDO</strong> con el vóxel más pequeño del mercado para visualizar conductos radiculares, fisuras y microestructuras con total nitidez.</p>
          </div>
          <div className="benefit-card" data-reveal>
            <div className="benefit-badge">03</div>
            <h3>Escaneo Ultrarrápido</h3>
            <p>Captura panorámica y tomográfica en tan solo <strong>1.9 a 4.9 segundos</strong>, eliminando artefactos por movimiento involuntario del paciente.</p>
          </div>
          <div className="benefit-card" data-reveal>
            <div className="benefit-badge">04</div>
            <h3>Presencia Oficial en Colombia</h3>
            <p>Sede propia en Bogotá, respaldo directo de fábrica, <strong>disponibilidad de repuestos originales</strong> y capacitación continua.</p>
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
            { name: "A9", desc: "Sistema 3 en 1 · LITE", img: remoteAssets.a9, href: "/productos/a9" },
            { name: "Green X 12", desc: "CST Reconstrucción 10x", img: remoteAssets.greenX12, href: "/productos/green-x12" },
            { name: "Green X-12 SE", desc: "Sistema 4 en 1 · CBCT", img: remoteAssets.greenX12SE, href: "/productos/green-x-12-se" },
            { name: "Green X 16", desc: "Endodoncia e Implantes", img: remoteAssets.greenX16, href: "/productos/green-x16" },
            { name: "Green X 18", desc: "ATM y Maxilofacial", img: remoteAssets.greenX16, href: "/productos/green-x18" },
            { name: "Green X 21", desc: "FOV 21×19 · Próximamente", img: remoteAssets.greenX21, href: "/productos/green-x21" },
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
            {
              title: "Instalación",
              desc: "Puesta en marcha profesional y acompañamiento especializado.",
              icon: (
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="21" fill="rgba(219,7,47,0.06)" stroke="rgba(219,7,47,0.2)" strokeWidth="1.2" />
                  <path d="M16 32l6-6M14 34l2 2" stroke="#1a1a1d" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M20 20l3-3a4.24 4.24 0 016 0l2 2a4.24 4.24 0 010 6l-3 3" stroke="#1a1a1d" strokeWidth="2" strokeLinecap="round" />
                  <path d="M25 15l8 8" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="34" cy="34" r="5" stroke="var(--red)" strokeWidth="1.8" />
                  <path d="M34 32v4M32 34h4" stroke="var(--red)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              title: "Mantenimiento",
              desc: "Atención preventiva para proteger el rendimiento del equipo.",
              icon: (
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="21" fill="rgba(219,7,47,0.06)" stroke="rgba(219,7,47,0.2)" strokeWidth="1.2" />
                  <path d="M24 13a11 11 0 1010.5 7.5" stroke="#1a1a1d" strokeWidth="2" strokeLinecap="round" />
                  <path d="M35 15v6h-6" stroke="#1a1a1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 25h4l2-4 3 8 2.5-5 2.5 1h3" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: "Garantía",
              desc: "Respaldo oficial para tu inversión tecnológica.",
              icon: (
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="21" fill="rgba(219,7,47,0.06)" stroke="rgba(219,7,47,0.2)" strokeWidth="1.2" />
                  <path d="M24 11l10 4v7c0 7-5 12-10 14-5-2-10-7-10-14v-7l10-4z" stroke="#1a1a1d" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M19 24l3.5 3.5L30 20" stroke="var(--red)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: "Soporte especializado",
              desc: "Asistencia técnica cuando más la necesitas.",
              icon: (
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="21" fill="rgba(219,7,47,0.06)" stroke="rgba(219,7,47,0.2)" strokeWidth="1.2" />
                  <path d="M15 25v-3a9 9 0 0118 0v3" stroke="#1a1a1d" strokeWidth="2" strokeLinecap="round" />
                  <rect x="12" y="24" width="5" height="8" rx="2" stroke="#1a1a1d" strokeWidth="2" fill="white" />
                  <rect x="31" y="24" width="5" height="8" rx="2" stroke="#1a1a1d" strokeWidth="2" fill="white" />
                  <path d="M33 30v2a5 5 0 01-5 5h-4" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="22" cy="37" r="1.8" fill="var(--red)" />
                </svg>
              ),
            },
          ].map((item) => (
            <article key={item.title} data-reveal>
              <div className="service-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
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

      <section className="contact-section" id="contact">
        <div className="contact-container" data-reveal>
          <div className="contact-info-panel">
            <p className="eyebrow red">CONTACTO DIRECTO · COLOMBIA</p>
            <h2>Solicita cotización o asesoría técnica.</h2>
            <p>
              Comunícate directamente con nuestros especialistas en Colombia para recibir asesoría personalizada, fichas técnicas o demostración de equipos.
            </p>

            <div className="contact-methods">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent("Hola VATECH Colombia, me gustaría recibir más información y asesoría sobre sus equipos radiológicos.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card whatsapp"
              >
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <strong>WhatsApp Comercial</strong>
                  <span>+57 312 6344188</span>
                </div>
              </a>

              <a href="mailto:marketing.colombia@vatechglobal.com" className="contact-card email">
                <div className="contact-card-icon">✉</div>
                <div>
                  <strong>Correo Oficial</strong>
                  <span>marketing.colombia@vatechglobal.com</span>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/2oGW1g6WhiqN3TLZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card location"
                title="Abrir ubicación de VATECH Colombia en Google Maps"
              >
                <div className="contact-card-icon">📍</div>
                <div>
                  <strong>Sede Bogotá · Teleport Business Park</strong>
                  <span>Cra. 7 # 113-43, Oficina 805 · Ver mapa ↗</span>
                </div>
              </a>
            </div>
          </div>
          <form className="contact-form-card" onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const name = data.get("name") || "";
            const phone = data.get("phone") || "";
            const email = data.get("email") || "";
            const product = data.get("product") || "Equipos Vatech";
            const message = data.get("message") || "";
            const text = `Hola Vatech Colombia, mi nombre es ${name}. Deseo cotizar: ${product}. Tel: ${phone}, Email: ${email}. Mensaje: ${message}`;
            window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent(text)}`, "_blank");
          }}>
            <h3>Cotizador Rápido</h3>
            <p>Déjanos tus datos y un especialista te contactará de inmediato con precios y disponibilidad.</p>

            <div className="form-group">
              <label htmlFor="quote-name">Nombre y Apellido</label>
              <input id="quote-name" name="name" type="text" required placeholder="Dr. / Dra. Nombre Completo" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quote-phone">Teléfono / WhatsApp</label>
                <input id="quote-phone" name="phone" type="tel" required placeholder="+57 300 123 4567" />
              </div>
              <div className="form-group">
                <label htmlFor="quote-email">Correo Electrónico</label>
                <input id="quote-email" name="email" type="email" required placeholder="doctor@clinica.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="quote-product">Equipo o Solución de Interés</label>
              <select id="quote-product" name="product" defaultValue="A9">
                <option value="A9">Tomógrafo A9 (Sistema 3 en 1 LITE)</option>
                <option value="Green X 12">Tomógrafo Green X 12 (Reconstrucción CST 10x)</option>
                <option value="Green X-12 SE">Tomógrafo Green X-12 SE (4 en 1 CBCT)</option>
                <option value="Green X 16">Tomógrafo Green X 16 (Endodoncia e Implantes)</option>
                <option value="Green X 18">Tomógrafo Green X 18 (ATM y Campo Extendido)</option>
                <option value="Green X 21">Tomógrafo Green X 21 (FOV 21×19 · Próximamente)</option>
                <option value="PaX-i">Panorámico 2D PaX-i / PaX-i Plus</option>
                <option value="EzRay Air Portatil">Rayos X Portátil EzRay Air</option>
                <option value="EzSensor HD">Sensor Digital EzSensor HD / Classic</option>
                <option value="Software Vatech">Software (Ez3D-i / EzDent-i / EzOrtho / Clever RC)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quote-message">Comentarios o Ciudad</label>
              <textarea id="quote-message" name="message" rows={3} placeholder="¿Para qué clínica o ciudad requieres la información?" />
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Solicitar Cotización por WhatsApp <Arrow />
            </button>
          </form>
        </div>
      </section>

      {/* Sección Ve más. Diagnostica mejor (CTA Principal) */}
      <section className="final-cta" id="ve-mas-diagnostica">
        <div className="cta-radar" aria-hidden="true" />
        <div data-reveal>
          <p className="eyebrow light">EL SIGUIENTE PASO</p>
          <h2>Ve más.<br />Diagnostica mejor.</h2>
          <p>Descubre cómo la tecnología VATECH puede transformar tu práctica.</p>
        </div>
        <div className="cta-actions" data-reveal>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent("Hola VATECH Colombia, me gustaría hablar directamente con un especialista sobre sus equipos radiológicos.")}`}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-whatsapp-directo"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>WhatsApp directo</span>
            <Arrow />
          </a>

          <a
            className="btn btn-white"
            href="mailto:marketing.colombia@vatechglobal.com?subject=Consulta%20con%20Especialista%20-%20VATECH%20Colombia&body=Hola%20equipo%20VATECH%20Colombia%2C%0A%0AMe%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20con%20un%20especialista%20sobre%20sus%20equipos%20radiologicos.%0A%0ACl%C3%ADnica%20o%20Ciudad%3A%0ATel%C3%A9fono%3A%0AEquipo%20de%20inter%C3%A9s%3A"
            onClick={(e) => {
              e.preventDefault();
              setIsSpecialistModalOpen(true);
            }}
            id="cta-habla-especialista"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Habla con un especialista</span>
            <Arrow />
          </a>
        </div>
      </section>

      {/* Modal Interactivo: Habla con un especialista (WhatsApp directo y Correo electrónico) */}
      {isSpecialistModalOpen && (
        <div
          className="specialist-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="specialist-modal-title"
          onClick={() => setIsSpecialistModalOpen(false)}
        >
          <div
            className="specialist-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="specialist-modal-close"
              onClick={() => setIsSpecialistModalOpen(false)}
              aria-label="Cerrar ventana de contacto"
            >
              ✕
            </button>

            <div className="specialist-modal-header">
              <p className="specialist-modal-eyebrow">ASESORÍA OFICIAL VATECH COLOMBIA</p>
              <h3 id="specialist-modal-title" className="specialist-modal-title">
                Habla con un especialista
              </h3>
              <p className="specialist-modal-subtitle">
                Selecciona tu opción de contacto preferida para conectarte directamente con nuestro equipo:
              </p>
            </div>

            <div className="specialist-modal-options">
              {/* Opción 1: WhatsApp directo */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent("Hola VATECH Colombia, deseo hablar con un especialista sobre sus equipos odontológicos y radiológicos.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="specialist-option-card whatsapp"
                id="modal-option-whatsapp"
              >
                <div className="specialist-option-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="specialist-option-info">
                  <h4>Vía WhatsApp directo</h4>
                  <p>Atención inmediata por chat comercial</p>
                  <strong>+57 312 6344188</strong>
                </div>
                <div className="specialist-option-action">
                  <span>Chatear</span>
                  <Arrow />
                </div>
              </a>

              {/* Opción 2: Correo electrónico */}
              <a
                href="mailto:marketing.colombia@vatechglobal.com?subject=Consulta%20con%20Especialista%20-%20VATECH%20Colombia&body=Hola%20equipo%20VATECH%20Colombia%2C%0A%0AMe%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20personalizada%20con%20un%20especialista%20sobre%20sus%20equipos%20radiologicos.%0A%0ACl%C3%ADnica%20o%20Ciudad%3A%0ATel%C3%A9fono%3A%0AEquipo%20de%20inter%C3%A9s%3A"
                className="specialist-option-card email"
                id="modal-option-email"
              >
                <div className="specialist-option-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="specialist-option-info">
                  <h4>Vía Correo electrónico</h4>
                  <p>Envío de consulta formal o ficha técnica</p>
                  <strong>marketing.colombia@vatechglobal.com</strong>
                </div>
                <div className="specialist-option-action">
                  <span>Escribir</span>
                  <Arrow />
                </div>
              </a>
            </div>

            <div className="specialist-modal-footer">
              <a
                href="https://maps.app.goo.gl/2oGW1g6WhiqN3TLZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="specialist-modal-location-link"
                title="Abrir ubicación en Google Maps"
              >
                📍 Sede Bogotá · Cra. 7 # 113-43, Of. 805 (Teleport Business Park) ↗
              </a>
              <button
                type="button"
                className="specialist-copy-email"
                onClick={() => {
                  navigator.clipboard?.writeText("marketing.colombia@vatechglobal.com");
                  setEmailCopied(true);
                  setTimeout(() => setEmailCopied(false), 2500);
                }}
              >
                {emailCopied ? "✓ Correo copiado" : "Copiar dirección de correo"}
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
