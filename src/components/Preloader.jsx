import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/scroll'

export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const num = useRef(null)
  const bar = useRef(null)

  useGSAP(
    () => {
      getLenis()?.stop()
      const counter = { v: 0 }
      const words = root.current.querySelectorAll('.preloader__word span')

      // Exit timeline is built up-front (paused) so it lives in this
      // context and is reverted on unmount.
      const exit = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            getLenis()?.start()
            root.current.style.display = 'none'
            onComplete?.()
          },
        })
        .to(words, { yPercent: -110, duration: 0.6, stagger: 0.05, ease: 'power3.in' })
        .to(num.current, { yPercent: 40, opacity: 0, duration: 0.6 }, '<')
        .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.2')

      gsap
        .timeline({
          // wait for webfonts so the hero SplitText measures the real glyphs
          onComplete: () => (document.fonts?.ready ?? Promise.resolve()).then(() => exit.play()),
        })
        .from(words, { yPercent: 110, duration: 0.9, stagger: 0.08, ease: 'power4.out' })
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            snap: { v: 1 },
            onUpdate: () => {
              num.current.firstChild.textContent = String(counter.v).padStart(3, '0')
            },
          },
          '<',
        )
        .to(bar.current, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, '<')
    },
    { scope: root },
  )

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div>
        <div className="preloader__word mono">
          <span>Portfolio</span>
        </div>
        <div className="preloader__word mono">
          <span>©2026</span>
        </div>
      </div>
      <div className="preloader__count" ref={num}>
        000<em>%</em>
      </div>
      <div className="preloader__bar" ref={bar} />
    </div>
  )
}
