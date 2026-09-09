import { mkdir, stat, writeFile, unlink, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const A = (remote, local) => ({ remote, local: path.join(root, "public", local) });

const assets = [
  // Marca / elementos comunes
  A("https://vatechmexico.com/wp-content/uploads/2023/06/Logos-vatech.png", "assets/brand/Logos-vatech.png"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/LOGOvateh-1024x272.png", "assets/brand/LOGOvateh-1024x272.png"),

  // Home / history
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PAXDUO3D.png", "assets/home/PAXDUO3D.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PAXUNI3D.png", "assets/home/PAXUNI3D.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PAXREVE.png", "assets/home/PAXREVE.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PAXI.png", "assets/home/PAXI.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PAXI3DGREEN.png", "assets/home/PAXI3DGREEN.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/picasso-1.png", "assets/home/picasso-1.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/EZSENSORSOFT.png", "assets/home/EZSENSORSOFT.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PAXIINSIGHT.png", "assets/home/PAXIINSIGHT.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/EZRAY-AIR-P.png", "assets/home/EZRAY-AIR-P.png"),

  // Filosofía — originales suministrados
  ...[
    "1.png","3.png","2.png","4-441x1024.png","5-621x1024.webp","6.png","7-724x1024.png",
    "9.png","10-888x1024.webp","11.png","12.png","13.png","14.webp","15.png","16.png",
    "17-1024x679.webp","18-1024x531.webp","19-1024x813.webp","21.png","20.png"
  ].map(name => A(`https://vatechmexico.com/wp-content/uploads/2025/03/${name}`, `assets/philosophy/${name}`)),

  // Quiénes somos
  A("https://vatechmexico.com/wp-content/uploads/2023/08/Logo-No.-1.png", "assets/company/Logo-No.-1.png"),

  // Red mundial — imágenes originales por oficina
  A("https://vatechmexico.com/wp-content/uploads/2026/03/indonesia.png", "assets/world/indonesia.png"),
  ...[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3].map(n => {
    const file = `VATECH-EN-EL-MUNDO-${String(n).padStart(2,"0")}.png`;
    return A(`https://vatechmexico.com/wp-content/uploads/2026/03/${file}`, `assets/world/${file}`);
  }),

  // Instituto
  A("https://vatechmexico.com/wp-content/uploads/2023/07/Hector.jpg", "assets/people/Hector.jpg"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/pardo.jpg", "assets/people/pardo.jpg"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/DrRicardoVazquez.jpg", "assets/people/DrRicardoVazquez.jpg"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/imag-01.jpg", "assets/people/imag-01.jpg"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/Dr-Ernesto-Ivan-Herrera-Ibarra.jpg", "assets/people/Dr-Ernesto-Ivan-Herrera-Ibarra.jpg"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/insvat.png", "assets/institute/insvat.png"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/MainSupport.png", "assets/institute/MainSupport.png"),

  // Servicio técnico
  A("https://vatechmexico.com/wp-content/uploads/2026/06/servicio2.png", "assets/service/servicio2.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/servicio3.png", "assets/service/servicio3.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/servicio.png", "assets/service/servicio.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/openpay-scaled.webp", "assets/service/openpay-scaled.webp"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/dhl.png", "assets/service/dhl.png"),
  A("https://vatechmexico.com/wp-content/uploads/elementor/thumbs/satisfaccion-rphyeq050pyp1184acmq2bzvajrltbqln06vzcbo68.webp", "assets/service/satisfaccion.webp"),

  // Distribuidores / plan de incentivos — emblemas e insignias originales
  A("https://vatechmexico.com/wp-content/uploads/2023/08/emblemas-1.png", "assets/distributors/emblemas-1.png"),
  ...[
    "Insignias-website-plan-de-incentivos-03.svg","1.svg","Insignias-website-plan-de-incentivos-06.svg",
    "Insignias-website-plan-de-incentivos-08.svg","Insignias-website-plan-de-incentivos-04.svg","Punto.png",
    "Insignias-website-plan-de-incentivos-07.png","Insignias-website-plan-de-incentivos_Mesa-de-trabajo-1.png",
    "Insignias-website-plan-de-incentivos-07.svg","2.svg","Insignias-website-plan-de-incentivos-05.svg"
  ].map(name => A(`https://vatechmexico.com/wp-content/uploads/2023/08/${name}`, `assets/distributors/${name}`)),

  // Productos — se descargan exactamente desde las URLs originales del sitio
  A("https://vatechmexico.com/wp-content/uploads/2026/03/PRODUCTOS-VATECH.mp4", "assets/products/PRODUCTOS-VATECH.mp4"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/X18X16.png", "assets/products/X18X16.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/X12.png", "assets/products/X12.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/16.png", "assets/products/16.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/SMARTPLUS.png", "assets/products/SMARTPLUS.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/A9.png", "assets/products/A9.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/03/X21-scaled.png", "assets/products/X21-scaled.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/PAXIPLUS.png", "assets/products/PAXIPLUS.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/PAXI-.png", "assets/products/PAXI-.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/HD.png", "assets/products/HD.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/CLASSIC.png", "assets/products/CLASSIC.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/EZRAY-AIR-PORTATIL.png", "assets/products/EZRAY-AIR-PORTATIL.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/EZRAY-AIR-WALL.png", "assets/products/EZRAY-AIR-WALL.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/EZRAYAIR.png", "assets/products/EZRAYAIR.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/EZSCAN.png", "assets/products/EZSCAN.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/07/EZCAM.png", "assets/products/EZCAM.png"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/PERFITSOMBREADOPAGINA.webp", "assets/products/PERFITSOMBREADOPAGINA.webp"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/perfit-FS.webp", "assets/products/perfit-FS.webp"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/EZORTHOSOMBRA.webp", "assets/products/EZORTHOSOMBRA.webp"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/EZ3D-I.webp", "assets/products/EZ3D-I.webp"),
  A("https://vatechmexico.com/wp-content/uploads/2026/06/EZDENTIpng.webp", "assets/products/EZDENTIpng.webp"),
  A("https://vatechmexico.com/wp-content/uploads/2026/08/CLEVER-RC-scaled.png", "assets/products/CLEVER-RC-scaled.png"),

  // Media — promociones
  A("https://vatechmexico.com/wp-content/uploads/2023/07/Ezray-Air-R6_Promociones-Website.png", "assets/media/promotions/Ezray-Air-R6_Promociones-Website.png"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/2-scaled.jpg", "assets/media/promotions/2-scaled.jpg"),
  A("https://vatechmexico.com/wp-content/uploads/2023/07/porque_vatech-scaled.jpg", "assets/media/promotions/porque_vatech-scaled.jpg"),

  // Media — noticias
  ...["portada_7.jpg","PortadaNota_Mesa-de-trabajo-1.jpg","Noticia_Imagen11.jpg","ims.png","portada_expo.png","Webinar_Jovita.png","mexico.png","laura.jpg","event.jpg","primer.jpg"].map(name => A(`https://vatechmexico.com/wp-content/uploads/2023/07/${name}`, `assets/media/news/${name}`)),

  // Media — galería
  ...["02.Rayence.jpg","05.VatechCNT.jpg","08.VatechCNTP1.jpg","10.VatechCNT.jpg","17.EwoosoftSW.jpg","18.EwoosoftSW.jpg","19.EwoosoftSW.jpg","laboratorio1.png","dientes1.png","06.jpg","09.jpg","07.jpg","10.jpg","11.jpg","08.jpg"].map(name => A(`https://vatechmexico.com/wp-content/uploads/2023/07/${name}`, `assets/media/gallery/${name}`)),

  // Media — thumbnails de video
  ...["Miniatura-Youtube-Video-ANUAL.jpg","Vatech-Experience-21_BRENDA.png","Webinars_Miniatura-Video.png","Miniatura-YT-Video-Anual-1.jpg","distri-2019.jpg","vatech.png","2.png","1.png","3.png"].map(name => A(`https://vatechmexico.com/wp-content/uploads/2023/07/${name}`, `assets/media/videos/${name}`)),
];

// Product detail assets extracted from the HTML supplied for each product.
try {
  const manifestPath = path.join(root, "data", "product-assets.json");
  const detailAssets = JSON.parse(await readFile(manifestPath, "utf8"));
  for (const item of detailAssets) assets.push(A(item.remote, item.local));
} catch (error) {
  console.warn("No se pudo cargar data/product-assets.json:", error?.message || error);
}

const force = process.argv.includes("--force");

async function existsNonEmpty(file) {
  try { return (await stat(file)).size > 100; } catch { return false; }
}

async function download(asset) {
  if (!force && await existsNonEmpty(asset.local)) return { status:"skip", asset };
  await mkdir(path.dirname(asset.local), { recursive:true });
  let lastError;
  for (let attempt=1; attempt<=3; attempt++) {
    try {
      const res = await fetch(asset.remote, {
        redirect:"follow",
        signal: AbortSignal.timeout(15000),
        headers:{
          "user-agent":"Mozilla/5.0 (compatible; VATECH-Mexico-Site-Asset-Mirror/1.0)",
          "accept":"image/avif,image/webp,image/apng,image/svg+xml,image/*,video/*,*/*;q=0.8",
          "referer":"https://vatechmexico.com/"
        }
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length < 100) throw new Error("respuesta vacía o inválida");
      await writeFile(asset.local, bytes);
      return { status:"ok", asset, bytes:bytes.length };
    } catch (err) {
      lastError = err;
      try { await unlink(asset.local); } catch {}
      if (attempt < 3) await new Promise(r => setTimeout(r, 500 * attempt));
    }
  }
  return { status:"error", asset, error:lastError };
}

async function runPool(items, size=5) {
  let cursor = 0;
  const results = [];
  const worker = async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      const result = await download(item);
      results.push(result);
      const rel = path.relative(root, item.local);
      if (result.status === "ok") console.log(`✓ ${rel} (${Math.round(result.bytes/1024)} KB)`);
      if (result.status === "error") console.warn(`! ${rel}: ${result.error?.message || result.error}`);
    }
  };
  await Promise.all(Array.from({length:size}, worker));
  return results;
}

console.log(`VATECH assets: ${assets.length} archivos originales`);
const results = await runPool(assets);
const ok = results.filter(x=>x.status==="ok").length;
const skip = results.filter(x=>x.status==="skip").length;
const errors = results.filter(x=>x.status==="error");
console.log(`Listo: ${ok} descargados, ${skip} ya existentes, ${errors.length} errores.`);
if (errors.length) {
  console.warn("La web conserva fallback a la URL original para cualquier recurso que no se haya podido descargar.");
}
