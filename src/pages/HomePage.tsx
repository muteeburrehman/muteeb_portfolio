import { useEffect } from 'react'
import { About } from '../components/About'
import { ContactCTA } from '../components/ContactCTA'
import { Hero } from '../components/Hero'
import { Industries } from '../components/Industries'
import { OurValues } from '../components/OurValues'
import { Process } from '../components/Process'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'
import { SocialProofBar } from '../components/SocialProofBar'

const HOME_TITLE = 'MuteebLabs | Custom Software Company'
const HOME_DESCRIPTION =
  'MuteebLabs is a custom software company — contest platforms, inventory systems, agribusiness software, CJIS-minded booking, agency workflows, QA, and AI automation.'

export function HomePage() {
  useEffect(() => {
    document.title = HOME_TITLE
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', HOME_DESCRIPTION)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'MuteebLabs — Custom Software Company')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Production software across motorsport, inventory, agribusiness, compliance booking, and more. MuteebLabs — Albuquerque.',
      )
    }
  }, [])

  return (
    <>
      <Hero />
      <SocialProofBar />
      <Services />
      <Industries />
      <Projects />
      <Process />
      <OurValues />
      <About />
      <ContactCTA />
    </>
  )
}
