import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import OriginalAssetImage from "@/components/OriginalAssetImage";
import { getAboutPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";
import { Lines } from "@/lib/cms/text";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getAboutPage()).seo, "/quienes-somos");
}

export default async function QuienesSomosPage() {
  const { hero, intro, support, reasons } = await getAboutPage();
  return (
    <SubpageShell
      eyebrow={hero.eyebrow}
      title={<>{hero.title}<br/><span>{hero.highlight}</span></>}
      lead={hero.lead}
      centered
    >
      <section className="content-split intro-story">
        <div data-reveal>
          <p className="eyebrow red">{intro.eyebrow}</p>
          <h2><Lines text={intro.title} /></h2>
        </div>
        <div className="prose" data-reveal>
          {intro.paragraphs.map((text, i) => <p key={i}>{text}</p>)}
        </div>
      </section>

      <section className="dark-feature">
        <div className="dark-feature-radar" />
        <div data-reveal><p className="eyebrow red">{support.eyebrow}</p><h2><Lines text={support.title} /></h2></div>
        <div className="dark-stat-grid" data-reveal>
          {support.stats.map((stat, i) => <article key={`${stat.value}-${i}`}><strong>{stat.value}</strong><p>{stat.label}</p></article>)}
        </div>
      </section>

      <section className="number-one-section">
        <div className="section-sticky-title" data-reveal><p className="eyebrow red">{reasons.eyebrow}</p><h2><Lines text={reasons.title} /></h2><OriginalAssetImage localSrc={reasons.image.local} sourceSrc={reasons.image.source} alt={reasons.image.alt || ""} className="number-one-source-art" loading="lazy"/></div>
        <div className="reason-list">
          {reasons.items.map((reason, i) => <article key={`${reason}-${i}`} data-reveal><span>{String(i+1).padStart(2,"0")}</span><p>{reason}</p></article>)}
        </div>
      </section>
    </SubpageShell>
  );
}
