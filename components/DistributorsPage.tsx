"use client";

import SubpageShell from "./SubpageShell";
import DistributorForm from "./DistributorForm";
import { useSiteSettings, useWhatsAppLink } from "./SiteSettingsProvider";
import { Lines } from "@/lib/cms/text";
import type { DistributorsPageContent } from "@/lib/cms/types";

export default function DistributorsPage({ content }: { content: DistributorsPageContent }) {
  const { hero, directory, join, form, cta } = content;
  const { contact } = useSiteSettings();
  const whatsapp = useWhatsAppLink();

  return (
    <SubpageShell
      eyebrow={hero.eyebrow}
      title={<>{hero.title}<br /><span>{hero.highlight}</span></>}
      lead={hero.lead}
      heroAside={<div className="network-orbit"><span>{hero.badge}</span><i className="node n1" /><i className="node n2" /><i className="node n3" /><i className="node n4" /></div>}
    >
      <section className="distributor-directory">
        <div className="directory-head">
          <div>
            <p className="eyebrow red">{directory.eyebrow}</p>
            <h2><Lines text={directory.title} /></h2>
          </div>
          <span>{directory.regions.length} {directory.coverageLabel}</span>
        </div>
        <div className="directory-grid">
          {directory.regions.map((region, i) => (
            <article className="directory-card" key={`${region.place}-${i}`} data-reveal>
              <div className="directory-place">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{region.place}</h3>
              </div>
              <div className="directory-names">
                {(region.distributors ?? []).map((distributor, j) => (
                  <div key={`${distributor.name}-${j}`}>
                    <i className={distributor.status === "Certificado" ? "certified" : ""} />
                    <p>{distributor.status ? `${distributor.name} · ${distributor.status}` : distributor.name}</p>
                    <b>↗</b>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ser-distribuidor" className="distributor-join-section">
        <div className="distributor-join-container">
          <div className="distributor-join-info" data-reveal>
            <p className="eyebrow red">{join.eyebrow}</p>
            <h2><Lines text={join.title} /></h2>
            <p className="distributor-join-lead">{join.text}</p>

            <div className="distributor-benefits-grid">
              {join.benefits.map((benefit, i) => (
                <div className="benefit-item" key={`${benefit.title}-${i}`}>
                  <span className="benefit-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{benefit.title}</strong>
                    <p>{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="distributor-direct-contact">
              <a href={whatsapp(join.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="direct-contact-pill whatsapp">
                <span>{join.whatsappLabel}</span>
                <strong>{contact.phoneDisplay}</strong>
              </a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent(join.emailSubject)}`} className="direct-contact-pill email">
                <span>{join.emailLabel}</span>
                <strong>{contact.email}</strong>
              </a>
            </div>
          </div>

          <div className="distributor-join-form-wrapper" data-reveal>
            <DistributorForm content={form} />
          </div>
        </div>
      </section>

      <section className="distributor-cta">
        <div data-reveal>
          <p className="eyebrow light">{cta.eyebrow}</p>
          <h2><Lines text={cta.title} /></h2>
          <p>{cta.text}</p>
        </div>
        <a className="btn btn-white" href={whatsapp(cta.whatsappMessage)} target="_blank" rel="noopener noreferrer">
          {cta.buttonLabel} →
        </a>
      </section>
    </SubpageShell>
  );
}
