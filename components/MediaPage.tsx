"use client";

import OriginalAssetImage from "./OriginalAssetImage";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const promotions = [
  ["EzRay Air", "/assets/media/promotions/Ezray-Air-R6_Promociones-Website.png", "https://vatechmexico.com/wp-content/uploads/2023/07/Ezray-Air-R6_Promociones-Website.png"],
  ["Promoción VATECH", "/assets/media/promotions/2-scaled.jpg", "https://vatechmexico.com/wp-content/uploads/2023/07/2-scaled.jpg"],
  ["¿Por qué VATECH?", "/assets/media/promotions/porque_vatech-scaled.jpg", "https://vatechmexico.com/wp-content/uploads/2023/07/porque_vatech-scaled.jpg"],
];

const news = [
  {title:"Así fue nuestra participación en la 75 EXPO DENTAL AMIC INTERNACIONAL 2022 de la Ciudad de México", date:"29 NOV 2022", image:"portada_7.jpg", desc:"Del 16 al 20 de noviembre, Vatech Global México realizó demostraciones de software, exhibición de productos, equipos y promociones exclusivas.", href:"https://vatechmexico.com/asi-fue-nuestra-participacion-en-la-75-expo-dental-amic-internacional-2022-de-la-ciudad-de-mexico/"},
  {title:"Asiste a nuestra Vatech Experience Mayo 22 y gana grandes premios", date:"07 ABR 2022", image:"PortadaNota_Mesa-de-trabajo-1.jpg", desc:"Una exhibición para interactuar con equipos, conocer demostraciones de posicionamiento, modo endo, escaneo de modelos y más.", href:"https://vatechmexico.com/asiste-a-nuestra-vatech-experience-mayo-22-exhibicion-de-equipos-dentales-y-gana-grandes-premios/"},
  {title:"Mensaje importante a toda la comunidad odontológica", date:"29 ABR 2020", image:"Noticia_Imagen11.jpg", desc:"Acciones y canales de atención para mantener el compromiso con la comunidad odontológica y la familia VATECH.", href:"https://vatechmexico.com/mensaje-importante-a-toda-la-comunidad-odontologica/"},
  {title:"Donación de un tomógrafo de última generación a Hospital del IMSS", date:"27 JUN 2019", image:"ims.png", desc:"Vatech Global México donó tecnología de tomografía para apoyar diagnósticos maxilofaciales en el Hospital General Regional No. 2.", href:"https://vatechmexico.com/donacion-de-un-tomografo-de-ultima-generacion-a-hospital-del-imss/"},
  {title:"La exposición dental más grande del mundo en Colonia, Alemania", date:"12 ABR 2019", image:"portada_expo.png", desc:"IDS reúne innovación y tendencias de la industria dental global en una de las plataformas más importantes del sector.", href:"https://vatechmexico.com/se-llevo-a-cabo-la-exposicion-dental-mas-grande-del-mundo-en-colonia-alemania/"},
  {title:"Webinar: Evolución del Diagnóstico Integral y Smart Plus", date:"09 ABR 2019", image:"Webinar_Jovita.png", desc:"Una sesión sobre la evolución de la radiología y el uso de nuevas herramientas para un diagnóstico integral.", href:"https://vatechmexico.com/webinar-evolucion-del-diagnostico-integral-en-el-complejo-maxilar-y-maxilofacial-smart-plus-innovacion-en-radiologia/"},
  {title:"XII Congreso Latinoamericano de Radiología Dento Maxilofacial", date:"07 JUN 2018", image:"mexico.png", desc:"Encuentro latinoamericano de radiología oral y maxilofacial celebrado en Ciudad de México.", href:"https://vatechmexico.com/xii-congreso-latinoamericano-de-radiologia-dento-maxilofacial/"},
  {title:"Toma de protesta ADM 2018", date:"18 NOV 2017", image:"laura.jpg", desc:"Reconocimiento a la Dra. Laura Díaz Guzmán por su nombramiento como presidenta electa de la Asociación Dental Mexicana.", href:"https://vatechmexico.com/toma-de-protesta-adm-2018/"},
  {title:"Sesión Conferencias Vatech", date:"17 NOV 2017", image:"event.jpg", desc:"Sesión de conferencias VATECH 2017 realizada en Ciudad de México con participación de profesionales odontológicos.", href:"https://vatechmexico.com/sesion-conferencias-vatech/"},
  {title:"1er Seminario Internacional de Tomografía 3D Cone Beam", date:"10 NOV 2017", image:"primer.jpg", desc:"Seminario realizado en Poza Rica, Veracruz, con especialistas en radiología oral y maxilofacial.", href:"https://vatechmexico.com/1er-seminario-internacional-de-tomografia-3d-cone-beam/"},
];

const gallery = ["02.Rayence.jpg","05.VatechCNT.jpg","08.VatechCNTP1.jpg","10.VatechCNT.jpg","17.EwoosoftSW.jpg","18.EwoosoftSW.jpg","19.EwoosoftSW.jpg","laboratorio1.png","dientes1.png","06.jpg","09.jpg","07.jpg","10.jpg","11.jpg","08.jpg"];

const videos = [
  ["CONOCE TODO LO QUE LOGRAMOS ESTE 2021 COMO #FAMILIAVATECH","Miniatura-Youtube-Video-ANUAL.jpg","https://youtu.be/z2d1XwY7i6g"],
  ["Vatech Experience 2021","Vatech-Experience-21_BRENDA.png","https://vatechmexico.com/media/videos/Vatech-Experience-21_BRENDA.mp4"],
  ["WEBINAR","Webinars_Miniatura-Video.png","https://youtu.be/z2d1XwY7i6g"],
  ["Video anual 2020","Miniatura-YT-Video-Anual-1.jpg","https://youtu.be/UcF__ceSefc"],
  ["DISTRIBUIDORES DEL AÑO 2019","distri-2019.jpg","https://www.youtube.com/watch?v=o5JoTshyCXk"],
  ["VIDEO ANUAL 2019","vatech.png","https://www.youtube.com/watch?v=XS-PV9lfdmM"],
  ["¿POR QUÉ VATECH?","2.png","https://youtu.be/QrM2lv-98Y0"],
  ["SESIÓN DE CONFERENCIAS 3D 2018","1.png","https://www.youtube.com/watch?v=f49uuol8HIM"],
  ["SESIÓN DE CONFERENCIAS 3D 2017","3.png","https://www.youtube.com/watch?v=klq3IlGyLP4"],
];

const sourceBase = "https://vatechmexico.com/wp-content/uploads/2023/07/";

export default function MediaPage(){
  return <>
    <SiteHeader/>
    <main className="media-page">
      <section className="media-hero">
        <div className="media-hero-noise"/>
        <div><p className="eyebrow red">MEDIA / VATECH MÉXICO</p><h1>Historias que<br/><span>mueven la innovación.</span></h1><p>Promociones, noticias, fotografías y videos que conectan a VATECH con la comunidad odontológica.</p><div className="media-hero-links"><a href="#promociones">Promociones ↓</a><a href="#noticias">Noticias ↓</a><a href="#fotos">Fotos y videos ↓</a></div></div>
        <div className="media-hero-art"><span className="media-word">MEDIA</span><i className="media-cross c1"/><i className="media-cross c2"/><i className="media-cross c3"/><div className="media-orbit"/></div>
      </section>

      <section className="promotions-section" id="promociones">
        <div className="media-section-head"><div><p className="eyebrow red">PROMOCIONES</p><h2>Beneficios para<br/>llevar tu práctica más lejos.</h2></div><p>Nos gustaría mostrarte nuestras promociones de VATECH.</p></div>
        <div className="promotion-grid">{promotions.map((p,i)=><article className="promotion-card" key={p[0]}><div className="promotion-image"><OriginalAssetImage localSrc={p[1]} sourceSrc={p[2]} alt={p[0]} loading="lazy"/></div><div><span>0{i+1}</span><h3>{p[0]}</h3></div></article>)}</div>
      </section>

      <section className="news-section" id="noticias">
        <div className="news-title"><p className="eyebrow light">NOTICIAS</p><h2>Actualidad VATECH.</h2><p>Información sobre exposiciones, educación, tecnología y actividades de nuestra comunidad.</p></div>
        <div className="news-grid">{news.map((n,i)=><a className={`news-card ${i===0?"featured":""}`} href={n.href} target="_blank" rel="noreferrer" key={n.title}>
          <div className="news-image"><OriginalAssetImage localSrc={`/assets/media/news/${n.image}`} sourceSrc={`${sourceBase}${n.image}`} alt={n.title} loading="lazy"/><span>{n.date}</span></div>
          <div className="news-copy"><small>{String(i+1).padStart(2,"0")} / VATECH NEWS</small><h3>{n.title}</h3><p>{n.desc}</p><em>Sigue leyendo <b>↗</b></em></div>
        </a>)}</div>
      </section>

      <section className="gallery-section" id="fotos">
        <div className="gallery-head"><div><p className="eyebrow red">FOTOS</p><h2>Dentro de<br/>VATECH.</h2></div><p>Una mirada a nuestra tecnología, laboratorios, equipos y cultura de innovación.</p></div>
        <div className="gallery-mosaic">{gallery.map((img,i)=><figure key={img} className={`gallery-item g${(i%6)+1}`}><OriginalAssetImage localSrc={`/assets/media/gallery/${img}`} sourceSrc={`${sourceBase}${img}`} alt={`Galería VATECH ${i+1}`} loading="lazy"/><figcaption><span>{String(i+1).padStart(2,"0")}</span>VATECH</figcaption></figure>)}</div>
      </section>

      <section className="videos-section">
        <div className="videos-head"><p className="eyebrow light">VIDEOS</p><h2>Conocimiento,<br/>eventos y comunidad.</h2></div>
        <div className="video-list">{videos.map((v,i)=><a href={v[2]} target="_blank" rel="noreferrer" className="video-row" key={v[0]}>
          <span className="video-number">{String(i+1).padStart(2,"0")}</span><div className="video-thumb"><OriginalAssetImage localSrc={`/assets/media/videos/${v[1]}`} sourceSrc={`${sourceBase}${v[1]}`} alt={v[0]} loading="lazy"/><b>▶</b></div><h3>{v[0]}</h3><em>↗</em>
        </a>)}</div>
      </section>

      <section className="media-final"><div className="media-final-line"/><p className="eyebrow light">SIGUE CONECTADO</p><h2>Innovación que también<br/>se comparte.</h2><div><a href="https://www.instagram.com/vatech.mexico/">Instagram ↗</a><a href="https://www.youtube.com/channel/UCUoUvlHzian9vm7rkKLRFQw?view_as=subscriber">YouTube ↗</a><a href="https://www.facebook.com/vatechmx">Facebook ↗</a></div></section>
    </main>
    <SiteFooter/>
  </>;
}
