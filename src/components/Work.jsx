import { useRef } from 'react'
import { gsap, useGSAP, isTouch } from '../lib/gsap'
import { projects } from '../data'

function Arrow() {
  return (
    <svg className="work__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

/**
 * Project list. Hovering a row shows a floating preview that trails the
 * pointer (quickTo) and tilts with horizontal velocity.
 */
export default function Work() {
  const root = useRef(null)
  const preview = useRef(null)

  useGSAP(
    () => {
      // Row reveal
      gsap.from('.work__row', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.work__list', start: 'top 85%' },
      })

      if (isTouch()) return

      const p = preview.current
      const imgs = p.querySelectorAll('.work__preview-img')
      gsap.set(p, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 })
      const xTo = gsap.quickTo(p, 'x', { duration: 0.5, ease: 'power3' })
      const yTo = gsap.quickTo(p, 'y', { duration: 0.5, ease: 'power3' })
      const rTo = gsap.quickTo(p, 'rotation', { duration: 0.6, ease: 'power3' })
      let lastX = 0

      const onMove = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
        const vx = e.clientX - lastX
        lastX = e.clientX
        rTo(gsap.utils.clamp(-12, 12, vx * 0.6))
      }
      const onEnter = (e) => {
        const idx = Number(e.currentTarget.dataset.index)
        imgs.forEach((img, i) => img.classList.toggle('is-active', i === idx))
        gsap.to(p, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' })
      }
      const onLeave = () => {
        gsap.to(p, { scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.in' })
        rTo(0)
      }

      const rows = root.current.querySelectorAll('.work__row')
      rows.forEach((r) => {
        r.addEventListener('pointerenter', onEnter)
        r.addEventListener('pointerleave', onLeave)
      })
      root.current.addEventListener('pointermove', onMove, { passive: true })
      return () => {
        rows.forEach((r) => {
          r.removeEventListener('pointerenter', onEnter)
          r.removeEventListener('pointerleave', onLeave)
        })
        root.current?.removeEventListener('pointermove', onMove)
      }
    },
    { scope: root },
  )

  return (
    <section className="work" id="work" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2>Selected work</h2>
          <span className="mono">02 — {String(projects.length).padStart(2, '0')} projects</span>
        </div>

        <ul className="work__list">
          {projects.map((pr, i) => (
            <li key={pr.title}>
              <a className="work__row" href={pr.href} data-index={i} data-cursor="view" data-cursor-label="Open">
                <span className="work__idx mono">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="work__title">{pr.title}</div>
                  <div className="work__tags">
                    {pr.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <span className="work__cat">{pr.category}</span>
                <span className="work__year mono">{pr.year}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="work__preview" ref={preview} aria-hidden="true">
        {projects.map((pr) => (
          <div
            key={pr.title}
            className="work__preview-img"
            data-title={pr.title}
            style={{ background: pr.gradient }}
          />
        ))}
      </div>
    </section>
  )
}
