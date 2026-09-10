"use client";

import { useState } from "react";
import SubpageShell from "./SubpageShell";
import OriginalAssetImage from "./OriginalAssetImage";

const colombia = [
  ["Bogotá D.C.", ["DEPÓSITO DENTAL ALFOR · Certificado", "SISTEMAS ODONTOMEDICOS LTDA · Certificado", "ELEGIR SOLUCIONES · Distribuidor Autorizado"]],
  ["Medellín / Antioquia", ["DEPÓSITO DENTAL ALFOR · Certificado", "SISTEMAS ODONTOMEDICOS LTDA · Certificado", "DENTAL SOLUTIONS ANTIOQUIA"]],
  ["Cali / Valle del Cauca", ["SISTEMAS ODONTOMEDICOS LTDA · Certificado", "VOXEL DENTAL · Distribuidor Autorizado", "DEPÓSITO DENTAL ALFOR"]],
  ["Barranquilla / Atlántico", ["EQUIPOS DENTALES DEL CARIBE · Certificado", "DEPÓSITO DENTAL ALFOR · Certificado"]],
  ["Bucaramanga / Santander", ["BIOMÉDICA DENTAL SANTANDER · Certificado", "SISTEMAS ODONTOMEDICOS LTDA"]],
  ["Eje Cafetero", ["DENTAL ALFOR · Certificado", "SISTEMAS ODONTOMEDICOS LTDA"]],
  ["Cartagena / Bolívar", ["CARIBE DENTAL · Distribuidor Autorizado", "EQUIPOS DENTALES DEL CARIBE"]],
] as const;

const latam = [
  ["Argentina", ["DANIEL GONZALEZ S.A."]],
  ["Bolivia", ["INMEDITEC","IMPORTADORA VOXEL (Dr. Ricardo Terán)"]],
  ["Chile", ["SMART 4D","TECHDENT","KLASMEDICAL LTDA"]],
  ["Costa Rica", ["GRUPO DENTSOL","ELEINMSA"]],
  ["Ecuador", ["VIDATECHNOLOGY","PROEDENT"]],
  ["El Salvador", ["DENTECO"]],
  ["Guatemala", ["DENTECO"]],
  ["Honduras", ["ZIBA DENTAL (DENTAL MED)","DENTALOSHN DEPÓSITO DENTAL","DENTECO"]],
  ["México", ["DENTADEC · Certificado","REISIX · Certificado","BOSON CORPORATIVO · Certificado","EDR · Certificado"]],
  ["Panamá", ["BIOMEDICAL SUPPORT & SYSTEMS INC","BIO MATERIALES","IMPORT DENTAL SOLUTIONS CORP."]],
  ["Paraguay", ["DNA BIOTECNOLOGÍA SRL"]],
  ["Perú", ["DIGIDENT (H&T MED)","CONSULTORÍA ODONTOLÓGICA S.A.C.","CEREZZA MEDICAL","MANIMPORT S.A.C","GAMBOA GROUP SAC"]],
  ["República Dominicana", ["SINENDI EIRL"]],
  ["Trinidad y Tobago", ["CLINITECH COMPANY LTD"]],
  ["Venezuela", ["SUMINISTROS DIM C.A.","EDWJEL","VDENTAL","PROFIMEDICA CA"]],
] as const;

export default function DistributorsPage(){
  const [region, setRegion] = useState<"co"|"latam">("co");
  const groups = region === "co" ? colombia : latam;
  return <SubpageShell eyebrow="RED DE DISTRIBUIDORES" title={<>Una red que<br/><span>hace equipo contigo.</span></>} lead="Nuestros distribuidores son el pilar de nuestro crecimiento en Colombia y la región. Vatech evalúa su desempeño en ventas, servicio técnico, atención al cliente, marketing y educación." heroAside={<div className="network-orbit"><span>CO</span><i className="node n1"/><i className="node n2"/><i className="node n3"/><i className="node n4"/></div>}>
    <section className="distributor-intro content-split"><div data-reveal><p className="eyebrow red">PLAN DE INCENTIVOS</p><h2>Excelencia medida de forma continua.</h2></div><div className="prose" data-reveal><p>Cada trimestre se evalúan pilares críticos para reconocer el desempeño y compromiso con la calidad Vatech.</p><OriginalAssetImage localSrc="/assets/distributors/emblemas-1.png" sourceSrc="https://vatechmexico.com/wp-content/uploads/2023/08/emblemas-1.png" alt="Emblemas del plan de incentivos VATECH" className="distributor-emblems" loading="lazy"/><div className="distributor-tabs"><button className={region==="co"?"active":""} onClick={()=>setRegion("co")}>Colombia</button><button className={region==="latam"?"active":""} onClick={()=>setRegion("latam")}>Latinoamérica</button></div></div></section>
    <section className="distributor-directory">
      <div className="directory-head"><p className="eyebrow red">{region==="co"?"DISTRIBUIDORES COLOMBIA":"DISTRIBUIDORES LATINOAMÉRICA"}</p><span>{groups.length} regiones</span></div>
      <div className="directory-grid">{groups.map(([place,names],i)=><article className="directory-card" key={place} data-reveal><div className="directory-place"><span>{String(i+1).padStart(2,"0")}</span><h3>{place}</h3></div><div className="directory-names">{names.map((name)=><div key={name}><i className={name.toLowerCase().includes("certificado")?"certified":""}/><p>{name}</p><b>↗</b></div>)}</div></article>)}</div>
    </section>
    <section className="distributor-cta"><div data-reveal><p className="eyebrow light">¿NECESITAS AYUDA?</p><h2>Encuentra el respaldo VATECH más cercano.</h2><p>Contáctanos para ubicar al distribuidor adecuado para tu región en Colombia.</p></div><a className="btn btn-white" href="mailto:contacto@vatechcolombia.com">Contactar VATECH →</a></section>
  </SubpageShell>
}
