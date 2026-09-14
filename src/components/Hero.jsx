import { lazy, Suspense, useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { profile } from '../data'

// three.js lives in its own chunk and streams in behind the preloader
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero({ ready }) {
  const root = useRef(null)
  const title = useRef(null)

  useGSAP(
    () => {
      if (!ready) return

      const split = SplitText.create(title.current, {
        type: 'lines,chars',
        mask: 'lines',
        linesClass: 'line',
      })
      const eyebrow = root.current.querySelector('.hero__eyebrow')
      const sub = root.current.querySelector('.hero__sub')
      const scroll = root.current.querySelector('.hero__scroll')
      const rule = root.current.querySelector('.hero__row')

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(split.chars, {
        yPercent: 120,
        rotate: 6,
        duration: 1.4,
        stagger: { each: 0.028, from: 'start' },
      })
        .from(eyebrow, { opacity: 0, y: 12, duration: 0.8 }, '-=1')
        .from(rule, { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, '-=0.9')
        .from([sub, scroll], { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, '-=1')

      // scroll-out parallax on the copy (transform/opacity only)
      gsap.to(root.current.querySelector('.hero__inner'), {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => split.revert()
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section className="hero" id="top" ref={root}>
      <Suspense fallback={null}>
        <HeroScene ready={ready} />
      </Suspense>
      <div className="hero__inner container">
        <div className="hero__eyebrow mono" style={{ opacity: ready ? undefined : 0 }}>
          <span className="dot" />
          <span>{profile.available ? profile.availableLabel : 'Currently booked'}</span>
          <span>—</span>
          <span>{profile.role}</span>
        </div>

        <h1 className="hero__title" ref={title} style={{ opacity: ready ? 1 : 0 }}>
          {profile.first}
          <br />
          <span className="serif">{profile.last}</span>
        </h1>

        <div className="hero__row" style={{ opacity: ready ? undefined : 0 }}>
          <p className="hero__sub">
            <b>{profile.tagline}</b> {profile.taglineSub}
          </p>
          <div className="hero__scroll mono">
            <span>Scroll</span>
            <i />
          </div>
        </div>
      </div>
    </section>
  )
}
