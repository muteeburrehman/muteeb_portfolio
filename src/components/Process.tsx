import { PROCESS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Process() {
  return (
    <section id="process" className="section-block" style={{ background: 'var(--bg-dark)' }}>
      <div className="container">
        <Reveal>
          <SectionLabel>How I work</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <h2 className="heading-section max-w-2xl">
              A simple, <span className="text-gradient">honest</span> process.
            </h2>
            <p className="max-w-md text-base text-muted lg:text-right">
              No mystery, no over-engineering. Just four predictable steps from kickoff to a
              shipped, supported product.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12">
          {/* Gradient timeline connector */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-0 left-0 hidden h-px md:block"
            style={{
              background: 'linear-gradient(90deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 50%, rgba(34,211,238,0.15) 100%)',
            }}
          />

          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 80} as="li">
                <li className="relative flex flex-col">
                  <span className="font-display text-5xl font-bold lg:text-6xl text-gradient-subtle" style={{ opacity: 0.4 }}>
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
