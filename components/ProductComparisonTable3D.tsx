"use client";

import { useState } from "react";
import Link from "next/link";
import OriginalAssetImage from "./OriginalAssetImage";

// Teaser oficial del Green X21 (archivo en public/Recursos)
const X21_TEASER_VIDEO = "/Recursos/" + encodeURIComponent("Confidential_Green X 21 Teaser video.mp4");

type ComparisonModel = {
  name: string;
  badge?: string;
  fov: string;
  voxel: string;
  exposure: string[];
  recommendedUse: string;
  href: string;
  isComingSoon?: boolean;
  teaserVideoId?: string;
};

const comparisonData: ComparisonModel[] = [
  {
    name: "A9",
    fov: "8x8 cm (Anatómico 9.3x8 cm)",
    voxel: "Desde 200 µm hasta 300 µm",
    exposure: ["1,9s CEPH", "18s CBCT", "11,9s PANO"],
    recommendedUse: "Diagnóstico general 3 en 1, planificación de implantes y endodoncia esencial.",
    href: "/productos/a9",
  },
  {
    name: "Green X 12",
    fov: "Desde 4x4cm hasta 12x8.5cm",
    voxel: "Desde 49.5 µm hasta 300 µm",
    exposure: ["1,9s CEPH", "10s CBCT", "4,0s PANO"],
    recommendedUse: "Implantología guiada, endodoncia de alta resolución (Endo 4x4) y diagnóstico 3D integral.",
    href: "/productos/green-x12",
  },
  {
    name: "Green X-12 SE",
    fov: "Desde 4x4cm hasta 12x8.5cm",
    voxel: "Desde 49.5 µm hasta 300 µm",
    exposure: ["1,9s CEPH", "10s CBCT", "4,0s PANO"],
    recommendedUse: "Clínicas en crecimiento que requieren diagnóstico 4 en 1 con escaneo de modelos 3D y tecnología CST.",
    href: "/productos/green-x-12-se",
  },
  {
    name: "Green X 16",
    fov: "Desde 4x4cm hasta 16x9cm",
    voxel: "Desde 49.5 µm hasta 300 µm",
    exposure: ["1,9s CEPH", "2,9s CBCT", "3,9s PANO"],
    recommendedUse: "Equipo dirigido para endodoncistas e implantólogos.",
    href: "/productos/green-x16",
  },
  {
    name: "Green X 18",
    fov: "Desde 12x9cm hasta 18x10cm",
    voxel: "Desde 49.5 µm hasta 300 µm",
    exposure: ["1,9s CEPH", "2,9s CBCT", "3,9s PANO"],
    recommendedUse: "Equipo dirigido para especialistas de ATM, periodoncistas y cirugía maxilofacial.",
    href: "/productos/green-x18",
  },
  {
    name: "Green X 21",
    badge: "PRÓXIMAMENTE",
    fov: "Desde 4x4cm hasta 21x19cm",
    voxel: "Desde 49.5 µm hasta 300 µm",
    exposure: ["0,9s CEPH", "2,9s CBCT", "7,3s PANO"],
    recommendedUse: "Diagnóstico avanzado, cirugía guiada, ortodoncia y Face Scan.",
    href: "/productos/green-x21",
    isComingSoon: true,
    teaserVideoId: "XHOmBV4js_E",
  },
];

export default function ProductComparisonTable3D() {
  const [activeTeaser, setActiveTeaser] = useState<string | null>(null);

  const getWhatsAppLink = (modelName: string, isComingSoon?: boolean) => {
    const text = isComingSoon
      ? `Hola VATECH Colombia, me gustaría recibir información sobre el próximo lanzamiento del tomógrafo ${modelName} en Colombia.`
      : `Hola VATECH Colombia, me gustaría recibir asesoría técnica y cotización del equipo tomográfico ${modelName}.`;
    return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="comparison-table-section" id="comparativa-3d">
      <div className="comparison-header" data-product-reveal>
        <p className="eyebrow red">SISTEMAS DE IMAGEN 3D · COMPARATIVA</p>
        <h2 className="comparison-main-title">¿Qué modelo se adapta mejor a tu clínica?</h2>
        <p className="comparison-lead">
          Compara los equipos tomográficos CBCT disponibles en el portafolio de VATECH Colombia y encuentra la solución óptima para tu especialidad.
        </p>
      </div>

      <div className="comparison-table-container" data-product-reveal>
        <div className="comparison-scroll-helper">
          <span>⇄ Desliza horizontalmente para comparar especificaciones</span>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table" role="table">
            <thead>
              <tr>
                <th scope="col" className="col-model">MODELO</th>
                <th scope="col" className="col-fov">TAMAÑO DEL FOV</th>
                <th scope="col" className="col-voxel">TAMAÑO DEL VOXEL</th>
                <th scope="col" className="col-exposure">TIEMPO MÍN. DE EXPOSICIÓN</th>
                <th scope="col" className="col-use">USO RECOMENDADO</th>
                <th scope="col" className="col-action">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item) => (
                <tr key={item.name} className={item.isComingSoon ? "row-coming-soon" : ""}>
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
                        Pedir información
                      </a>

                      {item.isComingSoon && item.teaserVideoId && (
                        <button
                          type="button"
                          className="btn-table-teaser"
                          onClick={() => setActiveTeaser(item.teaserVideoId || null)}
                          title="Ver video teaser de lanzamiento"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>Ver Teaser</span>
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
            <span>PRÓXIMAMENTE EN COLOMBIA</span>
          </div>
          <OriginalAssetImage
            localSrc="/assets/products/X21-scaled.png"
            sourceSrc="https://vatechmexico.com/wp-content/uploads/2026/03/X21-scaled.png"
            alt="VATECH Green X21 Próximamente"
            className="x21-spotlight-img"
          />
        </div>

        <div className="x21-spotlight-content">
          <p className="eyebrow red">AVANCE EXCLUSIVO</p>
          <h3>Green X 21 · El futuro del diagnóstico CBCT</h3>
          <p className="x21-teaser-desc">
            El nuevo Green X21 con la máxima amplitud en diagnóstico 3D (FOV expandido hasta 21x19 cm) y tecnología de escaneo facial llegará próximamente a Colombia. No te pierdas el adelanto exclusivo:
          </p>

          <div className="x21-teaser-video-frame">
            <video
              src={X21_TEASER_VIDEO}
              title="Green X21 Video Teaser Oficial VATECH"
              className="x21-iframe"
              controls
              playsInline
              preload="metadata"
              poster="/assets/products/X21-scaled.png"
            />
          </div>

          <div className="x21-spotlight-footer">
            <span>Sé el primero en recibir notificación de lanzamiento y condiciones de preventa.</span>
            <a
              href={getWhatsAppLink("Green X21", true)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red"
            >
              Avísame cuando esté disponible ↗
            </a>
          </div>
        </div>
      </div>

      {/* Modal flotante de Teaser si se hace clic desde la tabla */}
      {activeTeaser && (
        <div
          className="teaser-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveTeaser(null)}
        >
          <div className="teaser-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="teaser-modal-close"
              onClick={() => setActiveTeaser(null)}
              aria-label="Cerrar video teaser"
            >
              ✕
            </button>
            <div className="teaser-modal-header">
              <span className="model-coming-soon-pill">PRÓXIMAMENTE EN COLOMBIA</span>
              <h4>Green X21 · Video Teaser Oficial</h4>
            </div>
            <div className="teaser-modal-player">
              <video src={X21_TEASER_VIDEO} title="Green X21 Video Teaser" controls autoPlay playsInline />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
