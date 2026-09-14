import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { services } from '../data'

/**
 * Pinned horizontal scroll on desktop, plain vertical stack on mobile.
 * Cards get a pointer-tracked glow via quickTo.
 */
export default function Services() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 901px)', () => {
        const getAmount = () => track.current.scrollWidth - window.innerWidth
        gsap.to(track.current, {
          x: () => -getAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + getAmount(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.from('.card', {
          x: 80,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        })
      })

      mm.add('(max-width: 900px)', () => {
        gsap.from('.card', {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: track.current, start: 'top 80%' },
        })
      })

      // Glow follows the pointer inside each card
      const cards = gsap.utils.toArray('.card')
      const handlers = cards.map((card) => {
        const glow = card.querySelector('.card__glow')
        gsap.set(glow, { xPercent: -50, yPercent: -50 })
        const xTo = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power3' })
        const yTo = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power3' })
        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          xTo(e.clientX - r.left)
          yTo(e.clientY - r.top)
        }
        card.addEventListener('pointermove', onMove, { passive: true })
        return () => card.removeEventListener('pointermove', onMove)
      })
      return () => handlers.forEach((h) => h())
    },
    { scope: root },
  )

  return (
    <section className="services" id="services" ref={root}>
      <div className="services__pin">
        <div className="container services__head">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2>What I do</h2>
            <span className="mono">03</span>
          </div>
        </div>

        <div className="services__track" ref={track}>
          <div className="services__intro">
            <h3>
              Craft that <span className="serif accent">performs.</span>
            </h3>
            <p>
              Every interaction budgeted to the frame. Scroll sideways — or just keep scrolling.
            </p>
          </div>

          {services.map((s) => (
            <article className="card" key={s.index} data-cursor="hover">
              <div className="card__glow" />
              <span className="card__idx mono">{s.index}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                <div className="card__tools">
                  {s.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
