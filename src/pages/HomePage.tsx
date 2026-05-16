import { About } from '../components/About'
import { ContactCTA } from '../components/ContactCTA'
import { Hero } from '../components/Hero'
import { ScrollHint } from '../components/ScrollHint'
import { Work } from '../components/Work'

export function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <ContactCTA />
      <ScrollHint />
    </>
  )
}
