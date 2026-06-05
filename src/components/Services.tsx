import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { AGENCY_SERVICES } from '../data/portfolio'
import { ArrowIcon, CheckIcon, DatabaseIcon, ZapIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

type IconComponent = ComponentType<{ className?: string }>

const SERVICE_ICONS: Record<(typeof AGENCY_SERVICES)[number]['icon'], IconComponent> = {
  database: DatabaseIcon,
  check: CheckIcon,
  zap: ZapIcon,
}

export function Services() {
  return (
    <section id="services" className="section-white section-block">
      <div className="container">
        <Reveal>
          <SectionLabel>What we do</SectionLabel>
          <div className="section-header-row">
            <h2 className="heading-section max-w-2xl">
              Software built for <span className="text-gradient">your niche</span>
            </h2>
            <p className="max-w-md text-base text-muted lg:justify-self-end lg:text-right">
              MuteebLabs delivers focused engineering across livestock operations, SaaS QA, and
              AI-powered automation.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AGENCY_SERVICES.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon]
            return (
              <Reveal key={item.to} delay={i * 80} as="article">
                <article className="card-light group flex h-full flex-col">
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-white text-accent">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  <Link
                    to={item.to}
                    className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-6 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    Learn More
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
