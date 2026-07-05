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
  ZapIcon, // fallback
]

export function Capabilities() {
  return (
    <section id="capabilities" className="section-block bg-[#02050e] border-t border-slate-900">
      <div className="glow-radial" style={{ top: '30%', left: '-5%' }} aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal>
          <SectionLabel>Core Capabilities</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Technical <span className="text-gradient">specialization</span>
            </h2>
            <p className="max-w-md text-lg text-slate-400">
              LLM agents, voice AI, QA suites, and cloud infrastructure — applied where your product
              needs them.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => {
            const Icon = CAPABILITY_ICONS[i] ?? CodeIcon
            return (
              <Reveal key={item.num} delay={i * 70} as="article">
                <article className="glass-panel group flex h-full flex-col p-8">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-brand-blue group-hover:bg-green-500/10 group-hover:text-brand-green transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-slate-500">{item.num}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400 mb-4">{item.description}</p>

                  <ul className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {item.tags.map((tag) => (
                      <li key={tag} className="pill-tech">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex min-h-[44px] items-center gap-1.5 pt-4 border-t border-slate-900 text-sm text-brand-blue font-semibold group-hover:text-brand-green transition-colors">
                    Explore
                    <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1.5" />
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
