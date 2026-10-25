"use client";

import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  localSrc: string;
  sourceSrc: string;
};

export default function OriginalAssetImage({ localSrc, sourceSrc, alt = "", decoding = "async", ...props }: Props) {
  const [src, setSrc] = useState(localSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si el componente se reutiliza con otra imagen (p. ej. al cambiar de pestaña), vuelve a la fuente local
  useEffect(() => { setSrc(localSrc); }, [localSrc]);

  // Un error ocurrido antes de la hidratación no dispara onError: se detecta al montar y se usa el respaldo
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && src !== sourceSrc) setSrc(sourceSrc);
  }, [src, sourceSrc]);

  return (
    <img
      {...props}
      ref={imgRef}
      src={src}
      alt={alt}
      decoding={decoding}
      data-original-source={sourceSrc}
      onError={() => {
        if (src !== sourceSrc) setSrc(sourceSrc);
      }}
    />
  );
}
