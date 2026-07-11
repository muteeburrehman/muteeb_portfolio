import { useEffect } from 'react'
import { About } from '../components/About'
import { ContactCTA } from '../components/ContactCTA'
import { Hero } from '../components/Hero'
import { Industries } from '../components/Industries'
import { OurValues } from '../components/OurValues'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'

const HOME_TITLE = 'MuteebLabs | Custom Software, Software Testing & AI'
const HOME_DESCRIPTION =
  'MuteebLabs builds production software for niche operations — agribusiness, contests, inventory, and agency workflows — with QA and AI automation when you need it.'

export function HomePage() {
  useEffect(() => {
    document.title = HOME_TITLE
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', HOME_DESCRIPTION)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'MuteebLabs — Custom Software Development')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Production software for niche operations. MuteebLabs — Albuquerque.',
      )
    }
  }, [])

  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <Projects />
      <OurValues />
      <About />
      <ContactCTA />
    </>
  )
}
