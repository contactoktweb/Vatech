import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573126344188";
const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "+57 312 6344188";
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "www.vatechcolombia.com";

export default function SiteFooter() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola VATECH Colombia, me gustaría recibir asesoría sobre sus equipos radiológicos."
  )}`;

  return (
    <footer id="footer" className="footer">
      <div className="footer-brand">
        <img src="/brand/vatech-colombia-white.png" alt="VATECH Colombia" style={{ maxWidth: "180px", height: "auto" }} />
        <p>Tecnología de vanguardia en imagenología dental.</p>
        <div className="footer-status-pill">
          <span className="footer-status-pulse" aria-hidden="true" />
          <span>Sitio en construcción — próximamente {SITE_DOMAIN}</span>
        </div>
        <div className="socials">
          <a href="https://www.facebook.com/vatechcolombia" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Vatech Colombia">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/vatechcolombia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Vatech Colombia">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCUoUvlHzian9vm7rkKLRFQw?view_as=subscriber" target="_blank" rel="noopener noreferrer" aria-label="YouTube de Vatech Colombia">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@vatechcolombia" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Vatech Colombia">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V15.2c.04 2.19-.6 4.45-1.99 6.17-1.41 1.74-3.52 2.8-5.74 2.87-2.12.07-4.26-.64-5.84-2.03-1.68-1.48-2.67-3.66-2.64-5.91.03-2.29 1.1-4.48 2.88-5.9 1.78-1.42 4.16-1.97 6.37-1.48v4.19c-1.12-.4-2.4-.33-3.44.25-.99.56-1.66 1.61-1.72 2.75-.06 1.18.5 2.33 1.45 3.02.94.69 2.2.82 3.28.38 1.05-.43 1.75-1.49 1.78-2.63V.02z"/></svg>
          </a>
        </div>
      </div>

      <div>
        <h4>Compañía</h4>
        <Link href="/quienes-somos">Quiénes somos</Link>
        <Link href="/filosofia">Filosofía</Link>
        <Link href="/red-mundial-vatech">Red mundial</Link>
      </div>

      <div>
        <h4>Productos</h4>
        <Link href="/productos#equipos">Equipos Vatech</Link>
        <Link href="/productos#comparativa-3d">Comparativa 3D</Link>
        <Link href="/productos#software">Software</Link>
      </div>

      <div>
        <h4>Red & Distribución</h4>
        <Link href="/distribuidores">Distribuidores</Link>
        <Link href="/distribuidores#ser-distribuidor">¿Quieres ser distribuidor?</Link>
        <a href="https://vatech.com" target="_blank" rel="noopener noreferrer">Vatech Global</a>
        <Link href="/productos">Catálogo de Equipos</Link>
      </div>

      <div>
        <h4>Contacto</h4>
        <p>
          <a href="mailto:contacto@vatechcolombia.com" className="footer-link-highlight">
            contacto@vatechcolombia.com
          </a>
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-whatsapp-btn"
          aria-label={`Contactar por WhatsApp corporativo al ${WHATSAPP_DISPLAY}`}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>WhatsApp directo: {WHATSAPP_DISPLAY}</span>
        </a>
        <p>
          <a
            href="https://maps.app.goo.gl/2oGW1g6WhiqN3TLZ7"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address-link"
            title="Abrir ubicación de VATECH Colombia en Google Maps"
          >
            Cra. 7 # 113-43, Oficina 805<br />
            Torre Teleport Business Park<br />
            Bogotá, Colombia ↗
          </a>
        </p>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VATECH Colombia. Todos los derechos reservados.</span>
        <span className="footer-site-construction">Sitio en construcción — próximamente {SITE_DOMAIN}</span>
        <a
          href="https://www.kytcode.lat"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Desarrollado por K&amp;T{" "}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="#ffffff"
            aria-hidden="true"
            style={{ display: "inline-block", verticalAlign: "middle" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </a>
        <a href="https://vatech.com/privacy-policy" target="_blank" rel="noopener noreferrer">
          Aviso de privacidad
        </a>
      </div>
    </footer>
  );
}
