"use client";

import { useState } from "react";
import Link from "next/link";
import OriginalAssetImage from "./OriginalAssetImage";
import { useWhatsAppLink } from "./SiteSettingsProvider";
import { Lines, withProduct } from "@/lib/cms/text";
import type { ProductsPageContent } from "@/lib/cms/types";

export default function ProductComparisonTable3D({ comparison, teaser }: { comparison: ProductsPageContent["comparison"]; teaser: ProductsPageContent["teaser"] }) {
  const [teaserOpen, setTeaserOpen] = useState(false);
  const whatsapp = useWhatsAppLink();

  const getWhatsAppLink = (modelName: string, isComingSoon?: boolean) =>
    whatsapp(withProduct(isComingSoon ? comparison.whatsappComingSoonMessage : comparison.whatsappMessage, modelName));

  return (
    <section className="comparison-table-section" id="comparativa-3d">
      <div className="comparison-header" data-product-reveal>
        <p className="eyebrow red">{comparison.eyebrow}</p>
        <h2 className="comparison-main-title"><Lines text={comparison.title} /></h2>
        <p className="comparison-lead">{comparison.text}</p>
      </div>

      <div className="comparison-table-container" data-product-reveal>
        <div className="comparison-scroll-helper">
          <span>⇄ {comparison.scrollHint}</span>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table" role="table">
            <thead>
              <tr>
                <th scope="col" className="col-model">{comparison.columns.model}</th>
                <th scope="col" className="col-fov">{comparison.columns.fov}</th>
                <th scope="col" className="col-voxel">{comparison.columns.voxel}</th>
                <th scope="col" className="col-exposure">{comparison.columns.exposure}</th>
                <th scope="col" className="col-use">{comparison.columns.use}</th>
                <th scope="col" className="col-action">{comparison.columns.action}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((item, rowIndex) => (
                <tr key={`${item.name}-${rowIndex}`} className={item.isComingSoon ? "row-coming-soon" : ""}>
                  <td className="col-model">
                    <div className="model-cell">
                      <Link href={item.href} className="model-link">
                        <span className="model-brand-name">
                          {item.name.startsWith("Green X") ? (
                            <>
                              <span className="green-text">Green X</span>{" "}
                              <span className="model-num">{item.name.replace("Green X", "").trim()}</span>
                            </>
                          ) : (
                            <span className="model-single-name">{item.name}</span>
                          )}
                        </span>
                      </Link>
                      {item.badge && (
                        <span className="model-coming-soon-pill">{item.badge}</span>
                      )}
                    </div>
                  </td>

                  <td className="col-fov">
                    <span className="fov-pill">{item.fov}</span>
                  </td>

                  <td className="col-voxel">
                    <span className="voxel-val">{item.voxel}</span>
                  </td>

                  <td className="col-exposure">
                    <div className="exposure-stack">
                      {item.exposure.map((exp, i) => (
                        <span key={i} className="exposure-item">{exp}</span>
                      ))}
                    </div>
                  </td>

                  <td className="col-use">
                    <p className="use-text">{item.recommendedUse}</p>
                  </td>

                  <td className="col-action">
                    <div className="action-buttons-cell">
                      <a
                        href={getWhatsAppLink(item.name, item.isComingSoon)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-table-action"
                        title={`Pedir información sobre ${item.name}`}
                      >
                        {comparison.actionLabel}
                      </a>

                      {item.showTeaser && teaser.video?.local && (
                        <button
                          type="button"
                          className="btn-table-teaser"
                          onClick={() => setTeaserOpen(true)}
                          title="Ver video teaser de lanzamiento"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>{comparison.teaserLabel}</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Showcase Teaser Destacado Green X21: Imagen con letrero de 'proximamente' y video teaser adjunto */}
      <div className="x21-teaser-spotlight" data-product-reveal>
        <div className="x21-spotlight-visual">
          <div className="x21-badge-overlay">
            <span>{teaser.badge}</span>
          </div>
          {teaser.image?.local && (
            <OriginalAssetImage
              localSrc={teaser.image.local}
              sourceSrc={teaser.image.source}
              alt={teaser.image.alt || teaser.productName}
              className="x21-spotlight-img"
            />
          )}
        </div>

        <div className="x21-spotlight-content">
          <p className="eyebrow red">{teaser.eyebrow}</p>
          <h3><Lines text={teaser.title} /></h3>
          <p className="x21-teaser-desc">{teaser.text}</p>

          {teaser.video?.local && (
            <div className="x21-teaser-video-frame">
              <video
                src={teaser.video.local}
                title={teaser.modalTitle}
                className="x21-iframe"
                controls
                playsInline
                preload="metadata"
                poster={teaser.image?.local}
              />
            </div>
          )}

          <div className="x21-spotlight-footer">
            <span>{teaser.footerText}</span>
            <a
              href={getWhatsAppLink(teaser.productName, true)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red"
            >
              {teaser.buttonLabel} ↗
            </a>
          </div>
        </div>
      </div>

      {/* Modal flotante de Teaser si se hace clic desde la tabla */}
      {teaserOpen && teaser.video?.local && (
        <div
          className="teaser-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setTeaserOpen(false)}
        >
          <div className="teaser-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="teaser-modal-close"
              onClick={() => setTeaserOpen(false)}
              aria-label="Cerrar video teaser"
            >
              ✕
            </button>
            <div className="teaser-modal-header">
              <span className="model-coming-soon-pill">{teaser.badge}</span>
              <h4>{teaser.modalTitle}</h4>
            </div>
            <div className="teaser-modal-player">
              <video src={teaser.video.local} title={teaser.modalTitle} controls autoPlay playsInline />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
