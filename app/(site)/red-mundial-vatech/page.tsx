import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import OriginalAssetImage from "@/components/OriginalAssetImage";
import { PinIcon } from "@/components/icons";
import { getWorldNetworkPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";
import { Lines } from "@/lib/cms/text";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getWorldNetworkPage()).seo, "/red-mundial-vatech");
}

export default async function RedMundialPage() {
  const { hero, intro, offices, quote } = await getWorldNetworkPage();
  return <SubpageShell eyebrow={hero.eyebrow} title={<>{hero.title}<br/><span>{hero.highlight}</span></>} lead={hero.lead} heroAside={<div className="global-orbit"><div className="globe-core">{hero.badge}</div><span className="orbit-dot d1"/><span className="orbit-dot d2"/><span className="orbit-dot d3"/></div>}>
    <section className="world-intro content-split"><div data-reveal><p className="eyebrow red">{intro.eyebrow}</p><h2><Lines text={intro.title} /></h2></div><div className="prose" data-reveal><p>{intro.text}</p></div></section>
    <section className="office-grid">
      {offices.map((o,i)=><article className="office-card" data-reveal key={`${o.country}-${i}`}>
        <div className="office-source-image">{o.image?.local && <OriginalAssetImage localSrc={o.image.local} sourceSrc={o.image.source} alt={o.image.alt || `Oficina VATECH ${o.country}`} loading="lazy"/>}</div>
        <div className="office-number">{String(i+1).padStart(2,"0")}</div>
        <p className="eyebrow red">{o.country}</p>
        <h3>{o.name}</h3>
        <p>{o.mapUrl ? <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} title="Abrir sede en Google Maps">{o.address} <span style={{ color: "var(--red)", display: "inline-flex", verticalAlign: "middle" }}><PinIcon size={14} /> ↗</span></a> : o.address}</p>
        <a href={`mailto:${o.contact.split(" · ")[0]}`}>{o.contact} <span>↗</span></a>
      </article>)}
    </section>
    <section className="global-quote"><div className="global-quote-map"/><p data-reveal>“{quote}”</p></section>
  </SubpageShell>
}
