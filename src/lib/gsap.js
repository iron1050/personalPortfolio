import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP)

// Sensible global defaults. No fps cap: gsap.ticker runs on
// requestAnimationFrame, so it follows the display (60/120/240Hz).
gsap.defaults({ ease: 'power3.out', duration: 1 })
gsap.ticker.lagSmoothing(0)

export const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = () =>
  window.matchMedia('(hover: none), (pointer: coarse)').matches

export { gsap, ScrollTrigger, SplitText, useGSAP }
