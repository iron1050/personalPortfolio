import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

const items = ['React', 'Java', 'Python', 'GSAP', 'Three.js', 'Figma']

function Star() {
  return (
    <svg className="star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l2.4 8.6L24 12l-9.6 3.4L12 24l-2.4-8.6L0 12l9.6-3.4z" />
    </svg>
  )
}

/**
 * Infinite marquee. Direction and speed react to scroll velocity, so it
 * speeds up and flips when you scroll fast (a classic Awwwards touch).
 */
export default function Marquee() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const loop = gsap.to(track.current, {
        xPercent: -50,
        ease: 'none',
        duration: 24,
        repeat: -1,
      })

      const ts = { v: 1 }
      const speed = gsap.quickTo(ts, 'v', {
        duration: 0.6,
        ease: 'power2',
        onUpdate: () => loop.timeScale(ts.v),
      })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 250)
          speed(v < 0 ? Math.min(-1, v) : Math.max(1, v))
        },
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      })
    },
    { scope: root },
  )

  const copy = (k) => (
    <div className="marquee__item" key={k} aria-hidden={k > 0}>
      {items.map((it, i) => (
        <span key={it} style={{ display: 'inline-flex', alignItems: 'center', gap: 40 }}>
          <span className={i % 2 ? 'serif' : ''}>{it}</span>
          <Star />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" ref={root}>
      <div className="marquee__track" ref={track}>
        {copy(0)}
        {copy(1)}
      </div>
    </div>
  )
}
