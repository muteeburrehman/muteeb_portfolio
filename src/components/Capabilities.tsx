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
    <section
      id="capabilities"
      className="section-padding relative overflow-hidden border-t border-white/5"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb -top-32 right-0 h-72 w-72 bg-purple-500/8" />
        <div className="glow-orb bottom-0 left-0 h-64 w-72 bg-sky-500/6" />
      </div>

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>What I build</SectionLabel>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
              Areas of <span className="text-gradient">expertise</span>
            </h2>
            <p className="max-w-md text-sm text-white/50 sm:text-base">
              From LLM agents and voice AI to full stack products and AWS infrastructure.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => {
            const Icon = CAPABILITY_ICONS[i] ?? CodeIcon
            return (
              <Reveal key={item.num} delay={i * 70} as="article">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-surface/90 hover:shadow-[0_24px_60px_-24px_rgba(56,189,248,0.25)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-sky-400/[0.06] via-transparent to-purple-500/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-linear-to-br from-sky-500/20 to-purple-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div className="mb-6 flex items-start justify-between">
                      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-sky-500/15 to-purple-500/15 text-sky-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-sky-200">
                        <Icon className="h-5 w-5" />
                        <span
                          className="absolute inset-0 rounded-xl bg-linear-to-br from-sky-400/30 to-purple-500/30 opacity-0 blur-md transition-opacity group-hover:opacity-70"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-mono text-xs text-white/25">{item.num}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-sky-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                      {item.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55 transition-colors group-hover:border-white/15 group-hover:text-white/75"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center gap-1.5 pt-6 text-xs text-white/35 transition-colors group-hover:text-sky-300">
                      Explore
                      <ArrowIcon className="h-3 w-3 -translate-x-0.5 transition-transform group-hover:translate-x-0" />
                    </div>
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
