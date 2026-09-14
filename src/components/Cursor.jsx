import { useRef } from 'react'
import { gsap, useGSAP, isTouch } from '../lib/gsap'

/**
 * Custom cursor. Two independently-eased layers (a tight dot and a
 * lazy ring) driven by gsap.quickTo, so movement is interpolated on the
 * ticker with no React re-renders and no layout work.
 *
 * Hover behaviour is opted in via data attributes:
 *   data-cursor="hover"   -> ring grows
 *   data-cursor="view"    -> ring becomes a filled disc with a label
 *   data-cursor="hide"    -> cursor fades out
 */
export default function Cursor() {
  const root = useRef(null)
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useGSAP(
    () => {
      if (isTouch()) return

      gsap.set([ring.current, dot.current], { x: -100, y: -100 })
      const rx = gsap.quickTo(ring.current, 'x', { duration: 0.4, ease: 'power3' })
      const ry = gsap.quickTo(ring.current, 'y', { duration: 0.4, ease: 'power3' })
      const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1, ease: 'power3' })
      const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1, ease: 'power3' })

      let first = true
      const onMove = (e) => {
        if (first) {
          gsap.set([ring.current, dot.current], { x: e.clientX, y: e.clientY })
          first = false
        }
        rx(e.clientX)
        ry(e.clientY)
        dx(e.clientX)
        dy(e.clientY)
      }

      const setState = (state) => {
        const r = ring.current
        const l = label.current
        switch (state) {
          case 'hover':
            gsap.to(r, { scale: 1.6, backgroundColor: 'rgba(255,255,255,0)', duration: 0.4 })
            gsap.to(l, { opacity: 0, scale: 0.5, duration: 0.2 })
            gsap.to(dot.current, { scale: 0, duration: 0.3 })
            break
          case 'view':
            gsap.to(r, { scale: 2.4, backgroundColor: 'rgba(255,255,255,1)', duration: 0.4 })
            gsap.to(l, { opacity: 1, scale: 0.42, duration: 0.3 })
            gsap.to(dot.current, { scale: 0, duration: 0.3 })
            break
          case 'hide':
            gsap.to(root.current, { opacity: 0, duration: 0.3 })
            break
          default:
            gsap.to(root.current, { opacity: 1, duration: 0.3 })
            gsap.to(r, { scale: 1, backgroundColor: 'rgba(255,255,255,0)', duration: 0.4 })
            gsap.to(l, { opacity: 0, scale: 0.5, duration: 0.2 })
            gsap.to(dot.current, { scale: 1, duration: 0.3 })
        }
      }

      const SEL = '[data-cursor], a, button'
      const onOver = (e) => {
        const t = e.target.closest(SEL)
        if (!t) return
        const type = t.dataset.cursor || 'hover'
        if (type === 'view') label.current.textContent = t.dataset.cursorLabel || 'View'
        setState(type)
      }
      const onOut = (e) => {
        const t = e.target.closest(SEL)
        if (!t) return
        if (e.relatedTarget?.closest?.(SEL) === t) return
        setState('default')
      }
      const onDown = () => gsap.to(ring.current, { scale: 0.8, duration: 0.15 })
      const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.3 })
      const onLeave = () => gsap.to(root.current, { opacity: 0, duration: 0.3 })
      const onEnter = () => gsap.to(root.current, { opacity: 1, duration: 0.3 })

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('mouseover', onOver)
      document.addEventListener('mouseout', onOut)
      document.addEventListener('pointerdown', onDown)
      document.addEventListener('pointerup', onUp)
      document.documentElement.addEventListener('mouseleave', onLeave)
      document.documentElement.addEventListener('mouseenter', onEnter)
      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('mouseover', onOver)
        document.removeEventListener('mouseout', onOut)
        document.removeEventListener('pointerdown', onDown)
        document.removeEventListener('pointerup', onUp)
        document.documentElement.removeEventListener('mouseleave', onLeave)
        document.documentElement.removeEventListener('mouseenter', onEnter)
      }
    },
    { scope: root },
  )

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span className="cursor__label" ref={label}>
          View
        </span>
      </div>
      <div className="cursor__dot" ref={dot} />
    </div>
  )
}
