import { MARQUEE_ITEMS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { TechLogo } from './ui/TechLogo'

const STACK_ITEMS = [
  'React',
  'Python',
  'PostgreSQL',
  'Django',
  'AWS',
  'OpenAI',
  'LangChain',
  'Claude',
  'Gemini',
  'Qdrant',
  'n8n',
] as const

export function TechStack() {
  return (
    <section className="tech-stack-section" aria-label="Technologies we work with">
      <div className="container">
        <Reveal className="tech-stack-header">
          <p className="label-tag">Trusted stack</p>
          <p className="tech-stack-subtitle">
            Production tools across {MARQUEE_ITEMS.length}+ technologies — the same stack we ship for clients.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="tech-stack-grid">
            {STACK_ITEMS.map((name) => (
              <div key={name} className="tech-stack-item">
                <TechLogo name={name} />
                <span className="tech-stack-name">{name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
