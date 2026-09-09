"use client";

import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  localSrc: string;
  sourceSrc: string;
};

export default function OriginalAssetImage({ localSrc, sourceSrc, alt = "", ...props }: Props) {
  const [src, setSrc] = useState(localSrc);
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      data-original-source={sourceSrc}
      onError={() => {
        if (src !== sourceSrc) setSrc(sourceSrc);
      }}
    />
  );
}
