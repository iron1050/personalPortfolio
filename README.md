# Personal Portfolio

Dark, editorial single-page portfolio built with **Vite + React**, **GSAP** (ScrollTrigger, SplitText, ScrambleText), **Lenis** smooth scroll and a small **Three.js** shader scene.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Make it yours

Everything on the page reads from [`src/data.js`](src/data.js): name, role, location, email, socials, about copy, stats, projects, services and experience. Edit that file first.

- **Project images**: each project has a `gradient` used as its hover preview. Swap it for an `<img>` in `src/components/Work.jsx` when you have real screenshots.
- **Portrait**: the sticky block in `src/components/About.jsx` is a gradient placeholder. Drop an image in `.about__media`.
- **Colours / fonts**: CSS variables at the top of `src/styles/global.css`. Fonts are loaded from Google Fonts in `index.html` (Manrope + Instrument Serif).

## Performance notes

- One `requestAnimationFrame` loop. Lenis, every GSAP tween and the Three.js render all run on `gsap.ticker`, which follows the display refresh rate (60 / 120 / 240 Hz). There is no fps cap.
- Only `transform` and `opacity` are animated. Pointer-driven motion (cursor, magnetic buttons, project preview, card glow) uses `gsap.quickTo`, so there are no React re-renders on mouse move.
- The Three.js scene is a single displaced icosahedron, a wireframe shell and a 320-point cloud. Pixel ratio is capped at 1.5, it renders only while the hero is on screen, and it lives in its own lazy chunk that loads behind the preloader.
- Grain is a static SVG noise tile moved with a stepped `transform`, not a live filter.
- `prefers-reduced-motion` disables the looping CSS animations and the blob intro.

## Structure

```
src/
  data.js               content
  lib/gsap.js           plugin registration + helpers
  lib/scroll.js         Lenis <-> ScrollTrigger bridge
  components/
    Preloader.jsx       counter + curtain
    Cursor.jsx          custom cursor (data-cursor="hover|view|hide")
    Magnetic.jsx        magnetic wrapper
    Nav.jsx             fixed nav, hide on scroll, mobile menu
    Hero.jsx            SplitText intro + parallax
    HeroScene.jsx       Three.js blob
    Marquee.jsx         velocity-reactive marquee
    About.jsx           scroll-scrubbed text, count-ups
    Work.jsx            project list with cursor-following preview
    Services.jsx        pinned horizontal scroll
    Experience.jsx      timeline
    Contact.jsx         footer, scramble-text email
```
