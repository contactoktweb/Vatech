"use client";

import Link from "next/link";
import { useEffect } from "react";
import OriginalAssetImage from "./OriginalAssetImage";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useSiteSettings, useWhatsAppLink } from "./SiteSettingsProvider";
import { Lines, withProduct } from "@/lib/cms/text";
import type { CmsFile, ProductAsset, ProductDetail, ProductPageLabels } from "@/lib/cms/types";

function SourceImage({ asset, className = "", loading = "lazy" }: { asset?: ProductAsset; className?: string; loading?: "lazy" | "eager" }) {
  if (!asset?.local) return null;
  return <OriginalAssetImage localSrc={asset.local} sourceSrc={asset.source} alt={asset.alt || ""} className={className} loading={loading} />;
}

function FeatureMedia({ images, title }: { images: ProductAsset[]; title: string }) {
  if (!images.length) return <div className="pd-feature-graphic" aria-hidden="true"><span>VATECH</span><i /><b>+</b></div>;
  return <div className={`pd-feature-media ${images.length > 1 ? "multi" : ""}`}>
    {images.slice(0, 3).map((asset, index) => <FeatureImage key={`${asset.local}-${index}`} asset={asset} />)}
  </div>;
}

// Imagen de característica: no se amplía más de 1,2 veces su tamaño real, para que no se vea borrosa
function FeatureImage({ asset }: { asset: ProductAsset }) {
  if (!asset?.local) return null;
  return <OriginalAssetImage
    localSrc={asset.local}
    sourceSrc={asset.source}
    alt={asset.alt || ""}
    loading="lazy"
    onLoad={(e) => {
      const img = e.currentTarget;
      // Los archivos @2x ya vienen ampliados: su tamaño real es la mitad
      const scale = /@2x\./.test(asset.local) ? 0.65 : 1.2;
      img.style.maxWidth = `${Math.round(img.naturalWidth * scale)}px`;
      img.style.maxHeight = `${Math.round(img.naturalHeight * scale)}px`;
    }}
  />;
}

function mediaIdentity(video: CmsFile | string) {
  return typeof video === "string" ? video.split("?")[0] : video.source || video.local;
}

function ProductVideo({ video, productName, index }: { video: CmsFile | string; productName: string; index: number }) {
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

export default function ProductDetailPage({ product, related, labels: L }: { product: ProductDetail; related: ProductDetail[]; labels: ProductPageLabels }) {
  const { contact } = useSiteSettings();
  const whatsapp = useWhatsAppLink();
  const preorderUrl = whatsapp(withProduct(L.preorderMessage, product.name));
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-pd-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: .12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const hasSpecs = product.specs.length > 0;
  const hasGallery = product.dimensionImages.length > 0 || product.gallery.some((group) => group.images.length > 0);
  const intro = product.intro.length ? product.intro : product.features[0]?.text?.slice(0, 1) || [product.summary];
  const productVideos = [product.heroVideo, ...product.trainingVideos].filter(Boolean) as Array<CmsFile | string>;
  const uniqueVideos = productVideos.filter((video, index, all) => all.findIndex((candidate) => mediaIdentity(candidate) === mediaIdentity(video)) === index);

  return <>
    <SiteHeader solid />
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
            {product.isComingSoon ? (
              <>
                {uniqueVideos.length > 0 && <a href="#teaser-video" className="pd-primary">{L.teaserButton} <span>▶</span></a>}
                <a
                  href={preorderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={uniqueVideos.length > 0 ? "pd-secondary" : "pd-primary"}
                >
                  {uniqueVideos.length > 0 ? L.notifyButton : L.preorderShort} <span>→</span>
                </a>
              </>
            ) : (
              <>
                <a href="#caracteristicas" className="pd-primary">{L.primaryButton} <span>↓</span></a>
                <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Información sobre ${product.name}`)}`} className="pd-secondary">{L.secondaryButton} <span>→</span></a>
              </>
            )}
          </div>
        </div>
        <div className="pd-hero-stage">
          <div className="pd-orbit pd-orbit-1" /><div className="pd-orbit pd-orbit-2" /><div className="pd-orbit pd-orbit-3" />
          {product.heroVideo && <video className="pd-hero-video" autoPlay muted loop playsInline preload="metadata">
            <source src={product.heroVideo.local} />
            <source src={product.heroVideo.source} />
          </video>}
          <SourceImage asset={product.heroImage} className="pd-hero-product" loading="eager" />
          {product.isComingSoon ? (
            <span className="pd-stage-label label-soon">{L.comingSoonShort}</span>
          ) : (
            <>
              <span className="pd-stage-label label-a">PRECISION IMAGING</span>
              <span className="pd-stage-label label-b">{product.category.toUpperCase()}</span>
            </>
          )}
        </div>
      </section>

      <nav className="pd-subnav" aria-label="Navegación del producto">
        <strong>
          {product.name}
          {product.isComingSoon && <span className="subnav-soon-pill">{L.comingSoonPill}</span>}
        </strong>
        <div>
          {product.isComingSoon ? (
            <>
              {uniqueVideos.length > 0 && <a href="#teaser-video">Video Teaser</a>}
              <a href="#contacto-preventa">Contacto preventa</a>
            </>
          ) : (
            <>
              <a href="#caracteristicas">Características</a>
              {hasSpecs && <a href="#especificaciones">Especificaciones</a>}
              {uniqueVideos.length > 0 && <a href="#video">Video</a>}
              {hasGallery && <a href="#galeria">Imágenes</a>}
              {product.catalogPdf && <a href="#catalogo">Catálogo</a>}
            </>
          )}
        </div>
      </nav>

      {product.isComingSoon ? (
        <section className="pd-teaser-full" id="teaser-video" data-pd-reveal>
          <div className="pd-teaser-head">
            <span className="model-coming-soon-pill">{L.comingSoonBadge}</span>
            <h2>{product.name}</h2>
            <p>
              {product.summary || L.comingSoonFallback}
            </p>
          </div>
          {uniqueVideos.length > 0 && (
            <div className="pd-teaser-player-box">
              <iframe
                src={typeof uniqueVideos[0] === "string" ? uniqueVideos[0] : uniqueVideos[0].source}
                title={`${product.name} Video Teaser Oficial VATECH`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="pd-teaser-main-iframe"
              />
            </div>
          )}
          <div className="pd-teaser-actions" id="contacto-preventa">
            <p>{L.preorderText}</p>
            <a
              href={preorderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red"
            >
              {L.preorderButton} ↗
            </a>
          </div>
        </section>
      ) : (
        <>
          <section className="pd-intro" id="caracteristicas" data-pd-reveal>
            <div>
              <p className="pd-section-label">{product.category}</p>
              <h2><Lines text={L.introTitle} /></h2>
            </div>
            <div className="pd-intro-copy">
              {intro.map((text, index) => <p key={index}>{text}</p>)}
              {!!product.highlights.length && <div className="pd-highlight-list">{product.highlights.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>}
            </div>
          </section>

          {product.features.length > 0 && (
            <section className="pd-features">
              {product.features.map((feature, index) => <article className={`pd-feature ${index % 2 ? "reverse" : ""}`} data-pd-reveal key={`${feature.title}-${index}`}>
                <div className="pd-feature-copy">
                  <span className="pd-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{feature.title}</h3>
                  {feature.text.map((text, i) => <p key={i}>{text}</p>)}
                </div>
                <FeatureMedia images={feature.images} title={feature.title} />
              </article>)}
            </section>
          )}
        </>
      )}

      {!product.isComingSoon && hasSpecs && <section className="pd-specs" id="especificaciones">
        <div className="pd-specs-head" data-pd-reveal><p className="pd-section-label">{L.specsLabel}</p><h2>{L.specsTitle}</h2></div>
        <div className="pd-spec-tables" data-pd-reveal>
          <div className="pd-spec-table-wrap"><table className="pd-spec-table"><tbody>
            {product.specs.map((group, groupIndex) => <tr key={groupIndex}>
              <th scope="row">{group.key}</th>
              <td>{group.items.map((item, itemIndex) => <div className={`pd-spec-item${item.label ? " has-label" : ""}`} key={itemIndex}>
                {item.label && <span className="pd-spec-sublabel">{item.label}</span>}
                <span className="pd-spec-values">{item.values.map((value, valueIndex) => <span key={valueIndex}>{value}</span>)}</span>
              </div>)}</td>
            </tr>)}
          </tbody></table></div>
        </div>
      </section>}

      {!product.isComingSoon && hasGallery && <section className="pd-gallery" id="galeria">
        <div className="pd-gallery-head" data-pd-reveal><div><p className="pd-section-label">{L.galleryLabel}</p><h2>{L.galleryTitle}</h2></div></div>
        {product.dimensionImages.length > 0 && <div className="pd-dimensions" data-pd-reveal>{product.dimensionImages.map((asset, index) => <figure key={`${asset.local}-${index}`}><SourceImage asset={asset} /></figure>)}</div>}
        {product.gallery.length > 0 && <div className="pd-gallery-groups">{product.gallery.map((group, groupIndex) => group.images.length > 0 && <article key={groupIndex} data-pd-reveal>
          {group.title && <h3>{group.title}</h3>}
          {group.text.map((text, index) => <p key={index}>{text}</p>)}
          <div className="pd-gallery-grid">{group.images.map((asset, index) => <SourceImage asset={asset} key={`${asset.local}-${index}`} />)}</div>
        </article>)}</div>}
      </section>}

      {!product.isComingSoon && uniqueVideos.length > 0 && <section className="pd-training" id="video" data-pd-reveal>
        <div className="pd-training-copy">
          <p className="pd-section-label">{L.videoLabel}</p>
          <h2>{uniqueVideos.length > 1 ? L.videoTitleMultiple : L.videoTitleSingle}</h2>
        </div>
        <div className="pd-training-grid">
          {uniqueVideos.map((video, index) => <ProductVideo key={`${mediaIdentity(video)}-${index}`} video={video} productName={product.name} index={index} />)}
        </div>
      </section>}

      {!product.isComingSoon && product.catalogPdf && <section className="pd-catalog" id="catalogo" data-pd-reveal>
        <div><p className="pd-section-label">{L.catalogLabel}</p><h2><Lines text={L.catalogTitle} /></h2></div>
        <a href={product.catalogPdf.local} target="_blank" rel="noreferrer">{L.catalogButton} <span>↗</span></a>
      </section>}

      <section className="pd-contact" data-pd-reveal>
        <div className="pd-contact-ring" />
        <p>{L.contactEyebrow}</p><h2><Lines text={L.contactTitle} /></h2>
        <a href={`mailto:${contact.email}`}>{L.contactButton} <span>→</span></a>
      </section>

      {related.length > 0 && <section className="pd-related">
        <div className="pd-related-head"><p className="pd-section-label">{L.relatedLabel}</p><h2>{L.relatedTitle}</h2></div>
        <div className="pd-related-grid">{related.map((item) => <Link href={`/productos/${item.slug}`} key={item.slug} className="pd-related-card">
          <div><SourceImage asset={item.cardImage} /><span>Explorar →</span></div><h3>{item.name}</h3><p>{item.summary}</p>
        </Link>)}</div>
      </section>}
    </main>
    <SiteFooter />
  </>;
}
