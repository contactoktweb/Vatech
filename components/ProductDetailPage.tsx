"use client";

import Link from "next/link";
import { useEffect } from "react";
import OriginalAssetImage from "./OriginalAssetImage";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { productCatalog, type ProductAsset, type ProductDetail } from "../lib/productCatalog";

function SourceImage({ asset, className = "", loading = "lazy" }: { asset: ProductAsset; className?: string; loading?: "lazy" | "eager" }) {
  return <OriginalAssetImage localSrc={asset.local} sourceSrc={asset.source} alt={asset.alt || ""} className={className} loading={loading} />;
}

function FeatureMedia({ images, title }: { images: ProductAsset[]; title: string }) {
  if (!images.length) return <div className="pd-feature-graphic" aria-hidden="true"><span>VATECH</span><i /><b>+</b></div>;
  return <div className={`pd-feature-media ${images.length > 1 ? "multi" : ""}`}>
    {images.slice(0, 3).map((asset, index) => <SourceImage key={`${asset.local}-${index}`} asset={asset} />)}
  </div>;
}

function mediaIdentity(video: ProductAsset | string) {
  return typeof video === "string" ? video.split("?")[0] : video.source || video.local;
}

function ProductVideo({ video, productName, index }: { video: ProductAsset | string; productName: string; index: number }) {
  if (typeof video === "string") {
    return <iframe
      className={index === 0 ? "pd-video-primary" : ""}
      src={video}
      title={`${productName} video ${index + 1}`}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />;
  }

  return <video className={index === 0 ? "pd-video-primary" : ""} controls playsInline preload="metadata">
    <source src={video.local} />
    <source src={video.source} />
    Tu navegador no puede reproducir este video.
  </video>;
}

export default function ProductDetailPage({ product }: { product: ProductDetail }) {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-pd-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: .12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const related = productCatalog.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  const hasSpecs = product.specifications.some((table) => table.length > 0);
  const hasGallery = product.dimensionImages.length > 0 || product.gallery.some((group) => group.images.length > 0) || product.configurationImages.length > 0;
  const intro = product.intro.length ? product.intro : product.features[0]?.text?.slice(0, 1) || [product.summary];
  const productVideos = [product.heroVideo, ...product.trainingVideos].filter(Boolean) as Array<ProductAsset | string>;
  const uniqueVideos = productVideos.filter((video, index, all) => all.findIndex((candidate) => mediaIdentity(candidate) === mediaIdentity(video)) === index);

  return <>
    <SiteHeader />
    <main className="pd-page">
      <div className="pd-breadcrumb">
        <Link href="/">Inicio</Link><span>›</span><Link href="/productos">Productos</Link><span>›</span><b>{product.name}</b>
      </div>

      <section className="pd-hero">
        <div className="pd-hero-grid" />
        <div className="pd-hero-copy">
          <p className="pd-kicker">{product.eyebrow || product.category}</p>
          <h1>{product.name}</h1>
          {product.tagline && <h2>{product.tagline}</h2>}
          <p className="pd-summary">{product.summary}</p>
          <div className="pd-actions">
            <a href="#caracteristicas" className="pd-primary">Ver características <span>↓</span></a>
            <a href="mailto:contacto@vatechmexico.com?subject=Información%20sobre%20VATECH" className="pd-secondary">Solicitar información <span>→</span></a>
          </div>
        </div>
        <div className="pd-hero-stage">
          <div className="pd-orbit pd-orbit-1" /><div className="pd-orbit pd-orbit-2" /><div className="pd-orbit pd-orbit-3" />
          {product.heroVideo && <video className="pd-hero-video" autoPlay muted loop playsInline preload="metadata">
            <source src={product.heroVideo.local} />
            <source src={product.heroVideo.source} />
          </video>}
          <SourceImage asset={product.heroImage} className="pd-hero-product" loading="eager" />
          <span className="pd-stage-label label-a">PRECISION IMAGING</span>
          <span className="pd-stage-label label-b">{product.category.toUpperCase()}</span>
        </div>
      </section>

      <nav className="pd-subnav" aria-label="Navegación del producto">
        <strong>{product.name}</strong>
        <div>
          <a href="#caracteristicas">Características</a>
          {hasSpecs && <a href="#especificaciones">Especificaciones</a>}
          {uniqueVideos.length > 0 && <a href="#video">Video</a>}
          {hasGallery && <a href="#galeria">Imágenes</a>}
          {product.catalogPdf && <a href="#catalogo">Catálogo</a>}
        </div>
      </nav>

      <section className="pd-intro" id="caracteristicas" data-pd-reveal>
        <div>
          <p className="pd-section-label">{product.category}</p>
          <h2>Diseñado para ver<br/>más y decidir mejor.</h2>
        </div>
        <div className="pd-intro-copy">
          {intro.map((text, index) => <p key={index}>{text}</p>)}
          {!!product.highlights.length && <div className="pd-highlight-list">{product.highlights.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>}
        </div>
      </section>

      {product.features.length > 0 ? <section className="pd-features">
        {product.features.map((feature, index) => <article className={`pd-feature ${index % 2 ? "reverse" : ""}`} data-pd-reveal key={`${feature.title}-${index}`}>
          <div className="pd-feature-copy">
            <span className="pd-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{feature.title}</h3>
            {feature.text.map((text, i) => <p key={i}>{text}</p>)}
          </div>
          <FeatureMedia images={feature.images} title={feature.title} />
        </article>)}
      </section> : <section className="pd-source-pending" data-pd-reveal>
        <div><p className="pd-section-label">PRODUCTO VATECH</p><h2>Ficha integrada al nuevo sitio.</h2></div>
        <p>Esta ruta ya es completamente interna. El contenido detallado se completará con el HTML específico del producto cuando esté disponible, sin redirecciones al sitio anterior.</p>
      </section>}

      {product.configurationImages.length > 0 && <section className="pd-configuration" data-pd-reveal>
        <div className="pd-section-head"><p className="pd-section-label">CONFIGURACIÓN</p><h2>Opciones y configuración.</h2></div>
        <div className="pd-config-grid">{product.configurationImages.map((asset, index) => <div key={`${asset.local}-${index}`}><SourceImage asset={asset} /></div>)}</div>
      </section>}

      {hasSpecs && <section className="pd-specs" id="especificaciones">
        <div className="pd-specs-head" data-pd-reveal><p className="pd-section-label">DATOS TÉCNICOS</p><h2>Especificaciones.</h2><p>Información técnica conservada del contenido original del producto.</p></div>
        <div className="pd-spec-tables" data-pd-reveal>
          {product.specifications.map((table, tableIndex) => <div className="pd-spec-table-wrap" key={tableIndex}><table className="pd-spec-table"><tbody>
            {table.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className={cellIndex === 0 ? "key" : ""}>{cell}</td>)}</tr>)}
          </tbody></table></div>)}
        </div>
      </section>}

      {hasGallery && <section className="pd-gallery" id="galeria">
        <div className="pd-gallery-head" data-pd-reveal><div><p className="pd-section-label">DETALLE VISUAL</p><h2>Explora cada detalle.</h2></div><p>Recursos gráficos originales del producto, integrados localmente dentro del proyecto.</p></div>
        {product.dimensionImages.length > 0 && <div className="pd-dimensions" data-pd-reveal>{product.dimensionImages.map((asset, index) => <figure key={`${asset.local}-${index}`}><SourceImage asset={asset} /><figcaption>Dimensiones · {String(index + 1).padStart(2, "0")}</figcaption></figure>)}</div>}
        {product.gallery.length > 0 && <div className="pd-gallery-groups">{product.gallery.map((group, groupIndex) => group.images.length > 0 && <article key={groupIndex} data-pd-reveal>
          {group.title && <h3>{group.title}</h3>}
          {group.text.map((text, index) => <p key={index}>{text}</p>)}
          <div className="pd-gallery-grid">{group.images.map((asset, index) => <SourceImage asset={asset} key={`${asset.local}-${index}`} />)}</div>
        </article>)}</div>}
      </section>}

      {uniqueVideos.length > 0 && <section className="pd-training" id="video" data-pd-reveal>
        <div className="pd-training-copy">
          <p className="pd-section-label">VIDEO DEL PRODUCTO</p>
          <h2>{uniqueVideos.length > 1 ? "Videos, demostraciones y capacitación." : "Conoce el producto en acción."}</h2>
          <p>Contenido audiovisual original asociado a {product.name}, integrado directamente en esta ficha.</p>
        </div>
        <div className="pd-training-grid">
          {uniqueVideos.map((video, index) => <ProductVideo key={`${mediaIdentity(video)}-${index}`} video={video} productName={product.name} index={index} />)}
        </div>
      </section>}

      {product.catalogPdf && <section className="pd-catalog" id="catalogo" data-pd-reveal>
        <div><p className="pd-section-label">DOCUMENTACIÓN</p><h2>Consulta el catálogo<br/>completo.</h2></div>
        <a href={product.catalogPdf.local} target="_blank" rel="noreferrer">Descargar catálogo PDF <span>↗</span></a>
      </section>}

      <section className="pd-contact" data-pd-reveal>
        <div className="pd-contact-ring" />
        <p>VATECH MÉXICO</p><h2>¿Quieres conocer<br/>este equipo?</h2>
        <a href="mailto:contacto@vatechmexico.com">Hablar con un especialista <span>→</span></a>
      </section>

      {related.length > 0 && <section className="pd-related">
        <div className="pd-related-head"><p className="pd-section-label">TAMBIÉN PUEDE INTERESARTE</p><h2>Más soluciones VATECH.</h2></div>
        <div className="pd-related-grid">{related.map((item) => <Link href={`/productos/${item.slug}`} key={item.slug} className="pd-related-card">
          <div><SourceImage asset={item.cardImage} /><span>Explorar →</span></div><h3>{item.name}</h3><p>{item.summary}</p>
        </Link>)}</div>
      </section>}
    </main>
    <SiteFooter />
  </>;
}
