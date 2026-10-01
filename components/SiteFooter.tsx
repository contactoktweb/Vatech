import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573133505068";
const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "+57 (313) 350 5068";
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "www.vatechcolombia.com";

export default function SiteFooter() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, me gustaría recibir asesoría sobre los equipos radiológicos VATECH Colombia."
  )}`;

  return (
    <footer id="footer" className="footer">
      <div className="footer-brand">
        <img src="/brand/vatech-logo.png" alt="VATECH Colombia" />
        <p>Tecnología de vanguardia en imagenología dental.</p>
        <div className="footer-status-pill">
          <span className="footer-status-pulse" aria-hidden="true" />
          <span>Sitio en construcción — próximamente {SITE_DOMAIN}</span>
        </div>
        <div className="socials">
          <a href="https://www.facebook.com/vatechcolombia" aria-label="Facebook">f</a>
          <a href="https://www.instagram.com/vatechcolombia/" aria-label="Instagram">◎</a>
          <a href="https://www.youtube.com/channel/UCUoUvlHzian9vm7rkKLRFQw?view_as=subscriber" aria-label="YouTube">▶</a>
          <a href="https://www.tiktok.com/@vatechcolombia" aria-label="TikTok">♪</a>
        </div>
      </div>

      <div>
        <h4>Compañía</h4>
        <Link href="/quienes-somos">Quiénes somos</Link>
        <Link href="/filosofia">Filosofía</Link>
        <Link href="/red-mundial-vatech">Red mundial</Link>
        <Link href="/instituto-vatech">Instituto VATECH</Link>
      </div>

      <div>
        <h4>Productos</h4>
        <Link href="/productos#equipos">Equipos Vatech</Link>
        <Link href="/productos#zirconia">Zirconia</Link>
        <Link href="/productos#software">Software</Link>
        <Link href="/media">Media</Link>
      </div>

      <div>
        <h4>Soporte</h4>
        <Link href="/servicio-tecnico">Servicio técnico</Link>
        <Link href="/distribuidores">Distribuidores</Link>
        <a href="https://vatech.com" target="_blank" rel="noopener noreferrer">Vatech Global</a>
        <Link href="/productos">Catálogo</Link>
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
          Cra. 15 # 118-03, Mezzanine 4<br />
          Calle 134D # 50-59<br />
          Bogotá, Colombia
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
          Desarrollado por K&amp;T <span style={{ color: "#ffffff" }}>❤</span>
        </a>
        <a href="https://vatech.com/privacy-policy" target="_blank" rel="noopener noreferrer">
          Aviso de privacidad
        </a>
      </div>
    </footer>
  );
}
