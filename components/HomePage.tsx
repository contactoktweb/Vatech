"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useSiteSettings, useWhatsAppLink } from "./SiteSettingsProvider";
import { MailIcon, PinIcon, WhatsAppIcon, CheckIcon } from "./icons";
import { SERVICE_ICONS, STAT_ICONS } from "./homeIcons";
import { Lines, Rich } from "@/lib/cms/text";
import type { CmsImage, HomePageContent } from "@/lib/cms/types";

// Sedes VATECH sobre el mapa del mundo (coordenadas en el mismo sistema que /assets/world-dots.svg)
const WORLD_OFFICES: Record<string, [number, number]> = {
  "Bogotá": [264.8, 207.3], "Nueva Jersey": [265.1, 107.8], "São Paulo": [333.3, 285.3], "París": [456.5, 85.8],
  "Barcelona": [456, 106], "Londres": [449.5, 78.9], "Praga": [486.2, 82.5], "Moscú": [544, 66.9], "Dubái": [588.2, 150.9],
  "Nueva Delhi": [642.9, 141.6], "Shanghái": [753.5, 134.5], "Corea": [767.5, 117.9], "Taipéi": [753.9, 151.2],
  "Hong Kong": [735.6, 159], "Hanói": [714.4, 162.4], "Kuala Lumpur": [704, 211.8], "Yakarta": [717, 237.4], "Sídney": [827.7, 313.4],
};
// Conexiones desde la casa matriz en Corea
const WORLD_LINKS: [string, string][] = [["Corea", "Bogotá"], ["Corea", "París"], ["Corea", "Sídney"], ["Bogotá", "São Paulo"], ["Bogotá", "Nueva Jersey"]];

// Posición fija de los puntos interactivos sobre la imagen de tecnología
const HOTSPOT_POSITIONS = [
  { x: "38%", y: "20%" },
  { x: "68%", y: "54%" },
  { x: "32%", y: "76%" },
];

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

function DeviceImage({ asset, alt, className = "" }: { asset?: CmsImage; alt: string; className?: string }) {
  const [src, setSrc] = useState(asset?.local ?? "");
  const [failed, setFailed] = useState(false);
  useEffect(() => { setSrc(asset?.local ?? ""); setFailed(false); }, [asset?.local]);
  if (!asset?.local) return null;
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
  return <img src={src} alt={asset.alt || alt} className={className} data-original-source={asset.source} onError={() => src === asset.local && asset.source !== asset.local ? setSrc(asset.source) : setFailed(true)} />;
}

const mailto = (email: string, subject?: string, body?: string) => {
  const params = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join("&");
  return `mailto:${email}${params ? `?${params}` : ""}`;
};

export default function HomePage({ content }: { content: HomePageContent }) {
  const { hero, stats, ally, benefits, technology, cinematic, history, featured, service, global, contact: contactSection, finalCta, specialistModal: modal } = content;
  const { contact } = useSiteSettings();
  const whatsapp = useWhatsAppLink();

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

  const hotspots = technology.hotspots.slice(0, HOTSPOT_POSITIONS.length);
  const activeSpot = hotspots[activeHotspot] ?? hotspots[0];
  const specialistMail = mailto(contact.email, modal.emailSubject, modal.emailBody);

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <SiteHeader />

      <section id="top" className="hero" ref={heroRef as React.RefObject<HTMLElement>}>
        <div className="hero-grid" />
        <div className="hero-orbit orbit-a" />
        <div className="hero-orbit orbit-b" />
        <div className="hero-copy" style={{ transform: `translateY(${heroShift * -0.16}px)` }}>
          <p className="eyebrow hero-reveal delay-1">{hero.eyebrow}</p>
          <h1 className="hero-title hero-reveal delay-2">
            {hero.title}<br />
            <span>{hero.highlight}</span>
          </h1>
          <p className="hero-lead hero-reveal delay-3">{hero.lead}</p>
          <div className="hero-actions hero-reveal delay-4">
            <a className="btn btn-primary" href={hero.primaryCta.href}>{hero.primaryCta.label} <Arrow /></a>
            <a className="btn btn-ghost" href={hero.secondaryCta.href}>{hero.secondaryCta.label} <Arrow /></a>
          </div>
          <a href="#company" className="scroll-cue hero-reveal delay-5">
            <span className="mouse"><i /></span>
            {hero.scrollLabel}
          </a>
        </div>
        <div className="hero-product" style={{ transform: `translate3d(0, ${heroShift * 0.25}px, 0) scale(${1 + heroShift / 2200})` }}>
          <div className="scan-ring ring-1" />
          <div className="scan-ring ring-2" />
          <div className="scan-ring ring-3" />
          <DeviceImage asset={hero.image} alt="Equipo CBCT dental VATECH" className="hero-device" />
          <div className="floating-spec spec-a"><b>SMART</b><span>PRECISION<br />IMAGING</span></div>
          <div className="floating-spec spec-b"><span>3D / CBCT</span><b>SCAN</b></div>
        </div>
      </section>

      <section className="stats" id="company">
        <div className="stats-heading" data-reveal>
          <p className="eyebrow red">{stats.eyebrow}</p>
          <h2><Lines text={stats.title} /></h2>
        </div>

        {stats.items.map((item, i) => (
          <div className="stat" data-reveal key={`${item.value}-${i}`}>
            <div className="stat-icon" aria-hidden="true">{STAT_ICONS[i % STAT_ICONS.length]}</div>
            <div className="stat-val-group">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
            <p>{item.text}</p>
          </div>
        ))}
      </section>

      <section className="ally section-light">
        <div className="section-copy" data-reveal>
          <p className="eyebrow red">{ally.eyebrow}</p>
          <h2><Lines text={ally.title} /></h2>
          <p>{ally.text}</p>
          <a href={ally.link.href} className="text-link">{ally.link.label} <Arrow /></a>
        </div>
        <div className="ally-visual" data-reveal>
          <div className="technical-circle" />
          <DeviceImage asset={ally.image} alt="Equipo VATECH" className="ally-device" />
          <div className="tag-cloud">
            {ally.tags.map((t, i) => <span key={`${t}-${i}`} style={{ "--i": i } as CSSProperties}><i />{t}</span>)}
          </div>
        </div>
      </section>

      <section className="benefits-section" id="benefits">
        <div className="benefits-heading" data-reveal>
          <p className="eyebrow red">{benefits.eyebrow}</p>
          <h2><Lines text={benefits.title} /></h2>
          <p className="benefits-lead">{benefits.text}</p>
        </div>
        <div className="benefits-grid">
          {benefits.items.map((item, i) => (
            <div className="benefit-card" data-reveal key={`${item.title}-${i}`}>
              <div className="benefit-badge">{String(i + 1).padStart(2, "0")}</div>
              <h3>{item.title}</h3>
              <p><Rich text={item.text} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="technology">
        <div className="section-copy" data-reveal>
          <p className="eyebrow red">{technology.eyebrow}</p>
          <h2><Lines text={technology.title} /></h2>
          <p>{technology.text}</p>
          <a href={technology.link.href} className="text-link">{technology.link.label} <Arrow /></a>
        </div>
        <div className="technology-stage" data-reveal>
          <DeviceImage asset={technology.image} alt="Equipo CBCT dental VATECH" className="technology-device" />
          {hotspots.map((h, i) => (
            <button
              key={`${h.title}-${i}`}
              className={`hotspot ${activeHotspot === i ? "active" : ""}`}
              style={{ left: HOTSPOT_POSITIONS[i].x, top: HOTSPOT_POSITIONS[i].y }}
              onMouseEnter={() => setActiveHotspot(i)}
              onFocus={() => setActiveHotspot(i)}
              aria-label={h.title}
            >+
            </button>
          ))}
          {activeSpot && (
            <div className="hotspot-card">
              <small>0{activeHotspot + 1}</small>
              <h3>{activeSpot.title}</h3>
              <p>{activeSpot.text}</p>
            </div>
          )}
        </div>
      </section>

      <section className="cinematic">
        <div className="cinematic-sticky">
          <div className="cinematic-copy" data-reveal>
            <p className="eyebrow red">{cinematic.eyebrow}</p>
            <h2>{cinematic.title}<br /><span>{cinematic.highlight}</span></h2>
            <p>{cinematic.text}</p>
          </div>
          <div className="cinematic-visual" data-reveal>
            <div className="red-glow" />
            <DeviceImage asset={cinematic.image} alt="Equipo VATECH" className="cinematic-device" />
            <div className="scan-line" />
          </div>
        </div>
      </section>

      <section className="history" id="history">
        <div className="history-intro" data-reveal>
          <p className="eyebrow red">{history.eyebrow}</p>
          <h2><Lines text={history.title} /></h2>
          <p>{history.text}</p>
        </div>
        <div className="timeline" data-reveal>
          {history.milestones.map((m, i) => (
            <button className={`timeline-card ${activeTimeline === i ? "active" : ""}`} key={`${m.year}-${m.name}-${i}`} onMouseEnter={() => setActiveTimeline(i)} onFocus={() => setActiveTimeline(i)}>
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
            <p className="eyebrow red">{featured.eyebrow}</p>
            <h2><Lines text={featured.title} /></h2>
          </div>
          <a href={featured.link.href} className="text-link">{featured.link.label} <Arrow /></a>
        </div>
        <div className="product-grid">
          {featured.items.map((p, i) => (
            <article className={`product-card p${i + 1}`} key={`${p.name}-${i}`} data-reveal>
              <div className="product-meta"><span>0{i + 1}</span><small>{p.label}</small></div>
              <h3>{p.name}</h3>
              <DeviceImage asset={p.image} alt={p.name} className="product-img" />
              <a href={p.href}>{featured.buttonLabel} <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="service" id="service">
        <div className="service-heading" data-reveal>
          <p className="eyebrow red">{service.eyebrow}</p>
          <h2><Lines text={service.title} /></h2>
        </div>
        <div className="service-list">
          {service.items.map((item, i) => (
            <article key={`${item.title}-${i}`} data-reveal>
              <div className="service-icon" aria-hidden="true">
                {SERVICE_ICONS[i % SERVICE_ICONS.length]}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="global" id="global">
        <div className="global-copy" data-reveal>
          <p className="eyebrow red">{global.eyebrow}</p>
          <h2><Lines text={global.title} /></h2>
          <p>{global.text}</p>
          <a href={global.link.href} className="text-link light">{global.link.label} <Arrow /></a>
        </div>
        <div className="world-map" aria-hidden="true" data-reveal>
          <img className="world-map-dots" src="/assets/world-dots.svg" alt="" />
          <svg viewBox="0 0 900 380" role="presentation">
            <g className="map-lines">
              {WORLD_LINKS.map(([from, to]) => {
                const [x1, y1] = WORLD_OFFICES[from]; const [x2, y2] = WORLD_OFFICES[to];
                return <path key={`${from}-${to}`} d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 70} ${x2} ${y2}`} />;
              })}
            </g>
            <g className="map-dots">
              {Object.entries(WORLD_OFFICES).map(([name, [x, y]]) => (
                <circle key={name} cx={x} cy={y} r={name === "Bogotá" || name === "Corea" ? 6.5 : 4} className={name === "Bogotá" || name === "Corea" ? "hot" : "office"} />
              ))}
            </g>
          </svg>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-container" data-reveal>
          <div className="contact-info-panel">
            <p className="eyebrow red">{contactSection.eyebrow}</p>
            <h2><Lines text={contactSection.title} /></h2>
            <p>{contactSection.text}</p>

            <div className="contact-methods">
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer" className="contact-card whatsapp">
                <div className="contact-card-icon">
                  <WhatsAppIcon size={22} />
                </div>
                <div>
                  <strong>{contactSection.whatsappTitle}</strong>
                  <span>{contact.phoneDisplay}</span>
                </div>
              </a>

              <a href={`mailto:${contact.email}`} className="contact-card email">
                <div className="contact-card-icon"><MailIcon size={20} /></div>
                <div>
                  <strong>{contactSection.emailTitle}</strong>
                  <span>{contact.email}</span>
                </div>
              </a>

              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card location"
                title="Abrir ubicación en Google Maps"
              >
                <div className="contact-card-icon"><PinIcon size={20} /></div>
                <div>
                  <strong>{contact.officeName}</strong>
                  <span>{contact.addressShort} · {contactSection.mapLabel} ↗</span>
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
            // El correo al equipo de mercadeo se envía en segundo plano; WhatsApp se abre de inmediato
            fetch("/api/cotizacion", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(data)),
              keepalive: true,
            }).catch(() => {});
            window.open(whatsapp(text), "_blank");
          }}>
            <h3>{contactSection.form.title}</h3>
            <p>{contactSection.form.text}</p>
            <input className="form-honeypot" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="form-group">
              <label htmlFor="quote-name">{contactSection.form.nameLabel}</label>
              <input id="quote-name" name="name" type="text" required placeholder={contactSection.form.namePlaceholder} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quote-phone">{contactSection.form.phoneLabel}</label>
                <input id="quote-phone" name="phone" type="tel" required placeholder={contactSection.form.phonePlaceholder} />
              </div>
              <div className="form-group">
                <label htmlFor="quote-email">{contactSection.form.emailLabel}</label>
                <input id="quote-email" name="email" type="email" required placeholder={contactSection.form.emailPlaceholder} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="quote-product">{contactSection.form.productLabel}</label>
              <select id="quote-product" name="product" defaultValue={contactSection.form.productOptions[0]?.value}>
                {contactSection.form.productOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quote-message">{contactSection.form.messageLabel}</label>
              <textarea id="quote-message" name="message" rows={3} placeholder={contactSection.form.messagePlaceholder} />
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              {contactSection.form.submitLabel} <Arrow />
            </button>
          </form>
        </div>
      </section>

      {/* Sección Ve más. Diagnostica mejor (CTA Principal) */}
      <section className="final-cta" id="ve-mas-diagnostica">
        <div className="cta-radar" aria-hidden="true" />
        <div data-reveal>
          <p className="eyebrow light">{finalCta.eyebrow}</p>
          <h2><Lines text={finalCta.title} /></h2>
          <p>{finalCta.text}</p>
        </div>
        <div className="cta-actions" data-reveal>
          <a
            className="btn btn-whatsapp"
            href={whatsapp(finalCta.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-whatsapp-directo"
          >
            <WhatsAppIcon size={18} />
            <span>{finalCta.whatsappLabel}</span>
            <Arrow />
          </a>

          <a
            className="btn btn-white"
            href={specialistMail}
            onClick={(e) => {
              e.preventDefault();
              setIsSpecialistModalOpen(true);
            }}
            id="cta-habla-especialista"
          >
            <MailIcon size={18} />
            <span>{finalCta.specialistLabel}</span>
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
              <p className="specialist-modal-eyebrow">{modal.eyebrow}</p>
              <h3 id="specialist-modal-title" className="specialist-modal-title">{modal.title}</h3>
              <p className="specialist-modal-subtitle">{modal.subtitle}</p>
            </div>

            <div className="specialist-modal-options">
              {/* Opción 1: WhatsApp directo */}
              <a
                href={whatsapp(modal.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="specialist-option-card whatsapp"
                id="modal-option-whatsapp"
              >
                <div className="specialist-option-icon" aria-hidden="true">
                  <WhatsAppIcon size={24} />
                </div>
                <div className="specialist-option-info">
                  <h4>{modal.whatsappTitle}</h4>
                  <p>{modal.whatsappText}</p>
                  <strong>{contact.phoneDisplay}</strong>
                </div>
                <div className="specialist-option-action">
                  <span>{modal.whatsappAction}</span>
                  <Arrow />
                </div>
              </a>

              {/* Opción 2: Correo electrónico */}
              <a href={specialistMail} className="specialist-option-card email" id="modal-option-email">
                <div className="specialist-option-icon" aria-hidden="true">
                  <MailIcon size={22} />
                </div>
                <div className="specialist-option-info">
                  <h4>{modal.emailTitle}</h4>
                  <p>{modal.emailText}</p>
                  <strong>{contact.email}</strong>
                </div>
                <div className="specialist-option-action">
                  <span>{modal.emailAction}</span>
                  <Arrow />
                </div>
              </a>
            </div>

            <div className="specialist-modal-footer">
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="specialist-modal-location-link"
                title="Abrir ubicación en Google Maps"
              >
                <PinIcon size={14} /> {contact.officeName} · {contact.addressShort} ↗
              </a>
              <button
                type="button"
                className="specialist-copy-email"
                onClick={() => {
                  navigator.clipboard?.writeText(contact.email);
                  setEmailCopied(true);
                  setTimeout(() => setEmailCopied(false), 2500);
                }}
              >
                {emailCopied ? <><CheckIcon size={14} /> {modal.copiedLabel}</> : modal.copyLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
