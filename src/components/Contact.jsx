import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { scrollTo } from '../lib/scroll'
import { profile } from '../data'
import Magnetic from './Magnetic'

export default function Contact() {
  const root = useRef(null)
  const big = useRef(null)
  const cta = useRef(null)

  useGSAP(
    () => {
      const split = SplitText.create(big.current, { type: 'lines,words', mask: 'lines' })
      gsap.from(split.words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.3,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: big.current, start: 'top 80%' },
      })
      gsap.from('.contact__cta, .contact__grid > *', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact__cta', start: 'top 90%' },
      })

      // Scramble the e-mail on hover
      const txt = cta.current.querySelector('span')
      const original = txt.textContent
      const onEnter = () =>
        gsap.to(txt, {
          duration: 0.9,
          scrambleText: { text: original, chars: 'lowerCase', speed: 0.5, revealDelay: 0.15 },
        })
      cta.current.addEventListener('pointerenter', onEnter)
      return () => {
        cta.current?.removeEventListener('pointerenter', onEnter)
        split.revert()
      }
    },
    { scope: root },
  )

  return (
    <footer className="contact" id="contact" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2>Contact</h2>
          <span className="mono">05</span>
        </div>

        <h3 className="contact__big" ref={big}>
          Let’s build
          <br />
          something <span className="serif">rare.</span>
        </h3>

        <Magnetic strength={0.3}>
          <a className="contact__cta" href={`mailto:${profile.email}`} ref={cta} data-cursor="hover">
            <span>{profile.email}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </Magnetic>

        <div className="contact__grid">
          <div>
            <div className="mono" style={{ marginBottom: 12 }}>
              Socials
            </div>
            <div className="contact__socials">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: 12 }}>
              Location
            </div>
            <p style={{ color: 'var(--fg)' }}>{profile.location}</p>
            <p>Working worldwide, remote-first.</p>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: 12 }}>
              Status
            </div>
            <p style={{ color: 'var(--fg)' }}>
              {profile.available ? 'Open to new projects' : 'Currently booked'}
            </p>
            <p>Freelance · Full-time</p>
          </div>
        </div>

        <div className="contact__bottom">
          <span>
            © {new Date().getFullYear()} {profile.first} {profile.last}. Built with React, GSAP &
            Three.js.
          </span>
          <Magnetic strength={0.4}>
            <button className="contact__top" onClick={() => scrollTo(0)} aria-label="Back to top">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
