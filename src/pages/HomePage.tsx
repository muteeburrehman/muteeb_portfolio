import { useEffect } from 'react'
import { About } from '../components/About'
import { Capabilities } from '../components/Capabilities'
import { ContactCTA } from '../components/ContactCTA'
import { FeaturedCaseStudy } from '../components/FeaturedCaseStudy'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'
import { TechTicker } from '../components/TechTicker'

const HOME_TITLE = 'MuteebLabs | Custom Software for Cattle, QA & AI Businesses'
const HOME_DESCRIPTION =
  'We build custom software for livestock operations, SaaS QA testing, and AI automation. Based in Pakistan, serving clients globally. Book a free discovery call.'

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
        'Livestock platforms, QA testing services, and AI automation tools built by MuteebLabs.',
      )
    }
  }, [])

  return (
    <>
      <Hero />
      <TechTicker />
      <Services />
      <FeaturedCaseStudy />
      <Projects />
      <Capabilities />
      <Process />
      <About />
      <ContactCTA />
    </>
  )
}
