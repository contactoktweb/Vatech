import SubpageShell from "../../components/SubpageShell";
import OriginalAssetImage from "../../components/OriginalAssetImage";

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
          <h2>Misión, Visión y Política de Calidad</h2>
          <p>
            Bases estratégicas y valores que guían nuestra operación y compromiso con la comunidad odontológica en Colombia.
          </p>
        </div>

        <div className="corp-pillars-grid">
          {/* MISIÓN */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-badge">
              <span>MISIÓN CORPORATIVA</span>
            </div>
            <h3>Misión</h3>
            <div className="corp-quote-block">
              <span className="corp-subtag">Misión resumida:</span>
              <blockquote>
                “Contribuimos a la salud y calidad de vida ofreciendo equipos radiológicos innovadores que elevan la práctica odontológica.”
              </blockquote>
            </div>
            <p className="corp-card-desc">
              Facilitamos diagnósticos precisos mediante tecnología de imagenología digital confiable, segura y con los más altos estándares de protección radiológica.
            </p>
          </article>

          {/* VISIÓN */}
          <article className="corp-pillar-card" data-reveal>
            <div className="corp-card-badge">
              <span>VISIÓN ESTRATÉGICA</span>
            </div>
            <h3>Visión</h3>
            <div className="corp-quote-block">
              <span className="corp-subtag">Visión resumida:</span>
              <blockquote>
                “Ser la empresa referente en soluciones sanitarias, reconocida por innovación, compromiso y altos estándares de calidad.”
              </blockquote>
            </div>
            <p className="corp-card-desc">
              Consolidarnos como el aliado predilecto de odontólogos, clínicas y centros radiológicos en Colombia a través de un servicio técnico oficial y educación continua.
            </p>
          </article>

          {/* POLÍTICA DE CALIDAD */}
          <article className="corp-pillar-card quality-card full-span" data-reveal>
            <div className="corp-card-badge">
              <span>CALIDAD Y EXCELENCIA</span>
            </div>
            <h3>Política de calidad</h3>
            <div className="quality-dual-grid">
              <div className="quality-exec-column">
                <span className="corp-subtag red-tag">Política de calidad (versión ejecutiva):</span>
                <blockquote>
                  “Importamos y comercializamos dispositivos médicos con excelencia, garantizando bienestar para pacientes y profesionales.”
                </blockquote>
              </div>
              <div className="quality-full-column">
                <span className="corp-subtag">Política de calidad:</span>
                <p>
                  Nos especializamos en la importación y comercialización de dispositivos médicos y equipos biomédicos, cumpliendo con las expectativas de nuestros clientes y garantizando procesos de mejora continua.
                </p>
              </div>
            </div>
          </article>

          {/* VALORES CORPORATIVOS */}
          <article className="corp-pillar-card values-card full-span" data-reveal>
            <div className="corp-card-badge">
              <span>VALORES CORPORATIVOS</span>
            </div>
            <h3>Valores corporativos</h3>
            <div className="values-content-wrap">
              <div className="values-primary-block">
                <p className="corp-subtag red-tag">Pilar central:</p>
                <div className="values-primary-statement">
                  <strong>Innovación tecnológica constante.</strong>
                  <p>
                    Desarrollo e incorporación continua de soluciones de vanguardia para garantizar la mayor resolución de imagen con la menor radiación posible.
                  </p>
                </div>
              </div>
              <div className="values-items-list">
                <div className="value-chip">
                  <span className="value-chip-dot" />
                  <div>
                    <strong>Compromiso sanitario</strong>
                    <small>Prioridad en la salud y confort de pacientes y doctores.</small>
                  </div>
                </div>
                <div className="value-chip">
                  <span className="value-chip-dot" />
                  <div>
                    <strong>Altos estándares de calidad</strong>
                    <small>Dispositivos biomédicos certificados con soporte técnico oficial.</small>
                  </div>
                </div>
                <div className="value-chip">
                  <span className="value-chip-dot" />
                  <div>
                    <strong>Mejora continua</strong>
                    <small>Procesos ágiles orientados a la satisfacción total del cliente.</small>
                  </div>
                </div>
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
