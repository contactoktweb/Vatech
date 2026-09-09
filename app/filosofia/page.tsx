import SubpageShell from "../../components/SubpageShell";
import OriginalAssetImage from "../../components/OriginalAssetImage";

const stages = [
  {
    n:"01", title:"Humanismo: El Llamado", quote:"Las personas son la base de todo.",
    body:"La filosofía de Vatech parte de una profunda preocupación por las personas. Inspirado por el pensamiento de Confucio, Changjun Ro impulsó una empresa que prioriza la salud humana, el aprendizaje constante y la responsabilidad con empleados, clientes y pacientes.",
    img:"/assets/philosophy/1.png", source:"https://vatechmexico.com/wp-content/uploads/2025/03/1.png"
  },
  {
    n:"02", title:"Humanismo: La Lucha", quote:"No. 1 en el mundo a través de la innovación tecnológica.",
    body:"Las crisis y la competencia reforzaron una idea: la sostenibilidad debía construirse mediante innovación real. Ese camino condujo al desarrollo de soluciones pioneras y a la decisión de competir globalmente desde la tecnología dental digital.",
    img:"/assets/philosophy/4-441x1024.png", source:"https://vatechmexico.com/wp-content/uploads/2025/03/4-441x1024.png"
  },
  {
    n:"03", title:"Humanismo: La Evolución", quote:"Innovación centrada en las personas.",
    body:"La evolución tecnológica de Vatech se vincula con una práctica activa de cuidado: reducir barreras, apoyar a clientes y profesionales, fortalecer la colaboración y convertir la innovación en una herramienta para mejorar la experiencia y la salud del paciente.",
    img:"/assets/philosophy/9.png", source:"https://vatechmexico.com/wp-content/uploads/2025/03/9.png"
  },
  {
    n:"04", title:"Humanismo: El Ascenso", quote:"Existo a través de los demás.",
    body:"La siguiente etapa explora relaciones humanas saludables, solidaridad y crecimiento personal. Programas como Compraxis, la peregrinación a Shikoku y la biblioteca interna reflejan una cultura que busca equilibrio entre comunidad, reflexión e independencia.",
    img:"/assets/philosophy/13.png", source:"https://vatechmexico.com/wp-content/uploads/2025/03/13.png"
  },
];

export default function FilosofiaPage(){
  return <SubpageShell eyebrow="NUESTRA FILOSOFÍA" title={<>Nuestro viaje<br/><span>humanista.</span></>} lead="Vatech se esfuerza por hacer del mundo un lugar mejor, colocando a las personas en el centro de su innovación y de su cultura." heroAside={<div className="quote-orbit"><span>仁</span><small>HUMANISM · PEOPLE FIRST</small></div>}>
    <section className="philosophy-intro content-split">
      <div data-reveal><p className="eyebrow red">UNA IDEA QUE GUÍA EL VIAJE</p><h2>Esto es, por el bien del pueblo.</h2></div>
      <div className="prose" data-reveal><p>La dirección de la empresa, el porqué de la innovación y la forma de relacionarse con empleados, clientes y pacientes se conectan en una misma idea: crecer sin perder de vista el valor humano.</p></div>
    </section>
    <section className="philosophy-stages">
      {stages.map((s,i)=><article className={`philosophy-stage ${i%2?"reverse":""}`} key={s.n}>
        <div className="philosophy-image" data-reveal><OriginalAssetImage localSrc={s.img} sourceSrc={s.source} alt="Historia y filosofía VATECH" loading="lazy"/><span>{s.n}</span></div>
        <div className="philosophy-copy" data-reveal><p className="eyebrow red">ETAPA {s.n}</p><h2>{s.title}</h2><blockquote>“{s.quote}”</blockquote><p>{s.body}</p></div>
      </article>)}
    </section>
    <section className="meditation-end">
      <div className="meditation-ring"/><div data-reveal><p className="eyebrow red">EPÍLOGO</p><h2>El camino encontrado<br/>en el silencio.</h2><p>En medio de decisiones, competencia y responsabilidades, la reflexión vuelve a una pregunta esencial: ¿qué nos motiva? Para Vatech, la respuesta termina regresando a las personas y al significado que existe detrás de la innovación.</p></div>
    </section>
  </SubpageShell>
}
