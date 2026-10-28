"use client";

import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  localSrc: string;
  sourceSrc: string;
  /** Máximo de veces que se puede ampliar la imagen sobre su tamaño real (evita que se vea borrosa) */
  maxUpscale?: number;
};

function capSize(img: HTMLImageElement, maxUpscale?: number) {
  if (!maxUpscale || !img.naturalWidth) return;
  img.style.maxWidth = `${Math.round(img.naturalWidth * maxUpscale)}px`;
  img.style.maxHeight = `${Math.round(img.naturalHeight * maxUpscale)}px`;
}

export default function OriginalAssetImage({ localSrc, sourceSrc, alt = "", decoding = "async", maxUpscale, onLoad, ...props }: Props) {
  const [src, setSrc] = useState(localSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si el componente se reutiliza con otra imagen (p. ej. al cambiar de pestaña), vuelve a la fuente local
  useEffect(() => { setSrc(localSrc); }, [localSrc]);

  // Un error ocurrido antes de la hidratación no dispara onError: se detecta al montar y se usa el respaldo
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && src !== sourceSrc) setSrc(sourceSrc);
  }, [src, sourceSrc]);

  // Igual con la carga: si la imagen ya estaba en caché, onLoad no se dispara y el límite se aplica al montar
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) capSize(img, maxUpscale);
  }, [src, maxUpscale]);

  if (!src) return null;

  return (
    <img
      {...props}
      ref={imgRef}
      src={src}
      alt={alt}
      decoding={decoding}
      data-original-source={sourceSrc}
      onLoad={(event) => {
        capSize(event.currentTarget, maxUpscale);
        onLoad?.(event);
      }}
      onError={() => {
        if (src !== sourceSrc) setSrc(sourceSrc);
      }}
    />
  );
}
