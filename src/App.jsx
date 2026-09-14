import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll, destroySmoothScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Services from './components/Services'
import Experience from './components/Experience'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  useEffect(() => {
    if (ready) ScrollTrigger.refresh()
  }, [ready])

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
