import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-brand">
        <img src="/brand/vatech-logo.png" alt="VATECH" />
        <p>Tecnología de vanguardia en imagenología dental.</p>
        <div className="socials">
          <a href="https://www.facebook.com/vatechmx" aria-label="Facebook">f</a>
          <a href="https://www.instagram.com/vatech.mexico/" aria-label="Instagram">◎</a>
          <a href="https://www.youtube.com/channel/UCUoUvlHzian9vm7rkKLRFQw?view_as=subscriber" aria-label="YouTube">▶</a>
          <a href="https://www.tiktok.com/@vatechmexico" aria-label="TikTok">♪</a>
        </div>
      </div>
      <div><h4>Compañía</h4><Link href="/quienes-somos">Quiénes somos</Link><Link href="/filosofia">Filosofía</Link><Link href="/red-mundial-vatech">Red mundial</Link><Link href="/instituto-vatech">Instituto VATECH</Link></div>
      <div><h4>Productos</h4><Link href="/productos#equipos">Equipos Vatech</Link><Link href="/productos#zirconia">Zirconia</Link><Link href="/productos#software">Software</Link><Link href="/media">Media</Link></div>
      <div><h4>Soporte</h4><Link href="/servicio-tecnico">Servicio técnico</Link><Link href="/distribuidores">Distribuidores</Link><a href="https://vatechmxsoporte.com/representante-de-mexico/">Vatech Soporte</a><a href="https://vatechmxstore.com/">VM Store</a></div>
      <div><h4>Contacto</h4><p>contacto@vatechmexico.com</p><p>+52 1 (55) 6150 9054</p><p>Paseo de la Reforma 296, piso 17<br />Col. Cuauhtémoc, C.P. 06600<br />Ciudad de México</p></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VATECH México. Todos los derechos reservados.</span>
        <a href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "inherit", textDecoration: "none" }}>
          Desarrollado por K&amp;T <span style={{ color: "#ffffff" }}>❤</span>
        </a>
        <a href="https://vatechmexico.com/aviso-de-privacidad/">Aviso de privacidad</a>
      </div>
    </footer>
  );
}
