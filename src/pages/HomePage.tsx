import { About } from '../components/About'
import { Capabilities } from '../components/Capabilities'
import { ContactCTA } from '../components/ContactCTA'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { Projects } from '../components/Projects'
import { ScrollHint } from '../components/ScrollHint'

export function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Capabilities />
      <Process />
      <About />
      <ContactCTA />
      <ScrollHint />
    </>
  )
}
