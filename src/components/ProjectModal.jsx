import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/scroll'

/**
 * Project detail modal. `project` is the item to show, or null to close.
 * The last shown project is kept in local state so the close animation
 * still has content to animate out.
 */
export default function ProjectModal({ project, onClose }) {
  const root = useRef(null)
  const panel = useRef(null)
  const backdrop = useRef(null)
  const closeBtn = useRef(null)
  const open = Boolean(project)

  // Keep the last project mounted while the close animation plays
  const [shown, setShown] = useState(null)
  if (project && project !== shown) setShown(project)

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useGSAP(
    () => {
      const el = root.current
      if (!shown) return
      const items = panel.current.querySelectorAll('[data-reveal]')

      if (open) {
        getLenis()?.stop()
        el.classList.add('is-open')
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .fromTo(
            panel.current,
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9 },
            '<',
          )
          .fromTo(
            panel.current.querySelector('.modal__cover-img'),
            { scale: 1.25 },
            { scale: 1.08, duration: 1.4 },
            '<',
          )
          .fromTo(items, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, '-=0.7')
          .add(() => closeBtn.current?.focus({ preventScroll: true }), '-=0.6')
      } else if (el.classList.contains('is-open')) {
        gsap
          .timeline({
            defaults: { ease: 'power3.in' },
            onComplete: () => {
              el.classList.remove('is-open')
              getLenis()?.start()
            },
          })
          .to(panel.current, { opacity: 0, y: 30, scale: 0.97, duration: 0.35 })
          .to(backdrop.current, { opacity: 0, duration: 0.35 }, '<0.05')
      }
    },
    { scope: root, dependencies: [open, shown] },
  )

  return (
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="modal__backdrop" ref={backdrop} onClick={onClose} data-cursor="hover" />
      <div className="modal__panel" ref={panel} data-lenis-prevent>
        {shown && (
          <>
            <div className="modal__cover">
              <div className="modal__cover-img" style={{ background: shown.gradient }} />
              <button className="modal__close" ref={closeBtn} onClick={onClose} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__head" data-reveal>
                <div>
                  <h3 className="modal__title">{shown.title}</h3>
                  <p className="modal__cat">{shown.category}</p>
                </div>
              </div>

              <dl className="modal__meta" data-reveal>
                <div>
                  <dt className="mono">Role</dt>
                  <dd>{shown.role}</dd>
                </div>
                <div>
                  <dt className="mono">Year</dt>
                  <dd>{shown.year}</dd>
                </div>
                <div>
                  <dt className="mono">Status</dt>
                  <dd>{shown.link ? 'Live' : 'Not deployed yet'}</dd>
                </div>
              </dl>

              <p className="modal__desc" data-reveal>
                {shown.description}
              </p>

              <div className="modal__tags" data-reveal>
                {shown.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="modal__actions" data-reveal>
                {shown.link ? (
                  <a className="modal__link" href={shown.link} target="_blank" rel="noreferrer">
                    Visit project
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <span className="modal__soon">Link coming soon</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
