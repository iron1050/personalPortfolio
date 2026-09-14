import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { about, profile } from '../data'

export default function About() {
  const root = useRef(null)
  const intro = useRef(null)

  useGSAP(
    () => {
      // Word-by-word reveal tied to scroll position
      const split = SplitText.create(intro.current, { type: 'words', wordsClass: 'word' })
      gsap.to(split.words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: {
          trigger: intro.current,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      })

      // Body + stats
      gsap.from('.about__body, .about__stat', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about__body', start: 'top 85%' },
      })

      // Count-up numbers
      gsap.utils.toArray('.about__stat strong').forEach((el) => {
        const n = el.querySelector('b')
        const to = Number(n.dataset.value)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: 'power3.out',
          snap: { v: 1 },
          onUpdate: () => (n.textContent = obj.v),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      // Parallax on the media block
      gsap.fromTo(
        '.about__media-inner',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.about__media', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      return () => split.revert()
    },
    { scope: root },
  )

  return (
    <section className="about" id="about" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2>About</h2>
          <span className="mono">01</span>
        </div>
        <div className="about__grid">
          <div>
            <p className="about__intro" ref={intro}>
              {about.intro}
            </p>
            <p className="about__body">{about.body}</p>
            <div className="about__stats">
              {about.stats.map((s) => (
                <div className="about__stat" key={s.label}>
                  <strong>
                    <b data-value={s.value} style={{ fontWeight: 'inherit' }}>
                      0
                    </b>
                    <em>{s.suffix}</em>
                  </strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about__media" data-cursor="view" data-cursor-label="Hey">
            <div className="about__media-inner" />
            <div className="about__media-label mono">
              {profile.first} · {profile.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
