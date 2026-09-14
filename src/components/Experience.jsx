import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { experience } from '../data'

export default function Experience() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.to('.exp__line i', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.exp__list',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })
      gsap.utils.toArray('.exp__item').forEach((item) => {
        gsap.from(item, {
          x: 30,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        })
      })
      gsap.from('.exp__title', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root },
  )

  return (
    <section className="exp" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2>Experience</h2>
          <span className="mono">04</span>
        </div>
        <div className="exp__grid">
          <h3 className="exp__title">
            Where I’ve <span className="serif accent">been.</span>
          </h3>
          <ul className="exp__list">
            <div className="exp__line">
              <i />
            </div>
            {experience.map((e) => (
              <li className="exp__item" key={e.period}>
                <span className="mono">{e.period}</span>
                <div>
                  <strong>{e.role}</strong>
                  <span>{e.company}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
