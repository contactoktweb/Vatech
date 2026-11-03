// Imágenes de Sanity en el tamaño justo: el CDN de Sanity las redimensiona y las entrega en WebP/AVIF,
// así el navegador descarga la versión que necesita según la pantalla y no siempre la más grande.

const SANITY_IMAGE = /^https:\/\/cdn\.sanity\.io\/images\//;
const WIDTHS = [320, 480, 640, 800, 1080, 1440, 1920];

export const isSanityImage = (url?: string) => !!url && SANITY_IMAGE.test(url) && !/\.(svg|gif)(\?|$)/.test(url);

/** La misma imagen de Sanity con otro ancho (no la agranda más allá de su tamaño real). */
export function sanityWidth(url: string, width: number) {
  if (!isSanityImage(url)) return url;
  const [base] = url.split("?");
  return `${base}?auto=format&fit=max&w=${width}`;
}

const realWidth = (url: string) => Number(/-(\d+)x\d+\.\w+(\?|$)/.exec(url)?.[1]) || Infinity;

function widthsFor(url: string) {
  const real = realWidth(url);
  const widths = WIDTHS.filter((w) => w < real);
  if (real <= WIDTHS[WIDTHS.length - 1]) widths.push(real);
  return widths;
}

/** Imagen por defecto: la más grande de la lista, para que coincida con una de srcset y no se descargue dos veces. */
export function sanitySrc(url: string) {
  if (!isSanityImage(url)) return url;
  const widths = widthsFor(url);
  return sanityWidth(url, widths[widths.length - 1]);
}

/** Lista de tamaños para el atributo srcset, o undefined si la imagen no es de Sanity. */
export function sanitySrcSet(url?: string) {
  if (!url || !isSanityImage(url)) return undefined;
  return widthsFor(url).map((w) => `${sanityWidth(url, w)} ${w}w`).join(", ");
}
