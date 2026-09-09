import SubpageShell from "../../components/SubpageShell";
import OriginalAssetImage from "../../components/OriginalAssetImage";

const services = [
  ["01","Removimiento e instalación","Visita de un profesional del centro de servicio para instalación, desinstalación, reinstalación o traslado del equipo.","/assets/service/servicio2.png","https://vatechmexico.com/wp-content/uploads/2026/06/servicio2.png"],
  ["02","Mantenimiento","Servicio de mantenimiento realizado por un profesional del centro de servicio para proteger el funcionamiento continuo del equipo Vatech.","/assets/service/servicio3.png","https://vatechmexico.com/wp-content/uploads/2026/06/servicio3.png"],
  ["03","Garantía","Durante el periodo de garantía, los cambios por defecto aplicables están cubiertos bajo condiciones normales de uso y conforme a la fecha de instalación verificada.","/assets/service/servicio.png","https://vatechmexico.com/wp-content/uploads/2026/06/servicio.png"],
];

export default function ServicioPage(){
  return <SubpageShell eyebrow="SERVICIO TÉCNICO" title={<>Soporte de<br/><span>primer mundo.</span></>} lead="Soporte integral de mantenimiento para maximizar la vida útil de los dispositivos Vatech y asegurar su funcionamiento continuo." heroAside={<div className="service-pulse"><span className="pulse-core">24</span><i/><i/><i/><small>TECHNICAL SUPPORT</small></div>}>
    <section className="service-intro content-split"><div data-reveal><p className="eyebrow red">RESPALDO ESPECIALIZADO</p><h2>La tecnología no termina con la instalación.</h2></div><div className="prose" data-reveal><p>El servicio técnico acompaña al equipo durante su ciclo de uso, con atención profesional para instalación, mantenimiento y garantía.</p><a className="text-link" href="https://vatechmxsoporte.com/">Solicitar servicio →</a></div></section>
    <section className="service-showcase">{services.map((s,i)=><article className={`service-showcase-item ${i%2?"reverse":""}`} key={s[0]}><div className="service-photo" data-reveal><OriginalAssetImage localSrc={s[3]} sourceSrc={s[4]} alt={s[1]} loading="lazy"/><span>{s[0]}</span></div><div className="service-detail" data-reveal><p className="eyebrow red">SERVICIO {s[0]}</p><h2>{s[1]}</h2><p>{s[2]}</p><a href="https://vatechmxsoporte.com/">Pregunta por este servicio <span>↗</span></a></div></article>)}</section>
    <section className="store-section"><div data-reveal><p className="eyebrow light">VM STORE</p><h2>Accesorios y refacciones<br/>desde donde estés.</h2><p>La tienda online de Vatech permite comprar accesorios y refacciones con una experiencia directa y segura.</p><a className="btn btn-white" href="https://vatechmxstore.com/">Comprar en VM Store →</a></div><div className="store-benefits">{[
      ["01","Pagos 100% seguros","Openpay","/assets/service/openpay-scaled.webp","https://vatechmexico.com/wp-content/uploads/2026/06/openpay-scaled.webp"],
      ["02","Envíos garantizados","DHL","/assets/service/dhl.png","https://vatechmexico.com/wp-content/uploads/2026/06/dhl.png"],
      ["03","Satisfacción","Compra protegida","/assets/service/satisfaccion.webp","https://vatechmexico.com/wp-content/uploads/elementor/thumbs/satisfaccion-rphyeq050pyp1184acmq2bzvajrltbqln06vzcbo68.webp"]
    ].map(x=><article key={x[0]} data-reveal><div className="store-benefit-image"><OriginalAssetImage localSrc={x[3]} sourceSrc={x[4]} alt={x[1]} loading="lazy"/></div><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>
  </SubpageShell>
}
