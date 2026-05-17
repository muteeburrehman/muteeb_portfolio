import { SKILLS, STATS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden border-t border-white/5"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb top-1/3 -left-20 h-96 w-96 bg-sky-500/8" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
              Python-first.
              <br />
              <span className="text-gradient">AI-driven.</span>
            </h2>

            <div className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-surface-elevated/60 p-3 pr-5 backdrop-blur-sm">
              <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-sky-400 to-purple-500 font-display text-2xl text-white shadow-[0_8px_24px_rgba(56,189,248,0.35)]">
                M
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent"
                />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Muteeb Ur Rehman</p>
                <p className="text-xs text-white/45">Full Stack · AI Engineer</p>
              </div>
              <span
                className="ml-3 h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                aria-label="online"
              />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/[0.07] bg-surface-elevated/50 px-3 py-5 text-center backdrop-blur-sm transition-colors hover:border-sky-400/25"
                >
                  <p className="font-display text-2xl text-gradient sm:text-[1.75rem]">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[10px] tracking-[0.14em] text-white/40 uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="space-y-5 text-base leading-relaxed text-white/65 sm:text-lg lg:col-span-7"
          >
            <p>
              I&apos;m <strong className="font-medium text-white/95">Muteeb Ur Rehman</strong> —
              a full stack developer and AI engineer. I build intelligent products end to end:
              clean React frontends, Python APIs on PostgreSQL, LLM agents, voice interfaces,
              automation pipelines and AWS deployments.
            </p>
            <p>
              Recent shipped work includes{' '}
              <a
                href="https://pitprize.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/90 underline decoration-sky-400/40 underline-offset-4 transition-colors hover:text-sky-200 hover:decoration-sky-300"
              >
                PitPrize
              </a>{' '}
              (a skill-based motorsport prediction platform with real cash prizes),{' '}
              <a
                href="https://marblesemen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/90 underline decoration-sky-400/40 underline-offset-4 transition-colors hover:text-sky-200 hover:decoration-sky-300"
              >
                Marble Semen
              </a>{' '}
              (a Wagyu genetics e-commerce store), production n8n + OpenAI email automation
              suites and a number of custom AI chatbots deployed for clients.
            </p>
            <p>
              I work across the modern AI stack — LangChain, OpenAI, Gemini, Claude, Qdrant,
              n8n — and on infrastructure with EC2, Lambda and Elasticsearch. I care about
              clean code, reliable systems and outcomes that ship.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-4">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="cursor-default rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
