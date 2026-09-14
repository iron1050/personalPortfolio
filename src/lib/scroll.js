import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis = null
let tick = null

export function initSmoothScroll() {
  if (lenis) return lenis
  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  // Drive Lenis from GSAP's ticker so there is exactly one rAF loop.
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  if (import.meta.env.DEV) window.__lenis = lenis
  return lenis
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}

export const getLenis = () => lenis

export function scrollTo(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4, ...opts })
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else document.querySelector(target)?.scrollIntoView()
}
