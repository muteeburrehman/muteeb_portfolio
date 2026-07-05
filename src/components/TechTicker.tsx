import { TechLogo } from './ui/TechLogo'

const TRUST_LOGOS = [
  'Next.js',
  'React',
  'Node.js',
  'Python',
  'Django',
  'PostgreSQL',
  'AWS',
  'OpenAI',
  'n8n',
  'LangChain',
] as const

export function TechTicker() {
  return (
    <section className="social-proof-bar" aria-label="Technologies we use">
      <div className="container">
        <p className="social-proof-title">Tools &amp; platforms we ship with</p>
        
        {/* Double ticker elements for continuous smooth infinite scrolling */}
        <div className="overflow-hidden relative py-4 mask-edges">
          <div className="logo-ticker-inner">
            {/* First Set */}
            {TRUST_LOGOS.map((name, i) => (
              <div key={`set1-${name}-${i}`} className="ticker-item">
                <TechLogo name={name} className="w-8 h-8 opacity-40 hover:opacity-100 transition-opacity" />
                <span>{name}</span>
              </div>
            ))}
            {/* Second Set (for continuous loop) */}
            {TRUST_LOGOS.map((name, i) => (
              <div key={`set2-${name}-${i}`} className="ticker-item">
                <TechLogo name={name} className="w-8 h-8 opacity-40 hover:opacity-100 transition-opacity" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
