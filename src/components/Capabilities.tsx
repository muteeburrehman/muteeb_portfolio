import type { ComponentType } from 'react'
import { CAPABILITIES } from '../data/portfolio'
import {
  ArrowIcon,
  BrainIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  MicIcon,
  ZapIcon,
} from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

type IconComponent = ComponentType<{ className?: string }>

const CAPABILITY_ICONS: IconComponent[] = [
  BrainIcon,
  MicIcon,
  DatabaseIcon,
  CodeIcon,
  CloudIcon,
  ZapIcon,
]

export function Capabilities() {
  return (
    <section id="capabilities" className="section-white section-block">
      <div className="container">
        <Reveal>
          <SectionLabel>What I build</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <h2 className="heading-section max-w-2xl">
              Areas of <span className="text-gradient">expertise</span>
            </h2>
            <p className="max-w-md text-base text-muted lg:text-right">
              From LLM agents and voice AI to full stack products and AWS infrastructure.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => {
            const Icon = CAPABILITY_ICONS[i] ?? CodeIcon
            return (
              <Reveal key={item.num} delay={i * 70} as="article">
                <article className="card-light group flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-white text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">{item.num}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className="pill-tech">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex min-h-[44px] items-center gap-1.5 pt-5 text-xs text-muted group-hover:text-accent">
                    Explore
                    <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
