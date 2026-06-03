"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CodeXml,
  Globe,
  Instagram,
  LayoutTemplate,
  LineChart,
  Megaphone,
  MessageCircle,
  PenTool,
  Search,
  Send,
  Share2,
  ShoppingBag,
  Sparkles,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Globe,
    title: "Sitios web a medida",
    desc: "Websites dinámicas, modernas e intuitivas, a la altura de tus objetivos.",
  },
  {
    icon: CodeXml,
    title: "Software a medida",
    desc: "Desarrollamos aplicaciones, sistemas y automatizaciones que resuelven necesidades concretas de tu proyecto u organización.",
  },
  {
    icon: LayoutTemplate,
    title: "Diseño de interfaz y prototipado",
    desc: "Diseñamos la estructura visual de tu sitio pensando en la experiencia de quienes lo visitan.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y actualización",
    desc: "Actualizamos contenidos y revisamos el funcionamiento de tu sitio para que todo esté al día, siempre.",
  },
  {
    icon: LineChart,
    title: "Estrategia digital y narrativa de marca",
    desc: "Co-construimos tu presencia digital, definiendo el tono, el mensaje y la historia que tu proyecto necesita.",
  },
  {
    icon: Share2,
    title: "Comunicación digital",
    desc: "Planificamos y gestionamos tus redes sociales: contenidos, comunidad y calendario, con una voz coherente en cada canal.",
  },
  {
    icon: Megaphone,
    title: "Comunicación institucional",
    desc: "Definimos cómo tu organización se comunica con sus públicos: mensajes clave, vínculo con la prensa y comunicación interna.",
  },
  {
    icon: PenTool,
    title: "Redacción creativa y UX Writing",
    desc: "Redactamos contenidos que conecten con tu audiencia: claros, coherentes y con identidad propia.",
  },
  {
    icon: Search,
    title: "Optimización SEO y estructura de contenidos",
    desc: "Organizamos la información de tu sitio para que sea clara, relevante y fácil de encontrar.",
  },
];

const faqs = [
  {
    question: "¿Qué necesito tener antes de empezar un sitio web?",
    answer:
      "Podés traer una idea general o un proyecto ya encaminado. Nosotros te ayudamos a definir objetivos, contenidos y estilo visual. Si ya tenés textos, imágenes o branding, los aprovechamos; si no, también podemos crearlos desde cero.",
  },
  {
    question: "¿En cuánto tiempo está listo el sitio web?",
    answer:
      "Depende del tipo y complejidad del sitio. Un sitio institucional simple puede estar listo en 2 a 4 semanas, mientras que una tienda online o una plataforma puede requerir más tiempo. Siempre trabajamos con cronogramas realistas y el contacto con vos es permanente.",
  },
  {
    question: "¿Qué incluye el servicio de mantenimiento?",
    answer:
      "Incluye la actualización de contenidos, el chequeo del funcionamiento general del sitio y soporte para resolver errores o necesidades futuras.",
  },
  {
    question: "¿Cómo se presupuesta mi sitio web?",
    answer:
      "Cada presupuesto es a medida, según las necesidades, objetivos y características del proyecto. No trabajamos con precios fijos ni paquetes cerrados porque entendemos que cada sitio es único.",
  },
  {
    question: "¿Los servicios se adaptan a cualquier tipo de proyecto?",
    answer:
      "Sí. Todo lo que hacemos es personalizado, desde el diseño hasta los contenidos y funcionalidades. No trabajamos con paquetes enlatados ni plantillas genéricas.",
  },
  {
    question: "¿Con qué tipo de clientes o proyectos trabajan?",
    answer:
      "Trabajamos con personas, emprendimientos, empresas o instituciones de todo tipo. Contamos con experiencia en el sector público y privado, aplicando nuestro conocimiento en entornos corporativos, culturales y de gestión pública.",
  },
  {
    question: "¿Qué medios de pago aceptan y cómo es el proceso?",
    answer:
      "Aceptamos efectivo, transferencias bancarias y billeteras virtuales. Manejamos un esquema de pagos por etapas: 25% al iniciar, 25% a mitad del proceso y 50% luego de la entrega final.",
  },
];

const tickerWords = [
  "Sitios institucionales",
  "Tiendas online",
  "Plataformas web",
  "Software a medida",
  "Landing pages",
  "Identidad de marca",
  "Comunicación digital",
  "Estrategia digital",
  "UX Writing",
  "SEO",
  "Prototipado",
];

const chips = [
  { Icon: CodeXml,        label: "Software a medida",           angle: 0,   left: "50%", top: "3%",  delay: "0s"   },
  { Icon: Megaphone,      label: "Comunicación institucional",   angle: 60,  left: "94%", top: "25%", delay: "0.7s" },
  { Icon: Share2,         label: "Comunicación digital",         angle: 120, left: "94%", top: "75%", delay: "1.4s" },
  { Icon: LayoutTemplate, label: "Plataformas a medida",         angle: 180, left: "50%", top: "97%", delay: "2.1s" },
  { Icon: ShoppingBag,    label: "Tiendas online",               angle: 240, left: "6%",  top: "75%", delay: "2.8s" },
  { Icon: Sparkles,       label: "Identidad de marca",           angle: 300, left: "6%",  top: "25%", delay: "3.5s" },
];

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={reveal}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });

  const tickerItems = useMemo(() => [...tickerWords, ...tickerWords], []);
  const sweepRef = useRef(null);
  const svcGridRef = useRef(null);
  const beamRef = useRef(null);

  /* ── Navbar scroll (no re-renders: useScroll + useTransform) ── */
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 40], ["oklch(0.987 0.004 288 / 0)", "oklch(0.987 0.004 288 / 0.82)"]);
  const navH  = useTransform(scrollY, [0, 40], ["74px", "64px"]);
  const navBorderColor = useTransform(scrollY, [0, 40], ["oklch(0.905 0.013 288 / 0)", "oklch(0.905 0.013 288 / 1)"]);
  const navBlur = useTransform(scrollY, [0, 40], ["blur(0px)", "blur(16px) saturate(1.2)"]);

  /* ── Hero orb beam: JS rotation that lights chips ── */
  useEffect(() => {
    const sweep = sweepRef.current;
    const chipEls = Array.from(document.querySelectorAll(".float-chip[data-angle]"));
    if (!sweep || !chipEls.length) return;

    sweep.style.animation = "none";

    const PERIOD = 9000;
    const SPREAD = 34;
    const angles = chipEls.map((c) => parseFloat(c.dataset.angle) || 0);
    let start = null;
    let raf;

    function angDist(a, b) { return Math.abs(((a - b) % 360 + 540) % 360 - 180); }

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      if (start === null) start = ts;
      const r = (((ts - start) / PERIOD) * 360) % 360;
      sweep.style.transform = `rotate(${r}deg)`;
      chipEls.forEach((chip, i) => {
        if (angDist(r, angles[i]) < SPREAD) chip.classList.add("lit");
        else chip.classList.remove("lit");
      });
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      chipEls.forEach((c) => c.classList.remove("lit"));
    };
  }, []);

  /* ── Service grid beam sweep ── */
  useEffect(() => {
    const grid = svcGridRef.current;
    const beam = beamRef.current;
    if (!grid || !beam) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(grid.querySelectorAll(".svc"));
    const BEAM_W = 220;
    const DURATION = 4600;
    const REST = 2400;
    let gridW = 0;
    let centers = [];

    function measure() {
      const gr = grid.getBoundingClientRect();
      gridW = gr.width;
      centers = cards.map((c) => {
        const r = c.getBoundingClientRect();
        return (r.left + r.right) / 2 - gr.left;
      });
    }
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let start = null;
    let inView = false;
    let raf;

    const observer = new IntersectionObserver(
      (entries) => { inView = entries[0].isIntersecting; },
      { threshold: 0.08 }
    );
    observer.observe(grid);

    function clearLit() { cards.forEach((c) => c.classList.remove("lit")); }

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      if (!inView) { beam.style.opacity = "0"; clearLit(); start = null; return; }
      if (start === null) start = ts;
      const cycle = DURATION + REST;
      const t = (ts - start) % cycle;
      if (t > DURATION) { beam.style.opacity = "0"; clearLit(); return; }
      const p = t / DURATION;
      const x = p * (gridW + BEAM_W * 2) - BEAM_W;
      beam.style.opacity = "1";
      beam.style.transform = `translate3d(${x}px,0,0)`;
      cards.forEach((c, i) => {
        if (Math.abs(centers[i] - x) < BEAM_W * 0.62) c.classList.add("lit");
        else c.classList.remove("lit");
      });
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      clearLit();
    };
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="inicio">

      {/* ── NAV ── */}
      <motion.nav
        className="nav"
        style={{
          backgroundColor: navBg,
          height: navH,
          borderBottomColor: navBorderColor,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
        }}
      >
        <div className="wrap">
          <a href="#inicio" className="brand-mark" aria-label="Lúmina inicio">
            <span className="dot" />
            LÚMINA
          </a>
          <div className="nav-links">
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href="#proyectos" className="nav-link">Proyectos</a>
            <a href="#faqs" className="nav-link">FAQs</a>
            <a href="#contacto" className="nav-link">Contacto</a>
            <a href="https://wa.me/5492214197236" target="_blank" rel="noopener noreferrer" className="nav-cta">
              <MessageCircle aria-hidden="true" /> Escribinos
            </a>
          </div>
          <button
            className="nav-burger"
            type="button"
            aria-label="Ir a contacto"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal>
                <p className="eyebrow hero-kicker">Estudio de desarrollo &amp; comunicación</p>
              </Reveal>
              <motion.h1
                className="display"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                Soluciones<br />
                <span className="accent">digitales</span><br />
                con identidad
              </motion.h1>
              <Reveal delay={0.16}>
                <p className="lead hero-lead">
                  Creamos sitios y plataformas web que ayudan a personas, proyectos y organizaciones a consolidar su presencia digital — desde la estructura hasta la voz.
                </p>
              </Reveal>
              <Reveal delay={0.24} className="hero-actions">
                <a href="#contacto" className="btn btn-primary">
                  Empecemos tu proyecto <ArrowRight className="arrow" aria-hidden="true" />
                </a>
                <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
              </Reveal>
            </div>

            <Reveal delay={0.16} className="hero-visual">
              <div className="orb" aria-hidden="true">
                <div className="orb-halo" />
                <div className="orb-rays" />
                <div className="orb-sweep" ref={sweepRef} />
                <div className="orb-ring r1" />
                <div className="orb-ring r2" />
                <div className="orb-ring r3" />
                <div className="orb-core" />
              </div>
              <div className="hero-cards" aria-hidden="true">
                {chips.map(({ Icon, label, angle, left, top, delay }) => (
                  <div key={label} className="chip-anchor" style={{ left, top }}>
                    <span
                      className="float-chip"
                      data-angle={angle}
                      style={{ animationDelay: delay }}
                    >
                      <span className="ic"><Icon /></span>
                      {label}
                      <span className="chip-fill" aria-hidden="true">
                        <span className="ic"><Icon /></span>
                        {label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="ticker" aria-hidden="true">
          <span className="ticker-label">Desarrollamos</span>
          <div className="ticker-track">
            {tickerItems.map((word, i) => (
              <span className="ticker-item" key={`${word}-${i}`}>{word}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFIESTO ── */}
      <section className="section manifesto" id="somos">
        <div className="wrap">
          <div className="manifesto-inner">
            <Reveal><p className="eyebrow" style={{ marginBottom: 28 }}>Nuestra mirada</p></Reveal>
            <Reveal delay={0.08}>
              <p className="manifesto-statement">
                Creemos que una página web no es una vitrina: es un <em>lienzo</em> para construir el universo de tu proyecto y darlo a conocer.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <blockquote className="manifesto-quote">
                Por eso no ofrecemos soluciones genéricas. Te escuchamos y hacemos realidad tu visión, desde una mirada que combina tecnologías digitales y comunicación estratégica.
              </blockquote>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="manifesto-tag">Traducimos ideas en estructura. Y estructura en experiencia.</p>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="union">
            <svg className="union-svg" viewBox="0 0 520 280" role="img" aria-label="La unión de desarrollo web y comunicación estratégica">
              <circle className="u-circle" cx="195" cy="140" r="125" />
              <circle className="u-circle" cx="325" cy="140" r="125" />
              <clipPath id="lens"><circle cx="195" cy="140" r="125" /></clipPath>
              <g clipPath="url(#lens)"><circle className="u-mid" cx="325" cy="140" r="125" /></g>
              <text className="u-label" x="128" y="146" textAnchor="middle">Desarrollo<tspan x="128" dy="22">web</tspan></text>
              <text className="u-label" x="392" y="146" textAnchor="middle">Comunicación<tspan x="392" dy="22">estratégica</tspan></text>
              <text className="u-center" x="260" y="144" textAnchor="middle">Lúmina</text>
            </svg>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="section" id="servicios">
        <div className="wrap">
          <div className="sec-head center">
            <Reveal><p className="eyebrow">Qué hacemos</p></Reveal>
            <Reveal delay={0.08}><h2 className="h-sec">Un servicio integral, de punta a punta</h2></Reveal>
            <Reveal delay={0.16}><p className="lead">Diseñado para potenciar tu presencia digital sin paquetes enlatados ni plantillas genéricas.</p></Reveal>
          </div>

          <div className="svc-grid" ref={svcGridRef}>
            {services.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                className="svc"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="svc-num">{String(idx + 1).padStart(2, "0")}</span>
                <span className="svc-ic"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
            <div className="svc-beam" ref={beamRef} aria-hidden="true" />
          </div>

          <Reveal className="svc-cta-wrap">
            <a href="#contacto" className="btn btn-primary">
              Agendemos un encuentro <ArrowRight className="arrow" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section className="section nosotros" id="nosotros">
        <div className="wrap">
          <div className="nosotros-grid">
            <div className="nosotros-copy">
              <Reveal><p className="eyebrow">La unión de dos miradas</p></Reveal>
              <Reveal delay={0.08}><h2 className="h-sec">Lúmina nació de una alianza: la nuestra.</h2></Reveal>
              <Reveal delay={0.12}><p className="nm-sub">Somos Francisco y Rosario — pareja y también equipo.</p></Reveal>
              <Reveal delay={0.16}>
                <p className="body">Decidimos combinar lo que sabemos hacer con lo que creemos necesario para brindar un servicio integral: unir desarrollo web con comunicación estratégica.</p>
                <p className="body" style={{ marginTop: 18 }}>Fran piensa en estructura, código, accesibilidad y experiencia de usuario. Ro, en narrativa, identidad de marca, tono y posicionamiento. Desde esta base, diseñamos sitios que funcionan, pero sobre todo que comunican con la voz de quienes los habitan.</p>
              </Reveal>
              <Reveal delay={0.24} className="nm-names">
                <div className="nm-name">Desarrollo &amp; UX<b>Francisco</b></div>
                <div className="nm-name">Estrategia &amp; Narrativa<b>Rosario</b></div>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <div className="portrait-frame">
                <Image
                  src="/foto_3.jpg"
                  alt="Francisco y Rosario, equipo de Lúmina"
                  width={760}
                  height={950}
                  sizes="(max-width: 980px) 420px, 40vw"
                />
                <span>Foto · Francisco &amp; Rosario</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section className="section" id="proyectos">
        <div className="wrap">
          <div className="sec-head">
            <Reveal><p className="eyebrow">Proyectos seleccionados</p></Reveal>
            <Reveal delay={0.08}><h2 className="h-sec">Trabajos donde forma y fondo se encuentran</h2></Reveal>
          </div>
          <div className="proj-grid">
            <Reveal className="proj">
              <div className="ph ph-light"><span className="ph-tag">Captura del proyecto 1</span></div>
              <div className="proj-body">
                <div className="proj-meta">
                  <span className="tag">Sitio institucional</span>
                  <span className="tag">Identidad</span>
                </div>
                <h3>Nombre del proyecto</h3>
                <p>Una línea sobre el desafío y el resultado. Reemplazá con un caso real.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="proj">
              <div className="ph ph-light"><span className="ph-tag">Captura del proyecto 2</span></div>
              <div className="proj-body">
                <div className="proj-meta">
                  <span className="tag">Tienda online</span>
                  <span className="tag">UX Writing</span>
                </div>
                <h3>Nombre del proyecto</h3>
                <p>Una línea sobre el desafío y el resultado. Reemplazá con un caso real.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="section faq" id="faqs">
        <div className="wrap">
          <div className="sec-head center">
            <Reveal><p className="eyebrow">Preguntas frecuentes</p></Reveal>
            <Reveal delay={0.08}><h2 className="h-sec">Lo que solés querer saber</h2></Reveal>
          </div>
          <div className="faq-list">
            {faqs.map(({ question, answer }, idx) => {
              const isOpen = openFaq === idx;
              return (
                <Reveal key={question} delay={Math.min(idx * 0.03, 0.18)} className={`faq-item${isOpen ? " open" : ""}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{question}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="faq-a-inner">{answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section className="section" id="contacto">
        <div className="wrap">
          <Reveal className="contact-card">
            <div className="contact-left">
              <div>
                <h2>¿Estás listo?</h2>
                <p className="cl-sub">Trabajemos juntos tu proyecto.</p>
                <p className="cl-body">Contanos tu idea. Nos ponemos en contacto para conocerte, entender tu proyecto y armar una propuesta a medida.</p>
              </div>
              <div className="contact-channels">
                <a href="https://wa.me/5492214197236" target="_blank" rel="noopener noreferrer" className="contact-channel">
                  <span className="cc-ic"><MessageCircle aria-hidden="true" /></span>
                  +54 9 221 419 7236
                </a>
                <a href="https://www.instagram.com/somoslumina" target="_blank" rel="noopener noreferrer" className="contact-channel">
                  <span className="cc-ic"><Instagram aria-hidden="true" /></span>
                  @somoslumina
                </a>
              </div>
            </div>
            <div className="contact-right">
              <form onSubmit={handleSubmit} noValidate>
                {[
                  { label: "Nombre completo",      name: "nombre",   type: "text",  placeholder: "Tu nombre" },
                  { label: "Correo electrónico",   name: "email",    type: "email", placeholder: "hola@tucorreo.com" },
                  { label: "Teléfono de contacto", name: "telefono", type: "tel",   placeholder: "+54 9 ..." },
                ].map(({ label, name, type, placeholder }) => (
                  <div className="field" key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input
                      id={name} name={name} type={type} placeholder={placeholder}
                      required value={formData[name]} onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="field">
                  <label htmlFor="mensaje">Contanos tu idea</label>
                  <textarea
                    id="mensaje" name="mensaje" placeholder="¿Qué proyecto tenés en mente?"
                    required value={formData.mensaje} onChange={handleChange}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Enviando..." : <><span>Enviar mensaje</span> <Send className="arrow" aria-hidden="true" /></>}
                </motion.button>
                {status === "success" && (
                  <motion.p
                    className="form-note success"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  >
                    Gracias. Tu mensaje fue enviado. Te respondemos a la brevedad.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    className="form-note error"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  >
                    No pudimos enviar el mensaje. Revisá los datos e intentá nuevamente.
                  </motion.p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
