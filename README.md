# VATECH Colombia — Rediseño Next.js

Rediseño visual premium para VATECH Colombia con la paleta de marca: rojo `#C92C36`, carbón `#1A1A1D` y blanco.

## Ejecutar

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

> `npm run dev` ejecuta automáticamente `npm run assets` antes de iniciar Next.js. Ese proceso descarga los recursos originales desde las URLs públicas de VATECH y los guarda en `public/assets/` para que la web los sirva localmente.

Para volver a descargar todos los recursos aunque ya existan:

```bash
npm run assets:force
```

## Rutas incluidas

- `/` — Home
- `/quienes-somos` — Quiénes Somos
- `/filosofia` — Filosofía VATECH
- `/red-mundial-vatech` — Red Mundial Vatech
- `/instituto-vatech` — Instituto VATECH
- `/productos` — Equipos Vatech, Zirconia y Software
- `/servicio-tecnico` — Servicio técnico
- `/distribuidores` — Distribuidores Colombia / Latinoamérica
- `/media` — Promociones, noticias, fotos y videos

## Menú

La navegación replica la jerarquía suministrada:

- Compañía
  - Filosofía
  - Quiénes Somos
  - Red Mundial Vatech
  - Instituto VATECH
    - Plan de trabajo
    - Equipo de profesionales
- Productos
  - Equipos Vatech
  - Zirconia
  - Software
- Servicio técnico
- Distribuidores
- Programas de renovación
  - Buyback Vatech
  - Tradein|up Vatech
- Media
  - Promociones
  - Noticias
  - Fotos y videos

## Assets originales

Los recursos descargados se organizan en:

- `public/assets/home`
- `public/assets/philosophy`
- `public/assets/people`
- `public/assets/service`
- `public/assets/products`
- `public/assets/media`

El listado fuente y la correspondencia URL → archivo local están en `scripts/download-vatech-assets.mjs`. Los componentes que usan estas imágenes conservan como respaldo la URL original en caso de que un recurso no pueda descargarse. El archivo descargado conserva el formato y el nombre del recurso de origen siempre que es posible.

## Fichas internas de producto

El catálogo ya no redirige las fichas a `vatechmexico.com`. Todas las tarjetas apuntan a rutas internas `/productos/[slug]`.

Se creó una plantilla reutilizable en `components/ProductDetailPage.tsx` y la fuente de datos está en `data/product-catalog.json`.

Los HTML entregados se procesaron para extraer contenido, especificaciones, imágenes, videos y catálogos de 19 productos. Los recursos originales se registran en `data/product-assets.json` y `npm run assets` los guarda en `public/assets/product-details/<slug>/`.

Productos con ficha HTML completa integrada actualmente: Green X12, Green 16, Smart Plus, A9, Green X21, PaX-i, Ez Sensor HD, Ez Sensor CLASSIC, EzRay Air Portátil, EzRay Air Wall, EzRay Air C, Ez Scan, EzCam, Perfit ZR, Perfit FS, EzOrtho, Ez3D-i, EzDent-i y Clever RC.

Las rutas de Green X16 / X18 y PaX-i Plus ya son internas y muestran una ficha base; se completarán al añadir sus HTML específicos.

## Actualización de contenido audiovisual y Home

- Las fichas muestran en una sección visible de **Video del producto** todos los videos encontrados en el HTML original. Los MP4 se guardan localmente mediante `npm run assets`; los videos de YouTube se reproducen embebidos dentro de la ficha.
- El Home usa renders de producto de mayor resolución para las composiciones grandes, evitando ampliar las miniaturas históricas de 179×200 px.
- La cronología del Home conserva los 11 hitos originales de 2005 a 2022 y mantiene los recursos históricos cerca de su tamaño nativo.
- Se incrementó ligeramente el tamaño de la tipografía de lectura en Home, fichas de producto, catálogo y subpáginas.
# Vatech
# Vatech
