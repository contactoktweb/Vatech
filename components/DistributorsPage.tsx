"use client";

import SubpageShell from "./SubpageShell";
import DistributorForm from "./DistributorForm";

const colombia = [
  ["Bogotá D.C.", ["DEPÓSITO DENTAL ALFOR · Certificado", "SISTEMAS ODONTOMEDICOS LTDA · Certificado", "ELEGIR SOLUCIONES · Distribuidor Autorizado"]],
  ["Medellín / Antioquia", ["DEPÓSITO DENTAL ALFOR · Certificado", "SISTEMAS ODONTOMEDICOS LTDA · Certificado", "DENTAL SOLUTIONS ANTIOQUIA"]],
  ["Cali / Valle del Cauca", ["SISTEMAS ODONTOMEDICOS LTDA · Certificado", "VOXEL DENTAL · Distribuidor Autorizado", "DEPÓSITO DENTAL ALFOR"]],
  ["Barranquilla / Atlántico", ["EQUIPOS DENTALES DEL CARIBE · Certificado", "DEPÓSITO DENTAL ALFOR · Certificado"]],
  ["Bucaramanga / Santander", ["BIOMÉDICA DENTAL SANTANDER · Certificado", "SISTEMAS ODONTOMEDICOS LTDA"]],
  ["Eje Cafetero", ["DENTAL ALFOR · Certificado", "SISTEMAS ODONTOMEDICOS LTDA"]],
  ["Cartagena / Bolívar", ["CARIBE DENTAL · Distribuidor Autorizado", "EQUIPOS DENTALES DEL CARIBE"]],
] as const;

export default function DistributorsPage() {
  return (
    <SubpageShell
      eyebrow="RED DE DISTRIBUIDORES"
      title={<>Distribuidores oficiales<br /><span>en Colombia.</span></>}
      lead="Nuestra red de distribuidores autorizados en Colombia te brinda acceso directo a todo el portafolio de sistemas radiológicos 2D/3D VATECH, con cobertura y acompañamiento en las principales regiones del país."
      heroAside={<div className="network-orbit"><span>CO</span><i className="node n1" /><i className="node n2" /><i className="node n3" /><i className="node n4" /></div>}
    >
      <section className="distributor-directory">
        <div className="directory-head">
          <div>
            <p className="eyebrow red">RED NACIONAL</p>
            <h2>Distribuidores Autorizados en Colombia</h2>
          </div>
          <span>{colombia.length} regiones con cobertura</span>
        </div>
        <div className="directory-grid">
          {colombia.map(([place, names], i) => (
            <article className="directory-card" key={place} data-reveal>
              <div className="directory-place">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{place}</h3>
              </div>
              <div className="directory-names">
                {names.map((name) => (
                  <div key={name}>
                    <i className={name.toLowerCase().includes("certificado") ? "certified" : ""} />
                    <p>{name}</p>
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
            <p className="eyebrow red">ALIANZA ESTRATÉGICA · COLOMBIA</p>
            <h2>¿Quieres ser distribuidor de VATECH?</h2>
            <p className="distributor-join-lead">
              Forma parte de la red oficial de la marca líder global en imagenología dental. Ofrecemos respaldo directo de fábrica, inventario local en Colombia, capacitación técnica certificada y soporte comercial de primer nivel.
            </p>

            <div className="distributor-benefits-grid">
              <div className="benefit-item">
                <span className="benefit-num">01</span>
                <div>
                  <strong>Portafolio Global Reconocido</strong>
                  <p>Equipos tomográficos 3D CBCT (A9, Green X), panorámicos 2D PaX-i, rayos X portátiles EzRay Air y sensores EzSensor.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-num">02</span>
                <div>
                  <strong>Soporte Técnico de Fábrica</strong>
                  <p>Sede propia en Bogotá (Teleport Business Park) con stock permanente de repuestos originales e ingenieros certificados.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-num">03</span>
                <div>
                  <strong>Condiciones Comerciales Preferenciales</strong>
                  <p>Márgenes competitivos, acompañamiento preventa para proyectos clínicos y material promocional institucional.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-num">04</span>
                <div>
                  <strong>Capacitación y Certificación</strong>
                  <p>Entrenamiento continuo tanto para tus asesores comerciales como para tu personal de ingeniería y servicio técnico.</p>
                </div>
              </div>
            </div>

            <div className="distributor-direct-contact">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent("Hola, Quiero ser distribuidor de Vatech")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-contact-pill whatsapp"
              >
                <span>WhatsApp Directo:</span>
                <strong>+57 312 6344188</strong>
              </a>
              <a
                href="mailto:marketing.colombia@vatechglobal.com?subject=Solicitud:%20Quiero%20ser%20distribuidor%20de%20Vatech"
                className="direct-contact-pill email"
              >
                <span>Correo Oficial:</span>
                <strong>marketing.colombia@vatechglobal.com</strong>
              </a>
            </div>
          </div>

          <div className="distributor-join-form-wrapper" data-reveal>
            <DistributorForm />
          </div>
        </div>
      </section>

      <section className="distributor-cta">
        <div data-reveal>
          <p className="eyebrow light">¿NECESITAS ASESORÍA?</p>
          <h2>Encuentra el distribuidor VATECH más cercano a tu clínica.</h2>
          <p>Contáctanos directamente y te comunicaremos de inmediato con el representante autorizado de tu ciudad en Colombia.</p>
        </div>
        <a
          className="btn btn-white"
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188"}?text=${encodeURIComponent("Hola VATECH Colombia, me gustaría contactar a un distribuidor autorizado en mi ciudad.")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contactar por WhatsApp →
        </a>
      </section>
    </SubpageShell>
  );
}
