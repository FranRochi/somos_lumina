# Lúmina - Web Agency Landing Page

Sitio web de **Lúmina**, agencia de desarrollo web y comunicación estratégica fundada por Francisco y Rosario (pareja y equipo). Buenos Aires, Argentina.

## Stack

- **Next.js 14** (App Router) + React 18
- **Tailwind CSS v3** (JIT)
- **Framer Motion** (`framer-motion`) para animaciones
- **lucide-react** para íconos de servicios
- **react-icons/fa** para WhatsApp e Instagram
- **nodemailer** para el formulario de contacto (`/api/contact`)

## Fuentes personalizadas

- **Heavitas** (`/public/fonts/Heavitas.ttf`) — display, logo, títulos grandes. Clase Tailwind: `font-heavitas`
- **Nunito** (`/public/fonts/Nunito-Italic-VariableFont_wght.ttf`) — body, italic variable. Clase Tailwind: `font-nunito`

## Paleta de colores (NO cambiar)

```
--primary:  #11009e   → índigo profundo
--secondary: #5047e4  → violeta vibrante
--accent:   #deb9e2   → lavanda/rosa suave
Hero gradient: from-[#11009e] via-[#4a00b4] to-[#e060c8]
Highlight texto: #ffe3f5
```

## Estructura de archivos importantes

```
app/
  page.js          ← página principal (todo en un archivo, "use client")
  layout.js        ← layout raíz
  globals.css      ← variables CSS, fuentes, animaciones base
  api/contact/     ← endpoint del formulario de contacto
components/
  Circulos.jsx     ← animación de dos círculos que se fusionan (framer-motion)
  FraseCarrusel.jsx ← ticker animado "Desarrollamos: landing pages | one pages | ..."
  Footer.jsx       ← footer con links, contacto, redes sociales
public/
  libro.jpg        ← imagen 3D libro/smartphone (hero)
  lampara.jpg      ← imagen 3D lámpara (hero)
  cohete.jpg       ← imagen 3D cohete (hero)
  foto_3.jpg       ← foto de Francisco y Rosario (sección nosotros)
  img_3D.jpg       ← imagen 3D alternativa (disponible)
  fonts/           ← Heavitas.ttf, Nunito...
```

## Arquitectura de la página (secciones)

| ID              | Descripción                              | Bg                 |
|-----------------|------------------------------------------|--------------------|
| `#inicio`       | Hero full-viewport, split text/imágenes | gradient indigo-pink |
| `#somos`        | Manifiesto centrado + animación Circulos | `#f8f5ff` lavanda  |
| `#servicios`    | Grid 3 cols con íconos lucide-react      | blanco             |
| `#union-miradas`| Nosotros: texto + foto con glow          | `#11009e` índigo   |
| `#faqs`         | Acordeón animado (framer-motion)         | `#f8f5ff` lavanda  |
| `#contacto`     | Panel dividido: dark left + form right   | blanco / índigo    |

## Componentes que NO se deben modificar sin avisar

- `Circulos.jsx` — animación compleja sincronizada, fácil de romper
- `FraseCarrusel.jsx` — carrusel simple, funciona bien
- `Footer.jsx` — ya estilizado con la paleta correcta

## Decisiones de diseño tomadas (junio 2026)

- **Navbar**: fija, transparente sobre hero, se vuelve sólida al scroll usando `useScroll` + `useTransform` de framer-motion (NO usar `window.addEventListener('scroll')`)
- **Hero**: `min-h-[100dvh]` (no `h-screen` — evita el bug de Safari iOS con la barra de direcciones)
- **Imágenes del hero**: posicionadas con `style={{ ... }}` inline con valores en `%` y rotaciones, dentro de un contenedor `relative h-[440px]`. Ocultas en mobile (`hidden lg:block`)
- **FAQ**: acordeón custom con `AnimatePresence` en lugar de `<details>` nativo
- **Redes sociales**: solo en navbar (botón WhatsApp) y footer. El widget flotante fue eliminado

## Variables CSS disponibles en Tailwind

```js
colors: {
  background: "var(--background)",  // #ffffff
  foreground: "var(--foreground)",  // #000000
  primary: "var(--primary)",        // #11009e
  secondary: "var(--secondary)",    // #5047e4
  accent: "var(--accent)",          // #deb9e2
}
```

## API de contacto

`POST /api/contact` espera JSON: `{ nombre, email, telefono, mensaje }`. Usa nodemailer. El estado del form se maneja con `useState` en `page.js`.

## Para correr el proyecto

```bash
npm run dev   # http://localhost:3000
```
