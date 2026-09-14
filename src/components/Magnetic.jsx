import { useRef } from 'react'
import { gsap, useGSAP, isTouch } from '../lib/gsap'

/**
 * Wraps a single child and makes it gently follow the pointer while
 * hovered, snapping back with an elastic ease on leave.
 */
export default function Magnetic({ children, strength = 0.35, className, style }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (isTouch()) return
      const el = ref.current
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })

      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        xTo(dx * strength)
        yTo(dy * strength)
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' })
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', ...style }}>
      {children}
    </div>
  )
}
