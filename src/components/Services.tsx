import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { AGENCY_SERVICES } from '../data/portfolio'
import { ArrowIcon, CheckIcon, CodeIcon, DatabaseIcon, ZapIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

type IconComponent = ComponentType<{ className?: string }>

const SERVICE_ICONS: Record<(typeof AGENCY_SERVICES)[number]['icon'], IconComponent> = {
  database: DatabaseIcon,
  check: CheckIcon,
  zap: ZapIcon,
  code: CodeIcon,
}

const ACCENT_COLORS: Record<
  (typeof AGENCY_SERVICES)[number]['accent'],
  { gradient: string; glow: string; text: string; border: string }
> = {
  sky: {
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    glow: 'rgba(34, 211, 238, 0.15)',
    text: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
  },
  purple: {
    gradient: 'from-purple-500/20 to-purple-500/5',
    glow: 'rgba(168, 85, 247, 0.15)',
    text: 'text-purple-400',
    border: 'hover:border-purple-500/30',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    glow: 'rgba(52, 211, 153, 0.15)',
    text: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
  amber: {
    gradient: 'from-amber-500/20 to-amber-500/5',
    glow: 'rgba(245, 158, 11, 0.15)',
    text: 'text-amber-400',
    border: 'hover:border-amber-500/30',
  },
}

export function Services() {
  return (
    <section id="services" className="section-block" style={{ background: 'var(--bg-dark-2)' }}>
      <div className="container">
        <Reveal>
          <SectionLabel>Solutions</SectionLabel>
          <div className="section-header-row">
            <h2 className="heading-section max-w-2xl">
              Built for <span className="text-gradient">your business</span>
            </h2>
            <p className="max-w-md text-base text-muted lg:justify-self-end lg:text-right">
              Focused engineering across livestock, QA, AI automation, and SaaS — pick the path that
              matches your pain point.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AGENCY_SERVICES.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon]
            const accent = ACCENT_COLORS[item.accent]
            return (
              <Reveal key={item.to} delay={i * 80} as="article">
                <article
                  className={`glass-card group flex h-full flex-col p-7 ${accent.border}`}
                  style={{
                    ['--hover-glow' as string]: accent.glow,
                  }}
                >
                  <span
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b ${accent.gradient} ${accent.text}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  <Link
                    to={item.to}
                    className={`mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-6 text-sm font-medium ${accent.text} transition-all`}
                  >
                    Learn More
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
