import { CORE_VALUES } from '../data/portfolio'
import { CheckIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function OurValues() {
  return (
    <section id="values" className="values-section section-block" aria-labelledby="values-heading">
      <div className="glow-radial" style={{ bottom: '10%', right: '-15%' }} aria-hidden="true" />
      <div className="grid-overlay grid-overlay--subtle" aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal>
          <div className="values-section__header">
            <SectionLabel className="justify-center">Our values</SectionLabel>
            <h2 id="values-heading" className="values-section__title">
              How we earn trust, <span className="text-gradient">project after project</span>
            </h2>
            <p className="values-section__lead">
              Our reputation comes from how we show up — clear communication, steady delivery, and
              treating every client operation with genuine respect.
            </p>
          </div>
        </Reveal>

        <ul className="trust-values-list">
          {CORE_VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 70} as="li" className="trust-value">
              <span className="trust-value__check" aria-hidden="true">
                <CheckIcon className="h-4 w-4" />
              </span>
              <div className="trust-value__content">
                <h3 className="trust-value__title">{value.title}</h3>
                <p className="trust-value__body">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
