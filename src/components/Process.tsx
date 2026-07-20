import { PROCESS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Process() {
  return (
    <section id="process" className="section-block section-block--compact border-t border-slate-900">
      <div className="container relative z-10">
        <Reveal>
          <SectionLabel>How we work</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-end mb-12">
            <h2 className="heading-section">
              A clear path from <span className="text-gradient">brief to launch</span>
            </h2>
            <p className="section-lead max-w-none">
              Four predictable phases — scoped early, demoed often, supported after release.
            </p>
          </div>
        </Reveal>

        <div className="timeline-container max-w-4xl mx-auto">
          {/* Vertical progress line */}
          <div className="timeline-line" aria-hidden="true" />

          {PROCESS.map((step, i) => (
            <Reveal key={step.step} delay={i * 80}>
              <div className="timeline-step">
                <div className="timeline-node" aria-hidden="true">
                  {step.step}
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{step.title}</h3>
                  <p className="timeline-desc">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
