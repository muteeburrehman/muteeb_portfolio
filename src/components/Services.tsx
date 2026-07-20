import type { ComponentType } from 'react'
import { AGENCY_SERVICES } from '../data/portfolio'
import {
  ArrowIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  ShieldIcon,
  SparklesIcon,
  ZapIcon,
} from './icons'
import { SmartLink } from './SmartLink'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

type IconComponent = ComponentType<{ className?: string }>

const SERVICE_ICONS: Record<(typeof AGENCY_SERVICES)[number]['icon'], IconComponent> = {
  database: DatabaseIcon,
  check: CheckIcon,
  zap: ZapIcon,
  code: CodeIcon,
  sparkles: SparklesIcon,
  shield: ShieldIcon,
}

export function Services() {
  return (
    <section id="services" className="section-block section-block--compact relative">
      <div className="container relative z-10">
        <Reveal>
          <SectionLabel>Capabilities</SectionLabel>
          <h2 className="heading-section max-w-2xl">
            Software across <span className="text-gradient">multiple verticals</span>
          </h2>
          <p className="section-lead">
            MuteebLabs is a software company — not a single-industry shop. Pick the lane that matches
            your operation.
          </p>
        </Reveal>

        <div className="service-cards">
          {AGENCY_SERVICES.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon]
            return (
              <Reveal key={item.title} delay={i * 50}>
                <SmartLink to={item.to} className="service-card service-card--visual">
                  <div className="service-card__media">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="service-card__image"
                    />
                    <div className="service-card__media-overlay" aria-hidden="true" />
                    <span className="service-card__icon" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="service-card__body">
                    <h3 className="service-card__title">{item.title}</h3>
                    <p className="service-card__problem">{item.problem}</p>
                    <p className="service-card__solution">{item.solution}</p>
                  </div>
                  <span className="service-card__link">
                    Learn more
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </SmartLink>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
