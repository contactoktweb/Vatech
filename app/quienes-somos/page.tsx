import type { Metadata } from "next";
import SubpageShell from "../../components/SubpageShell";
import OriginalAssetImage from "../../components/OriginalAssetImage";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: "VATECH es líder mundial en imagenología digital dental, con más de 20 años de trayectoria. Conoce a VATECH Colombia y por qué elegirnos.",
  alternates: { canonical: "/quienes-somos" },
  openGraph: { title: "Quiénes somos | VATECH Colombia", description: "VATECH es líder mundial en imagenología digital dental, con más de 20 años de trayectoria. Conoce a VATECH Colombia y por qué elegirnos.", url: "/quienes-somos" },
};

const reasons = [
  "No. 1 en Innovación Digital Dental tanto en Colombia como a nivel mundial.",
  "No. 1 en ventas de equipos de diagnóstico dental 3D.",
  "No. 1 en participación de mercado mundial para sensores intraorales.",
  "No. 1 con la mayor cuota de mercado en software de diagnóstico de rayos X dentales.",
  "No. 1 en Corea y el sudeste asiático, y líderes en equipos 2D en China.",
];

export default function QuienesSomosPage() {
  return (
    <SubpageShell
      eyebrow="QUIÉNES SOMOS"
      title={<>Liderazgo global.<br/><span>Presencia local.</span></>}
      lead="Más de 20 años impulsando la imagenología digital dental con una visión centrada en diagnósticos precisos, flujos ágiles y comodidad para el paciente."
      centered
    >
      <section className="content-split intro-story">
        <div data-reveal>
          <p className="eyebrow red">INNOVACIÓN DE PRIMER MUNDO</p>
          <h2>Empresa líder en innovación digital dental.</h2>
        </div>
        <div className="prose" data-reveal>
          <p>En Vatech nos hemos consolidado como una empresa coreana líder en el sector de la imagenología digital dental. Nuestra misión ha sido trabajar para proveer a odontólogos y pacientes tecnologías seguras que cuiden su salud y mejoren su calidad de vida.</p>
          <p>En Vatech Colombia compartimos la visión global de ser pioneros en diagnósticos precisos, flujos de trabajo rápidos y equipos diseñados para la máxima comodidad del paciente.</p>
        </div>
      </section>

      <section className="dark-feature">
        <div className="dark-feature-radar" />
        <div data-reveal><p className="eyebrow red">RESPALDO GLOBAL</p><h2>Una red internacional<br/>que responde localmente.</h2></div>
        <div className="dark-stat-grid" data-reveal>
          <article><strong>7</strong><p>empresas afiliadas</p></article>
          <article><strong>29</strong><p>filiales en el extranjero</p></article>
          <article><strong>BOG</strong><p>oficina principal en Bogotá</p></article>
        </div>
      </section>

      <section className="number-one-section">
        <div className="section-sticky-title" data-reveal><p className="eyebrow red">¿POR QUÉ ELEGIR VATECH?</p><h2>El número 1<br/>en el mundo.</h2><OriginalAssetImage localSrc="/assets/company/Logo-No.-1.png" sourceSrc="https://vatechmexico.com/wp-content/uploads/2023/08/Logo-No.-1.png" alt="VATECH número 1" className="number-one-source-art" loading="lazy"/></div>
        <div className="reason-list">
          {reasons.map((reason, i) => <article key={reason} data-reveal><span>0{i+1}</span><p>{reason}</p><i>↗</i></article>)}
        </div>
      </section>
    </SubpageShell>
  );
}
