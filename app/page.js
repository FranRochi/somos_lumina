"use client";

import { motion } from "framer-motion";
import CarouselWithLema from "@/components/CarouselWithLema";
import Circulos from "@/components/Circulos";
import { MessageCircle, Globe, Wrench, ServerCog, LineChart, Quote, PenTool } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      try {
        await fetch("https://formsubmit.co/ajax/lumina@somoslumina.com.ar", {
          method: "POST",
          body: formData,
        });

        form.reset();
        successMessage.classList.remove("hidden");
      } catch (error) {
        console.error("Error al enviar:", error);
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      {/* HEADER */}
      <header className="bg-primary text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">LÚMINA</h1>
        <nav className="space-x-6">
          <a href="#somos" className="hover:underline">Somos Lúmina</a>
          <a href="#proyectos" className="hover:underline">Proyectos</a>
          <a href="#contacto" className="hover:underline">Contactanos</a>
        </nav>
      </header>

      {/* INICIO – Carrusel + lema + franja */}
      <section id="inicio" className="relative w-full">
        <CarouselWithLema />
        <div className="bg-primary text-white text-center py-3 text-lg font-medium -mt-1">
          soluciones digitales que hablan de vos
        </div>
      </section>

      {/* SOMOS LÚMINA */}
      <section id="somos" className="py-24 px-4 max-w-6xl mx-auto">
        <div className="flex-1 text-left">
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">SOMOS LÚMINA</h3>
          <p className="text-base md:text-lg text-foreground mb-4">
            Creemos que <span className="font-semibold text-secondary">una página web no es una vitrina</span>: es un lienzo para construir el <span className="font-semibold text-secondary">universo</span> de tu proyecto y darlo a conocer.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            Desarrollamos sitios que representen a quienes los habitan y comuniquen con su voz.
          </p>
          <p className="text-base md:text-lg text-foreground mb-12">
            Acompañamos a personas, proyectos y organizaciones a consolidar su presencia digital.
          </p>
          <p className="text-base md:text-lg font-semibold text-foreground mb-12">
            Traducimos ideas en estructura.<br />Y estructura en experiencia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="flex-1 space-y-4">
            <h4 className="text-2xl font-bold text-secondary mb-2">La unión de dos miradas</h4>
            <p className="text-foreground/90">
              <strong>Lúmina nació de una alianza: la nuestra.</strong>
            </p>
            <p className="text-foreground/90">
              Somos una pareja y también equipo. Y decidimos combinar lo que sabemos hacer con lo que creemos necesario: unir desarrollo web con comunicación estratégica.
            </p>
            <p className="text-foreground/90">
              Uno de nosotros piensa la estructura, código, accesibilidad y experiencia de usuario. La otra en narrativa, identidad, tono y posicionamiento.
            </p>
            <p className="text-foreground/90">
              Desde ahí, diseñamos sitios que funcionen, pero sobre todo que comuniquen con la voz de quienes los habitan.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Circulos />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-4 max-w-6xl mx-auto text-center">
        <h3 className="text-4xl font-extrabold text-primary mb-12">Servicios</h3>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 text-left">
          {[
            { icon: <Globe className="text-primary w-6 h-6 mb-2" />, title: "Sitios web a medida", desc: "Landing Pages, Portfolios, Blogs y sitios para eventos." },
            { icon: <Wrench className="text-primary w-6 h-6 mb-2" />, title: "Mantenimiento y actualización", desc: "Revisamos y actualizamos tu web para que todo funcione perfecto." },
            { icon: <ServerCog className="text-primary w-6 h-6 mb-2" />, title: "Implementación técnica", desc: "Configuración de dominios, servidores y SEO básico." },
            { icon: <LineChart className="text-primary w-6 h-6 mb-2" />, title: "Estrategia Digital", desc: "Análisis y planificación de tu presencia digital." },
            { icon: <Quote className="text-primary w-6 h-6 mb-2" />, title: "Narrativa de marca", desc: "Definimos el mensaje y la historia de tu proyecto." },
            { icon: <PenTool className="text-primary w-6 h-6 mb-2" />, title: "Redacción creativa y UX Writing", desc: "Textos que conectan con tu audiencia con claridad e identidad." },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-secondary/5 rounded-xl border border-secondary/20 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              {s.icon}
              <h4 className="text-lg font-bold text-secondary mb-2">{s.title}</h4>
              <p className="text-sm text-foreground/80">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-primary font-medium text-lg border border-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition"
          >
            Agendemos encuentro
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-20 px-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold text-primary mb-6">Contacto</h3>

        <form id="contact-form" className="space-y-6">
          <div>
            <label className="block text-foreground mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              required
              className="w-full p-3 rounded bg-background border border-secondary/30"
            />
          </div>
          <div>
            <label className="block text-foreground mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded bg-background border border-secondary/30"
            />
          </div>
          <div>
            <label className="block text-foreground mb-1">Mensaje</label>
            <textarea
              name="mensaje"
              rows="4"
              required
              className="w-full p-3 rounded bg-background border border-secondary/30"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-3 px-6 rounded hover:bg-secondary transition"
          >
            Enviar consulta
          </button>
        </form>

        <div id="success-message" className="hidden text-green-600 font-semibold mt-6 text-center">
          ¡Gracias! Tu mensaje fue enviado con éxito.
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://wa.me/5492214197236?text=Hola%20Lúmina,%20quiero%20una%20web!"
            className="flex items-center gap-2 text-white bg-[#25D366] px-5 py-3 rounded-full shadow-lg hover:bg-[#1ebe5b] transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5" />
            Escribinos por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-foreground/50 border-t border-secondary mt-10">
        <p>© {new Date().getFullYear()} Lúmina - Francisco & Rosario</p>
        <p className="mt-1">Mail: <a href="mailto:lumina@somoslumina.com.ar" className="underline">lumina@somoslumina.com.ar</a></p>
        <p className="mt-2">Diseño y desarrollo con <span className="text-accent">❤</span> en Argentina</p>
      </footer>
    </main>
  );
}
