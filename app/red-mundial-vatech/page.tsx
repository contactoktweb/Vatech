import SubpageShell from "../../components/SubpageShell";
import OriginalAssetImage from "../../components/OriginalAssetImage";

const offices = [
  ["Indonesia","VATECH Indonesia","SME Tower Lantai 6, Jalan Gatot Subroto Kav. 94, Jakarta Selatan, Indonesia 12780","edward.jang@vatechglobal.com","/assets/world/indonesia.png","https://vatechmexico.com/wp-content/uploads/2026/03/indonesia.png"],
  ["China","VATECH China Co., Ltd.","E-3, No. 1618 Yishan Rd, Caohejing Development Zone, Minhang Dist. Shanghai P.R China 201103","serok@vatech-china.com · +86 21 6145 0380","/assets/world/VATECH-EN-EL-MUNDO-18.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-18.png"],
  ["USA · New Jersey","VATECH America Inc.","2200 Fletcher Ave., Suite 705A, Fort Lee, NJ 07024","sales@vatechamerica.com · +1 201 210 5028","/assets/world/VATECH-EN-EL-MUNDO-17.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-17.png"],
  ["Brasil","VATECH Brasil LTDA","Rua Aureliano Guimarães, 172, CJ 1010 Vila Andrade, São Paulo – SP, 05727-160","venda@vatechbrasil.com.br · +55 11 2365-7154","/assets/world/VATECH-EN-EL-MUNDO-16.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-16.png"],
  ["Francia","VATECH France Co. Ltd.","Parc de Haute Maison 4/6 Allee Kepler, 77420 Champs sur Marne, France","info@vatech-france.fr · +33 1 64 11 43 30","/assets/world/VATECH-EN-EL-MUNDO-15.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-15.png"],
  ["India","VATECH India Pvt Ltd.","Plot No. NS-5, F-9 Street, Munirka Marg, Vasant Vihar, New Delhi 110057","contactus@vatechindia.in","/assets/world/VATECH-EN-EL-MUNDO-14.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-14.png"],
  ["Malasia","VATECH Global Asia HQ Sdn.","41-G & 41-2, Block D, Zenith Corporate Park, Kelana Jaya, Selangor, Malaysia","info@vatechasia.com · +603 7831 6901","/assets/world/VATECH-EN-EL-MUNDO-13.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-13.png"],
  ["Colombia","VATECH Colombia","Cra. 15 # 118-03, Mezzanine 4 / Calle 134D # 50-59, Bogotá, Colombia","contacto@vatechcolombia.com · +57 (313) 350-5068","/assets/world/colombia.png","/assets/world/colombia.png"],
  ["Rusia","LLC VATECH CORP.","117246, Moscow, Str. Nauchnyi Proezd 17, Office 211","info@vatechrussia.com · +7 495 967 9055","/assets/world/VATECH-EN-EL-MUNDO-11.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-11.png"],
  ["España","VATECH Spain S.L.","Volta dels Garrofers, 63 – Pol. Industrial Els Garrofers, 08340 Vilassar de Mar, Barcelona","vatech@vatech.es · +34 93 754 26 20","/assets/world/VATECH-EN-EL-MUNDO-10.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-10.png"],
  ["Taiwán","Vatech Taiwan","5F, No.62, Zhouzi St, Neihu District, Taipei City 114, Taiwan","service@vatech.com.tw · +886 2 8751 1578","/assets/world/VATECH-EN-EL-MUNDO-09.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-09.png"],
  ["Hong Kong","VATECH Hongkong","23/F, 8 Commercial Tower, 8 Sun Yip Street, Chai Wan, Hong Kong","tommy.parck@vatechglobal.com · +852 5409 8552","/assets/world/VATECH-EN-EL-MUNDO-08.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-08.png"],
  ["UAE","VATECH UAE","Office #306, Building No 47, Dubai Healthcare City, Dubai, U.A.E","james.go@vatechglobal.com · +971 (0)4 572 7509","/assets/world/VATECH-EN-EL-MUNDO-07.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-07.png"],
  ["Reino Unido","VATECH Dental Manufacturing Ltd.","Chancery House, St. Nicholas Way, Sutton, SM1 1JB UK","info@vatech.uk.com · +44 208 652 1990","/assets/world/VATECH-EN-EL-MUNDO-06.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-06.png"],
  ["Vietnam","VATECH Vietnam","Floor 4, TTC Building, 19 Duy Tan Street, Cau Giay District, Ha Noi, Vietnam","service@vatech.com.tw","/assets/world/VATECH-EN-EL-MUNDO-05.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-05.png"],
  ["Australia","Vatech Medical Pty Ltd.","Suite 5.04 Gateway Business Park 63-79 Parramatta Road, Silverwater, NSW 2128","info@vatechanz.com.au · 1300 789 454","/assets/world/VATECH-EN-EL-MUNDO-04.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-04.png"],
  ["República Checa","VATECH Europe S.R.O","Evropska 2588/33A 160 00 Prague, Czech Republic","info@vatecheurope.com","/assets/world/VATECH-EN-EL-MUNDO-03.png","https://vatechmexico.com/wp-content/uploads/2026/03/VATECH-EN-EL-MUNDO-03.png"],
];

export default function RedMundialPage(){
  return <SubpageShell eyebrow="VATECH EN EL MUNDO" title={<>Una organización<br/><span>verdaderamente global.</span></>} lead="Fundada en 1992 y con sede en Corea del Sur, Vatech ha expandido su presencia mediante filiales, oficinas y redes de distribución en América, Europa, Asia y Latinoamérica." heroAside={<div className="global-orbit"><div className="globe-core">+70</div><span className="orbit-dot d1"/><span className="orbit-dot d2"/><span className="orbit-dot d3"/></div>}>
    <section className="world-intro content-split"><div data-reveal><p className="eyebrow red">RED INTERNACIONAL</p><h2>Conoce la red de oficinas alrededor del mundo.</h2></div><div className="prose" data-reveal><p>Una infraestructura internacional conecta la innovación desarrollada por Vatech con especialistas, distribuidores y equipos de soporte en múltiples regiones.</p></div></section>
    <section className="office-grid">
      {offices.map((o,i)=><article className="office-card" data-reveal key={o[0]}><div className="office-source-image"><OriginalAssetImage localSrc={o[4]} sourceSrc={o[5]} alt={`Oficina VATECH ${o[0]}`} loading="lazy"/></div><div className="office-number">{String(i+1).padStart(2,"0")}</div><p className="eyebrow red">{o[0]}</p><h3>{o[1]}</h3><p>{o[2]}</p><a href={`mailto:${o[3].split(" · ")[0]}`}>{o[3]} <span>↗</span></a></article>)}
    </section>
    <section className="global-quote"><div className="global-quote-map"/><p data-reveal>“Uniendo tecnología y cuidado humano en cada rincón del planeta.”</p></section>
  </SubpageShell>
}
