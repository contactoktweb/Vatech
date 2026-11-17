import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import { getPrivacyPage } from "@/lib/cms";
import { pageMetadata } from "@/lib/cms/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata((await getPrivacyPage()).seo, "/politica-de-privacidad");
}

export default async function PoliticaDePrivacidadPage() {
  const { hero, updated, intro, sections } = await getPrivacyPage();
  return (
    <SubpageShell eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead}>
      <section className="legal-page">
        {updated && <p className="legal-updated">Última actualización: {updated}</p>}
        <div className="legal-intro">
          {intro.map((text, i) => <p key={i}>{text}</p>)}
        </div>
        {sections.map((section, i) => (
          <article className="legal-section" key={`${section.title}-${i}`}>
            <h2><span>{String(i + 1).padStart(2, "0")}</span>{section.title}</h2>
            {(section.paragraphs ?? []).map((text, j) => <p key={j}>{text}</p>)}
            {(section.items ?? []).length > 0 && <ul>{section.items.map((item, j) => <li key={j}>{item}</li>)}</ul>}
          </article>
        ))}
      </section>
    </SubpageShell>
  );
}
