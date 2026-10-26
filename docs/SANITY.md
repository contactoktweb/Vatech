# Administrador de contenido (Sanity)

Todo el contenido del sitio se edita desde Sanity: textos, imágenes, productos, logos, redes sociales, datos de contacto, menú y pie de página. El diseño (colores, clases, íconos) sigue en el código.

El administrador está dentro del mismo sitio, en **`/studio`** (por ejemplo `https://www.vatechcolombia.com.co/studio`).

## 1. Puesta en marcha (una sola vez)

1. **Crear el proyecto** en [sanity.io/manage](https://www.sanity.io/manage) → *Create project*. Usa el dataset **`production`**.
2. **Copiar el Project ID** del proyecto.
3. **Crear un token de escritura**: en el proyecto → *API* → *Tokens* → *Add API token*, con permiso **Editor**. Se usa solo para la carga inicial.
4. **Permitir el dominio del Studio** (CORS): en el proyecto → *API* → *CORS origins* → *Add CORS origin*, con **Allow credentials** activado. Agrega:
   - `http://localhost:3000` (desarrollo)
   - `https://www.vatechcolombia.com.co` y la URL de Vercel del proyecto
5. **Variables de entorno**: copia `.env.example` como `.env.local` y llena:

   | Variable | Valor |
   | --- | --- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | El Project ID |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `SANITY_API_WRITE_TOKEN` | El token de escritura |
   | `SANITY_REVALIDATE_SECRET` | (Opcional) Una clave secreta inventada, para el webhook |

   En **Vercel** agrega `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` y, si usas el webhook, `SANITY_REVALIDATE_SECRET`. El token de escritura no es necesario en Vercel.

6. **Subir el contenido actual** a Sanity:

   ```bash
   pnpm install
   pnpm sanity:seed
   ```

   Esto crea las páginas, los 16 productos y sube las ~110 imágenes. Si un documento ya existe en Sanity, se conserva (no pisa ediciones). Para reemplazar todo con el contenido original: `pnpm sanity:seed --force`. Para ver qué se cargaría sin subir nada: `pnpm sanity:seed --dry-run`.

7. Abre `http://localhost:3000/studio`, inicia sesión con tu cuenta de Sanity y listo.

> Mientras no haya Project ID configurado, el sitio funciona igual que siempre con el contenido por defecto (`lib/cms/defaults`).

## 2. Qué se edita y dónde

| En el Studio | Qué contiene |
| --- | --- |
| **Configuración general** | Nombre del sitio, logos, correo, WhatsApp, dirección y mapa, redes sociales, menú principal, botón "Cotizar", pie de página, aviso de sitio en construcción, página en construcción y SEO general |
| **Páginas → Inicio** | Portada, cifras, beneficios, tecnología, historia, equipos destacados, servicios, contacto, cotizador y ventana de especialista |
| **Páginas → Quiénes somos / Filosofía / Red mundial / Distribuidores** | Todos los textos e imágenes de cada página, oficinas del mundo, directorio de distribuidores y formulario |
| **Páginas → Página de productos** | Encabezado, nombres de pestañas, tabla comparativa 3D, lanzamiento destacado (Green X21), sección de software y textos fijos de las fichas |
| **Productos** | Cada equipo y software: nombre, dirección web, pestaña y orden en el catálogo, tarjeta, introducción, características, imágenes, videos, especificaciones, catálogo PDF y SEO |

Consejos para editar:

- **Títulos con salto de línea**: presiona Enter dentro del título.
- **Negrita** en los beneficios de la portada: escribe `**texto**`.
- **Mensajes de WhatsApp** con `{producto}`: se reemplaza por el nombre del equipo.
- Cada página tiene una pestaña **SEO** con el título y la descripción para Google, y la imagen que aparece al compartir el enlace.
- Un campo vacío usa el texto original del sitio.

## 3. Cuándo se ven los cambios

Al pulsar **Publish** en el Studio, el sitio muestra el cambio en **máximo 1 minuto**.

Para verlo al instante, configura el webhook (opcional):

1. En el proyecto de Sanity → *API* → *Webhooks* → *Create webhook*.
2. URL: `https://www.vatechcolombia.com.co/api/revalidate`.
3. Dataset `production`, disparar en *Create*, *Update* y *Delete*.
4. En *Secret* pon el mismo valor de `SANITY_REVALIDATE_SECRET`.

## 4. Productos nuevos

Crea un documento en **Productos**, completa al menos el nombre, la dirección web y la imagen principal, elige la **pestaña del catálogo** y el **orden**, y publica. La ficha queda disponible en `/productos/<dirección>` sin volver a desplegar.

## 5. Archivos del código

| Archivo | Para qué sirve |
| --- | --- |
| `sanity.config.ts` | Configuración del Studio |
| `sanity/schemaTypes/` | Campos de cada documento (lo que se ve en el Studio) |
| `sanity/structure.ts` | Menú lateral del Studio |
| `lib/cms/index.ts` | Lee el contenido de Sanity y lo combina con el contenido por defecto |
| `lib/cms/defaults/` | Contenido original del sitio (respaldo y carga inicial) |
| `scripts/sanity-seed.ts` | Carga inicial del contenido |
| `app/studio/` | Ruta `/studio` |
| `app/api/revalidate/` | Webhook para actualizar al instante |
