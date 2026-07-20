import { NAV_INDUSTRIES } from '../data/portfolio'
import { ArrowIcon } from './icons'
import { SmartLink } from './SmartLink'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Industries() {
  return (
    <section id="industries" className="industries-section section-block section-block--compact">
      <div className="container relative z-10">
        <Reveal>
          <SectionLabel>Industries</SectionLabel>
          <h2 className="heading-section max-w-2xl">
            Markets we already <span className="text-gradient">ship in</span>
          </h2>
          <p className="section-lead">
            Domain familiarity shortens discovery — you spend less time explaining the business, and
            more time reviewing working software.
          </p>
        </Reveal>

        <div className="industry-cards">
          {NAV_INDUSTRIES.map((item, i) => (
            <Reveal key={item.label} delay={i * 50}>
              <SmartLink to={item.to} className="industry-card">
                <div className="industry-card__media">
                  <img src={item.image} alt="" loading="lazy" className="industry-card__image" />
                  <div className="industry-card__overlay" aria-hidden="true" />
                </div>
                <div className="industry-card__body">
                  <div className="industry-card__copy">
                    <h3 className="industry-card__title">{item.label}</h3>
                    <p className="industry-card__blurb">{item.blurb}</p>
                  </div>
                  <span className="industry-card__link">
                    Explore
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </SmartLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
