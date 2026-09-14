import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { scrollTo } from '../lib/scroll'
import { profile } from '../data'
import Magnetic from './Magnetic'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = setInterval(update, 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Nav({ ready }) {
  const nav = useRef(null)
  const menu = useRef(null)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const time = useClock()
  useEffect(() => {
    openRef.current = open
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href, { offset: 0 })
  }

  // Intro + hide-on-scroll-down
  useGSAP(
    () => {
      if (!ready) return
      gsap.fromTo(
        nav.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.4 },
      )
      const show = gsap.quickTo(nav.current, 'yPercent', { duration: 0.5, ease: 'power3' })
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (openRef.current) return
          show(self.direction === 1 && self.scroll() > 120 ? -100 : 0)
        },
      })
    },
    { dependencies: [ready] },
  )

  // Mobile menu
  useGSAP(
    () => {
      const items = menu.current.querySelectorAll('.menu__link span')
      const foot = menu.current.querySelector('.menu__foot')
      if (open) {
        gsap
          .timeline()
          .to(menu.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
          .from(items, { yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'expo.out' }, '-=0.3')
          .from(foot, { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')
      } else {
        gsap.to(menu.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut' })
      }
    },
    { dependencies: [open] },
  )

  return (
    <>
      <header className="nav" ref={nav} style={{ opacity: 0 }}>
        <Magnetic strength={0.2}>
          <a className="nav__logo" href="#top" onClick={(e) => go(e, 0)} data-cursor="hover">
            <i />
            {profile.first} {profile.last}
          </a>
        </Magnetic>

        <nav className="nav__links">
          {links.map((l) => (
            <Magnetic key={l.href} strength={0.25}>
              <a className="nav__link" href={l.href} onClick={(e) => go(e, l.href)}>
                <span>{l.label}</span>
                <span>{l.label}</span>
              </a>
            </Magnetic>
          ))}
        </nav>

        <div className="nav__meta mono">
          <span>{profile.location}</span>
          <span>{time}</span>
        </div>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <i />
          <i />
        </button>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} ref={menu}>
        {links.map((l) => (
          <a key={l.href} className="menu__link" href={l.href} onClick={(e) => go(e, l.href)}>
            <span>{l.label}</span>
          </a>
        ))}
        <div className="menu__foot mono">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </>
  )
}
