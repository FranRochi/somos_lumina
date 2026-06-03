"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#inicio" className="brand-mark">
              <span className="dot" />
              LÚMINA
            </a>
            <p>Soluciones digitales con identidad. Desarrollo web + comunicación estratégica, hechos a medida.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Navegación</h4>
              <a href="#servicios">Servicios</a>
              <a href="#nosotros">Nosotros</a>
              <a href="#proyectos">Proyectos</a>
              <a href="#faqs">FAQs</a>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href="https://wa.me/5492214197236" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="https://www.instagram.com/somoslumina" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#contacto">Escribinos</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lúmina. Todos los derechos reservados.</span>
          <span>Hecho con identidad en La Plata, Argentina.</span>
        </div>
      </div>
    </footer>
  );
}
