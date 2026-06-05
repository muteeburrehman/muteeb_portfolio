import { PROCESS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Process() {
  return (
    <section id="process" className="section-white section-block">
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-border md:block"
          />

          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 80} as="li">
                <li className="relative flex flex-col">
                  <span className="font-display text-4xl font-bold text-accent/25 lg:text-5xl">
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
