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
  'Custom software for agribusiness, contest platforms, inventory systems, and agency workflow fixes — plus QA and AI automation. MuteebLabs builds platforms teams actually use.'

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
        'Custom software for agribusiness, contests, inventory ops, and agencies — plus QA and AI automation — built by MuteebLabs.',
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
