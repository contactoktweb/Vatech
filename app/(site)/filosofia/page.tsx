import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import OriginalAssetImage from "@/components/OriginalAssetImage";
import { getPhilosophyPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";
import { Lines } from "@/lib/cms/text";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getPhilosophyPage()).seo, "/filosofia");
}

export default async function FilosofiaPage() {
  const { hero, corporate, intro, stages, stageLabel, epilogue } = await getPhilosophyPage();
  const { mission, vision, quality, values } = corporate;
  return (
    <SubpageShell
      eyebrow={hero.eyebrow}
      title={
        <>
          {hero.title}
          <br />
          <span>{hero.highlight}</span>
        </>
      }
      lead={hero.lead}
      heroAside={
        <div className="quote-orbit">
          <span>{hero.symbol}</span>
          <small>{hero.symbolCaption}</small>
        </div>
      }
    >
      {/* SECCIÓN INSTITUCIONAL: MISIÓN, VISIÓN, POLÍTICA DE CALIDAD Y VALORES */}
      <section className="corporate-philosophy-section" id="filosofia-corporativa">
        <div className="corp-section-head" data-reveal>
          <p className="eyebrow red">{corporate.eyebrow}</p>
          <h2><Lines text={corporate.title} /></h2>
          <p>{corporate.text}</p>
        </div>

        <div className="corp-pillars-grid">
          {/* 01 · MISIÓN */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">01</span>
                <span className="tag">{mission.tag}</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>
            <h3>{mission.title}</h3>
            <blockquote>“{mission.quote}”</blockquote>
            <p className="corp-card-desc">{mission.text}</p>
          </article>

          {/* 02 · VISIÓN */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">02</span>
                <span className="tag">{vision.tag}</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </div>
            <h3>{vision.title}</h3>
            <blockquote>“{vision.quote}”</blockquote>
            <p className="corp-card-desc">{vision.text}</p>
          </article>

          {/* 03 · POLÍTICA DE CALIDAD */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">03</span>
                <span className="tag">{quality.tag}</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>
            <h3>{quality.title}</h3>
            <p className="corp-statement">{quality.text}</p>
            <div className="corp-checklist">
              {quality.checklist.map((item, i) => (
                <div className="corp-check-item" key={i}>
                  <span className="corp-check-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          {/* 04 · VALORES CORPORATIVOS */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">04</span>
                <span className="tag">{values.tag}</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
            </div>
            <h3>{values.title}</h3>
            <div className="corp-values-grid">
              {values.items.map((item, i) => (
                <div className="corp-value-item" key={i}>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="philosophy-intro content-split">
        <div data-reveal>
          <p className="eyebrow red">{intro.eyebrow}</p>
          <h2><Lines text={intro.title} /></h2>
        </div>
        <div className="prose" data-reveal>
          <p>{intro.text}</p>
        </div>
      </section>

      <section className="philosophy-stages">
        {stages.map((s, i) => {
          const n = String(i + 1).padStart(2, "0");
          return (
          <article className={`philosophy-stage ${i % 2 ? "reverse" : ""}`} key={`${s.title}-${i}`}>
            <div className="philosophy-image" data-reveal>
              {s.image?.local && <OriginalAssetImage localSrc={s.image.local} sourceSrc={s.image.source} alt={s.image.alt || "Historia y filosofía VATECH"} loading="lazy" />}
              <span>{n}</span>
            </div>
            <div className="philosophy-copy" data-reveal>
              <p className="eyebrow red">{stageLabel} {n}</p>
              <h2>{s.title}</h2>
              <blockquote>“{s.quote}”</blockquote>
              <p>{s.text}</p>
            </div>
          </article>
          );
        })}
      </section>

      <section className="meditation-end">
        <div className="meditation-ring" />
        <div data-reveal>
          <p className="eyebrow red">{epilogue.eyebrow}</p>
          <h2><Lines text={epilogue.title} /></h2>
          <p>{epilogue.text}</p>
        </div>
      </section>
    </SubpageShell>
  );
}
