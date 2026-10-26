import type { Metadata } from "next";
import SubpageShell from "../../components/SubpageShell";
import OriginalAssetImage from "../../components/OriginalAssetImage";

export const metadata: Metadata = {
  title: "Filosofía VATECH",
  description: "La filosofía de VATECH: tecnología segura y precisa centrada en las personas, para odontólogos y pacientes.",
  alternates: { canonical: "/filosofia" },
  openGraph: { title: "Filosofía VATECH | VATECH Colombia", description: "La filosofía de VATECH: tecnología segura y precisa centrada en las personas, para odontólogos y pacientes.", url: "/filosofia" },
};

const stages = [
  {
    n: "01",
    title: "Humanismo: El Llamado",
    quote: "Las personas son la base de todo.",
    body: "La filosofía de Vatech parte de una profunda preocupación por las personas. Inspirado por el pensamiento de Confucio, Changjun Ro impulsó una empresa que prioriza la salud humana, el aprendizaje constante y la responsabilidad con empleados, clientes y pacientes.",
    img: "/assets/philosophy/1.png",
    source: "https://vatechmexico.com/wp-content/uploads/2025/03/1.png",
  },
  {
    n: "02",
    title: "Humanismo: La Lucha",
    quote: "No. 1 en el mundo a través de la innovación tecnológica.",
    body: "Las crisis y la competencia reforzaron una idea: la sostenibilidad debía construirse mediante innovación real. Ese camino condujo al desarrollo de soluciones pioneras y a la decisión de competir globalmente desde la tecnología dental digital.",
    img: "/assets/philosophy/4-441x1024.png",
    source: "https://vatechmexico.com/wp-content/uploads/2025/03/4-441x1024.png",
  },
  {
    n: "03",
    title: "Humanismo: La Evolución",
    quote: "Innovación centrada en las personas.",
    body: "La evolución tecnológica de Vatech se vincula con una práctica activa de cuidado: reducir barreras, apoyar a clientes y profesionales, fortalecer la colaboración y convertir la innovación en una herramienta para mejorar la experiencia y la salud del paciente.",
    img: "/assets/philosophy/9.png",
    source: "https://vatechmexico.com/wp-content/uploads/2025/03/9.png",
  },
  {
    n: "04",
    title: "Humanismo: El Ascenso",
    quote: "Existo a través de los demás.",
    body: "La siguiente etapa explora relaciones humanas saludables, solidaridad y crecimiento personal. Programas como Compraxis, la peregrinación a Shikoku y la biblioteca interna reflejan una cultura que busca equilibrio entre comunidad, reflexión e independencia.",
    img: "/assets/philosophy/13.png",
    source: "https://vatechmexico.com/wp-content/uploads/2025/03/13.png",
  },
];

export default function FilosofiaPage() {
  return (
    <SubpageShell
      eyebrow="NUESTRA FILOSOFÍA"
      title={
        <>
          Nuestro viaje
          <br />
          <span>humanista.</span>
        </>
      }
      lead="Vatech se esfuerza por hacer del mundo un lugar mejor, colocando a las personas en el centro de su innovación y de su cultura."
      heroAside={
        <div className="quote-orbit">
          <span>仁</span>
          <small>HUMANISM · PEOPLE FIRST</small>
        </div>
      }
    >
      {/* SECCIÓN INSTITUCIONAL: MISIÓN, VISIÓN, POLÍTICA DE CALIDAD Y VALORES */}
      <section className="corporate-philosophy-section" id="filosofia-corporativa">
        <div className="corp-section-head" data-reveal>
          <p className="eyebrow red">FILOSOFÍA INSTITUCIONAL</p>
          <h2>Misión, Visión y<br />Política de Calidad.</h2>
          <p>
            Bases estratégicas y valores corporativos que guían nuestra operación, innovación y compromiso permanente con la comunidad odontológica en Colombia.
          </p>
        </div>

        <div className="corp-pillars-grid">
          {/* 01 · MISIÓN */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">01</span>
                <span className="tag">Propósito Corporativo</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>
            <h3>Misión</h3>
            <blockquote>
              “Contribuir a la salud y calidad de vida de las personas, proporcionando productos sanitarios innovadores, que posibiliten mejoras en la práctica de los profesionales de la salud en el ámbito odontológico.”
            </blockquote>
            <p className="corp-card-desc">
              Guiados por el valor humano, facilitamos herramientas diagnósticas avanzadas que elevan el estándar clínico diario con máxima precisión y la menor dosis de radiación.
            </p>
          </article>

          {/* 02 · VISIÓN */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">02</span>
                <span className="tag">Visión Estratégica</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </div>
            <h3>Visión</h3>
            <blockquote>
              “Convertirse en empresa referente en el ámbito sanitario con vocación global y reconocida por la innovación, el compromiso y los altos estándares de calidad de sus productos para el cuidado de la salud y el bienestar de las personas, dando respuesta a sus necesidades actuales y futuras.”
            </blockquote>
            <p className="corp-card-desc">
              Consolidar el liderazgo tecnológico en Colombia mediante acompañamiento directo, garantía de fábrica y capacitación continua para los especialistas del país.
            </p>
          </article>

          {/* 03 · POLÍTICA DE CALIDAD */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">03</span>
                <span className="tag">Calidad y Excelencia</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>
            <h3>Política de Calidad</h3>
            <p className="corp-statement">
              Nos especializamos en la importación y comercialización de dispositivos médicos y sistemas radiológicos de vanguardia, cumpliendo rigurosamente los estándares sanitarios y satisfaciendo plenamente las expectativas de nuestros clientes mediante procesos sistemáticos de mejora continua.
            </p>
            <div className="corp-checklist">
              <div className="corp-check-item">
                <span className="corp-check-dot" />
                <span>Certificación biomédica y calibración de fábrica</span>
              </div>
              <div className="corp-check-item">
                <span className="corp-check-dot" />
                <span>Cumplimiento riguroso de protección radiológica</span>
              </div>
              <div className="corp-check-item">
                <span className="corp-check-dot" />
                <span>Respaldo oficial directo y garantía de fábrica</span>
              </div>
            </div>
          </article>

          {/* 04 · VALORES CORPORATIVOS */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-header">
              <div className="corp-card-index">
                <span className="number">04</span>
                <span className="tag">Principios y Cultura</span>
              </div>
              <div className="corp-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
            </div>
            <h3>Valores</h3>
            <div className="corp-values-grid">
              <div className="corp-value-item">
                <strong>Innovación con Sentido Humano</strong>
                <p>Tecnología pionera orientada al cuidado de la salud y mínima radiación (Green Low Dose).</p>
              </div>
              <div className="corp-value-item">
                <strong>Compromiso Sanitario</strong>
                <p>Prioridad incondicional en la seguridad, precisión diagnóstica y confort del paciente.</p>
              </div>
              <div className="corp-value-item">
                <strong>Altos Estándares de Calidad</strong>
                <p>Dispositivos biomédicos certificados con respaldo oficial directo en Colombia.</p>
              </div>
              <div className="corp-value-item">
                <strong>Integridad y Mejora Continua</strong>
                <p>Relaciones transparentes, servicio confiable y evolución tecnológica constante.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="philosophy-intro content-split">
        <div data-reveal>
          <p className="eyebrow red">UNA IDEA QUE GUÍA EL VIAJE</p>
          <h2>Esto es, por el bien del pueblo.</h2>
        </div>
        <div className="prose" data-reveal>
          <p>
            La dirección de la empresa, el porqué de la innovación y la forma de relacionarse con empleados, clientes y pacientes se conectan en una misma idea: crecer sin perder de vista el valor humano.
          </p>
        </div>
      </section>

      <section className="philosophy-stages">
        {stages.map((s, i) => (
          <article className={`philosophy-stage ${i % 2 ? "reverse" : ""}`} key={s.n}>
            <div className="philosophy-image" data-reveal>
              <OriginalAssetImage localSrc={s.img} sourceSrc={s.source} alt="Historia y filosofía VATECH" loading="lazy" />
              <span>{s.n}</span>
            </div>
            <div className="philosophy-copy" data-reveal>
              <p className="eyebrow red">ETAPA {s.n}</p>
              <h2>{s.title}</h2>
              <blockquote>“{s.quote}”</blockquote>
              <p>{s.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="meditation-end">
        <div className="meditation-ring" />
        <div data-reveal>
          <p className="eyebrow red">EPÍLOGO</p>
          <h2>
            El camino encontrado
            <br />
            en el silencio.
          </h2>
          <p>
            En medio de decisiones, competencia y responsabilidades, la reflexión vuelve a una pregunta esencial: ¿qué nos motiva? Para Vatech, la respuesta termina regresando a las personas y al significado que existe detrás de la innovación.
          </p>
        </div>
      </section>
    </SubpageShell>
  );
}
