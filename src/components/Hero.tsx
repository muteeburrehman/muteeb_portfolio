import { Link } from 'react-router-dom'
import { TECH_STACK } from '../data/portfolio'
import { ArrowIcon } from './icons'
import { GradientGlow } from './ui/GradientGlow'
import { SectionLabel } from './ui/SectionLabel'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-6 pt-32 pb-40 lg:px-10 lg:pt-36">
      <GradientGlow />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap gap-3 opacity-0 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/5 px-4 py-1.5 text-xs text-green-400 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" aria-hidden="true" />
            Available for Projects
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm">
            Open to remote work
          </span>
        </div>

        <h1 className="font-display leading-[0.88] tracking-tight">
          <span className="block text-[clamp(3rem,11vw,7.5rem)] text-white opacity-0 animate-fade-up stagger-1">
            MUTEEB
          </span>
          <span className="block text-[clamp(3rem,11vw,7.5rem)] text-gradient opacity-0 animate-fade-up stagger-2">
            UR
          </span>
          <span className="relative block text-[clamp(3rem,11vw,7.5rem)] text-white opacity-0 animate-fade-up stagger-3">
            REHMAN
            <span className="absolute right-0 bottom-1 font-mono text-[10px] tracking-normal text-white/25 sm:bottom-3 sm:text-xs">
              /ai-engineer
            </span>
          </span>
        </h1>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          <div className="opacity-0 animate-fade-up stagger-4">
            <SectionLabel>What I do</SectionLabel>
            <p className="max-w-md text-xl leading-snug text-white/85 sm:text-2xl lg:text-[1.65rem]">
              Full Stack Developer &amp; AI Engineer who{' '}
              <span className="text-gradient font-semibold">BUILDS</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-lg shadow-white/5 transition-all hover:opacity-90 hover:shadow-white/10"
              >
                Explore Work
                <ArrowIcon />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="opacity-0 animate-fade-up stagger-4">
            <SectionLabel>Tech stack</SectionLabel>
            <p className="text-sm leading-relaxed text-white/55 sm:text-base">{TECH_STACK}</p>
            <p className="mt-5 font-mono text-[11px] leading-relaxed text-white/20" aria-hidden="true">
              ▓░▒ langchain.embed ░▒▓ qdrant.query ░▒▓ openai.complete
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
