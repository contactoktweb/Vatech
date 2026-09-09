"use client";

import { useState } from "react";
import SubpageShell from "./SubpageShell";
import OriginalAssetImage from "./OriginalAssetImage";

const mexico = [
  ["Baja California", ["FERGOR · Certificado"]],
  ["Ciudad de México", ["ALEXANDRE DEDIOULIA","BIOMÉDICA GAOZ · Comisionista","BOSON CORPORATIVO · Certificado","DENTADEC","DENTAL SCAN · Comisionista","ERIK CORTÉS · Certificado","JAVIER PIÑERA · Comisionista","MEDELIAN · Comisionista","NSR","ODONTOX · Comisionista","RADDENT · Comisionista","DENTEQUIP MX · Comisionista","REISIX · Certificado","VERÓNICA LOE · Comisionista","RUTHER DENTAL","RADIOLOGÍA DIGITAL MÉXICO · Comisionista","DIO MEXICO · Comisionista"]],
  ["Coahuila", ["ORTHOSIGN DENTAL SHOP · Certificado"]],
  ["Chihuahua", ["DYSEDENT","INGENIERÍA ODONTOLÓGICA"]],
  ["Colima", ["DUMA Depósito Dental · Comisionista"]],
  ["Durango", ["Global Dental México · Comisionista"]],
  ["Jalisco", ["ALFA","CONSULTORÍA E IMAGENOLOGÍA 3D (CEI) · Certificado","DENTIMAGEN 3D · Certificado","TIRDEL · Certificado","RX SOLUCIONES · Comisionista"]],
  ["Michoacán", ["IREXSA: INGENIERÍA EN RADIODIAGNÓSTICO Y ELECTROMEDICINA · Certificado"]],
  ["Estado de México", ["DR. DISTRIBUIDORA RAYOS X E IMAGEN","SIEAC · Certificado","GRUPO CARE · Comisionista"]],
  ["Guanajuato", ["GARDENT"]],
  ["Nuevo León", ["EDR: EQUIPO DENTAL DE RADIOLOGÍA DIGITAL AVANZADA · Certificado","COMERCIALIZADORA MÉDICA GUALDO","SOLIDENT, S.A. DE C.V. · Certificado"]],
  ["Querétaro", ["EQUIPOS DENTALES DEL BAJÍO"]],
  ["Quintana Roo", ["EQUIPOS DENTALES DEL BAJÍO"]],
  ["Sinaloa", ["HRU","DEPÓSITO DENTAL MADERO"]],
  ["Sonora", ["DENTAL MORELOS"]],
  ["Yucatán", ["BIOMIDENT · Certificado"]],
] as const;

const latam = [
  ["Argentina", ["DANIEL GONZALEZ S.A."]],
  ["Bolivia", ["INMEDITEC","IMPORTADORA VOXEL (Dr. Ricardo Terán)"]],
  ["Colombia", ["SISTEMAS ODONTOMEDICOS LTDA","DEPÓSITO DENTAL ALFOR","ELEGIR SOLUCIONES"]],
  ["Costa Rica", ["GRUPO DENTSOL","ELEINMSA"]],
  ["Chile", ["SMART 4D","TECHDENT","KLASMEDICAL LTDA"]],
  ["Ecuador", ["VIDATECHNOLOGY","PROEDENT"]],
  ["El Salvador", ["DENTECO"]],
  ["Guatemala", ["DENTECO"]],
  ["Honduras", ["ZIBA DENTAL (DENTAL MED)","DENTALOSHN DEPÓSITO DENTAL","DENTECO"]],
  ["Jamaica", ["OASIS HEALTHCARE"]],
  ["Panamá", ["BIOMEDICAL SUPPORT & SYSTEMS INC","BIO MATERIALES","IMPORT DENTAL SOLUTIONS CORP."]],
  ["Paraguay", ["DNA BIOTECNOLOGÍA SRL"]],
  ["Perú", ["DIGIDENT (H&T MED)","CONSULTORÍA ODONTOLÓGICA S.A.C.","CEREZZA MEDICAL","MANIMPORT S.A.C","GAMBOA GROUP SAC"]],
  ["República Dominicana", ["SINENDI EIRL"]],
  ["Trinidad y Tobago", ["CLINITECH COMPANY LTD"]],
  ["Venezuela", ["SUMINISTROS DIM C.A.","EDWJEL","VDENTAL","PROFIMEDICA CA"]],
] as const;

export default function DistributorsPage(){
  const [region, setRegion] = useState<"mx"|"latam">("mx");
  const groups = region === "mx" ? mexico : latam;
  return <SubpageShell eyebrow="RED DE DISTRIBUIDORES" title={<>Una red que<br/><span>hace equipo contigo.</span></>} lead="Nuestros distribuidores son el pilar de nuestro crecimiento. Vatech evalúa su desempeño en ventas, servicio técnico, atención al cliente, marketing y educación." heroAside={<div className="network-orbit"><span>MX</span><i className="node n1"/><i className="node n2"/><i className="node n3"/><i className="node n4"/></div>}>
    <section className="distributor-intro content-split"><div data-reveal><p className="eyebrow red">PLAN DE INCENTIVOS</p><h2>Excelencia medida de forma continua.</h2></div><div className="prose" data-reveal><p>Cada trimestre se evalúan pilares críticos para reconocer el desempeño y compromiso con la calidad Vatech.</p><OriginalAssetImage localSrc="/assets/distributors/emblemas-1.png" sourceSrc="https://vatechmexico.com/wp-content/uploads/2023/08/emblemas-1.png" alt="Emblemas del plan de incentivos VATECH" className="distributor-emblems" loading="lazy"/><div className="distributor-tabs"><button className={region==="mx"?"active":""} onClick={()=>setRegion("mx")}>México</button><button className={region==="latam"?"active":""} onClick={()=>setRegion("latam")}>Latinoamérica</button></div></div></section>
    <section className="distributor-directory">
      <div className="directory-head"><p className="eyebrow red">{region==="mx"?"DISTRIBUIDORES MÉXICO":"DISTRIBUIDORES LATINOAMÉRICA"}</p><span>{groups.length} regiones</span></div>
      <div className="directory-grid">{groups.map(([place,names],i)=><article className="directory-card" key={place} data-reveal><div className="directory-place"><span>{String(i+1).padStart(2,"0")}</span><h3>{place}</h3></div><div className="directory-names">{names.map((name)=><div key={name}><i className={name.toLowerCase().includes("certificado")?"certified":""}/><p>{name}</p><b>↗</b></div>)}</div></article>)}</div>
    </section>
    <section className="distributor-cta"><div data-reveal><p className="eyebrow light">¿NECESITAS AYUDA?</p><h2>Encuentra el respaldo VATECH más cercano.</h2><p>Contáctanos para ubicar al distribuidor adecuado para tu región.</p></div><a className="btn btn-white" href="mailto:contacto@vatechmexico.com">Contactar VATECH →</a></section>
  </SubpageShell>
}
