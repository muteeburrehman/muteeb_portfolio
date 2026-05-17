import type { ComponentType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { STATS } from '../data/portfolio'
import {
  ArrowIcon,
  BrainIcon,
  CloudIcon,
  DatabaseIcon,
  SparklesIcon,
  ZapIcon,
} from './icons'

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-6 pt-32 pb-28 lg:px-10 lg:pt-36 lg:pb-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-pattern absolute inset-0" />
        <div className="glow-orb -top-32 left-1/4 h-80 w-80 animate-aurora bg-sky-500/25" />
        <div className="glow-orb top-1/3 -right-10 h-[28rem] w-[28rem] animate-pulse-soft bg-purple-500/20" />
        <div className="glow-orb bottom-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 bg-sky-400/10" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap gap-2 opacity-0 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for projects
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/65 backdrop-blur-sm">
            Remote · Worldwide
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/65 backdrop-blur-sm">
            <SparklesIcon className="h-3 w-3 text-sky-300" />
            v2026
          </span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-white/45 uppercase opacity-0 animate-fade-up stagger-1">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-linear-to-r from-sky-400/70 to-transparent"
              />
              Full Stack · AI Engineer
            </p>

            <h1 className="font-display leading-[0.94] tracking-tight">
              <span className="block text-[clamp(2.75rem,9.5vw,6.5rem)] text-white opacity-0 animate-fade-up stagger-2">
                Building
              </span>
              <span className="block text-[clamp(2.75rem,9.5vw,6.5rem)] opacity-0 animate-fade-up stagger-3">
                <span className="text-gradient-shine drop-shadow-[0_0_28px_rgba(56,189,248,0.18)]">
                  intelligent
                </span>
              </span>
              <span className="block text-[clamp(2.75rem,9.5vw,6.5rem)] text-white opacity-0 animate-fade-up stagger-4">
                products.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl opacity-0 animate-fade-up stagger-5">
              I&apos;m <span className="font-medium text-white/85">Muteeb</span> — engineering
              production AI agents, voice interfaces, RAG systems and full stack products with
              Python, React and AWS.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 opacity-0 animate-fade-up stagger-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all hover:shadow-[0_12px_40px_rgba(255,255,255,0.22)]"
              >
                Explore work
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:border-sky-400/40 hover:bg-white/[0.07] hover:text-white"
              >
                <SparklesIcon className="h-4 w-4 text-sky-300 transition-colors group-hover:text-sky-200" />
                Start a project
              </Link>
            </div>

            <p className="mt-7 flex flex-wrap items-center gap-2.5 text-xs text-white/45 opacity-0 animate-fade-up stagger-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
              </span>
              <span className="font-medium text-white/65">Currently exploring</span>
              <span className="text-white/35">·</span>
              <span>AI agents · voice interfaces · RAG · AWS</span>
            </p>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-2 opacity-0 animate-fade-up stagger-5">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] px-3 py-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sky-400/25 hover:bg-white/[0.03]"
                >
                  <dt className="font-display text-2xl text-gradient sm:text-[1.65rem]">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 text-[10px] tracking-[0.14em] text-white/40 uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-5 lg:pl-2">
            <FloatingChip
              icon={BrainIcon}
              label="LangChain"
              className="-top-2 -left-3 [animation-delay:0s] lg:-left-6"
              tint="sky"
            />
            <FloatingChip
              icon={CloudIcon}
              label="AWS Lambda"
              className="top-20 -right-2 [animation-delay:1.2s] lg:-right-4"
              tint="purple"
            />
            <FloatingChip
              icon={DatabaseIcon}
              label="Qdrant · RAG"
              className="-bottom-2 left-2 [animation-delay:2.4s] lg:left-0"
              tint="emerald"
            />
            <FloatingChip
              icon={ZapIcon}
              label="n8n"
              className="bottom-32 -right-3 [animation-delay:3.6s] lg:-right-2"
              tint="amber"
            />

            <TerminalPreview />
          </div>
        </div>
      </div>
    </section>
  )
}

type Tint = 'sky' | 'purple' | 'emerald' | 'amber'

const TINTS: Record<Tint, string> = {
  sky: 'from-sky-500/25 to-sky-500/5 text-sky-300',
  purple: 'from-purple-500/25 to-purple-500/5 text-purple-300',
  emerald: 'from-emerald-500/25 to-emerald-500/5 text-emerald-300',
  amber: 'from-amber-500/25 to-amber-500/5 text-amber-300',
}

function FloatingChip({
  icon: Icon,
  label,
  className = '',
  tint = 'sky',
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  className?: string
  tint?: Tint
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 hidden animate-float-slow items-center gap-2 rounded-full border border-white/[0.1] bg-bg/85 px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:inline-flex ${className}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br ${TINTS[tint]}`}
      >
        <Icon className="h-3 w-3" />
      </span>
      <span className="text-[11px] font-medium text-white/85">{label}</span>
    </div>
  )
}

function TerminalPreview() {
  const lines: Array<ReactNode> = [
    <>
      <Kw>from</Kw> langchain <Kw>import</Kw> <Fn>Agent</Fn>
    </>,
    <>
      <Kw>from</Kw> vectors <Kw>import</Kw> <Fn>qdrant</Fn>
    </>,
    <span aria-hidden="true">&nbsp;</span>,
    <>
      <Kw>def</Kw> <Fn>build</Fn>(prompt: <Cls>str</Cls>):
    </>,
    <span className="pl-4">
      agent = <Fn>Agent</Fn>(model=<Str>&quot;claude-sonnet&quot;</Str>)
    </span>,
    <span className="pl-4">
      context = <Fn>qdrant</Fn>.retrieve(prompt)
    </span>,
    <span className="pl-4">
      <Kw>return</Kw> agent.invoke(prompt, context)
    </span>,
    <span aria-hidden="true">&nbsp;</span>,
    <Com># ✓ deployed → aws.lambda · 142ms cold start</Com>,
  ]

  return (
    <div className="relative opacity-0 animate-fade-up stagger-3">
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl bg-linear-to-br from-sky-400/40 via-transparent to-purple-500/40 opacity-60 blur-md"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg/85 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-3 py-2.5">
          <div className="flex items-center gap-1.5 pl-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-2 flex items-center gap-1">
            <Tab active>agent.py</Tab>
            <Tab>vectors.py</Tab>
            <Tab>deploy.sh</Tab>
          </div>
        </div>

        <div className="flex font-mono text-[12.5px] leading-relaxed">
          <div
            aria-hidden="true"
            className="select-none border-r border-white/5 bg-white/[0.015] px-3 py-5 text-right text-white/20"
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="flex-1 space-y-0.5 px-5 py-5">
            {lines.map((line, i) => (
              <div key={i} className="text-white/75">
                {line}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1.5">
              <span className="text-sky-400">▸</span>
              <span className="h-4 w-2 animate-blink bg-white/85" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.015] px-4 py-2 font-mono text-[10.5px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            python 3.12 · main
          </span>
          <span>uptime 99.98%</span>
        </div>
      </div>
    </div>
  )
}

function Tab({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
        active
          ? 'bg-white/[0.06] text-white/85'
          : 'text-white/30 hover:text-white/55'
      }`}
    >
      {children}
    </span>
  )
}

function Kw({ children }: { children: ReactNode }) {
  return <span className="text-purple-300">{children}</span>
}
function Fn({ children }: { children: ReactNode }) {
  return <span className="text-sky-300">{children}</span>
}
function Str({ children }: { children: ReactNode }) {
  return <span className="text-emerald-300">{children}</span>
}
function Cls({ children }: { children: ReactNode }) {
  return <span className="text-amber-200/80">{children}</span>
}
function Com({ children }: { children: ReactNode }) {
  return <span className="text-emerald-400/55 italic">{children}</span>
}
