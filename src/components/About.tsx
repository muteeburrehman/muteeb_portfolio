import { SKILLS, STATS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function About() {
  return (
    <section id="about" className="section-block relative overflow-hidden" style={{ background: 'var(--bg-dark-2)' }}>
      {/* Ambient orbs */}
      <div className="ambient-orb ambient-orb--2" style={{ top: '-15%', right: '-10%' }} aria-hidden="true" />
      <div className="ambient-orb ambient-orb--3" style={{ bottom: '-10%', left: '-5%' }} aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal className="text-center">
          <SectionLabel>About</SectionLabel>
          <h2 className="heading-display mx-auto max-w-2xl text-[clamp(1.75rem,4vw,2.5rem)]">
            Python-first.
            <br />
            <span className="text-gradient">AI-driven.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-6 sm:gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="font-display text-3xl font-bold sm:text-4xl text-gradient">
                  {s.value}
                </dt>
                <dd className="mt-2 text-xs tracking-wide text-muted uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-2xl space-y-5 text-center text-base leading-relaxed text-muted sm:text-lg">
          <p>
            I&apos;m <strong className="font-medium text-text-primary">Muteeb Ur Rehman</strong> —
            a full stack developer, AI engineer, and software testing specialist. I build
            intelligent products end to end: clean React frontends, Python APIs on PostgreSQL,
            LLM agents, voice interfaces, automation pipelines, and thorough QA before release.
          </p>
          <p>
            Recent shipped work includes{' '}
            <a
              href="https://pitprize.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-hover underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              PitPrize
            </a>{' '}
            (a skill-based motorsport prediction platform with real cash prizes),{' '}
            <a
              href="https://marblesemen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-hover underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Marble Semen
            </a>{' '}
            (a Wagyu genetics e-commerce store), production n8n + OpenAI email automation
            suites and a number of custom AI chatbots deployed for clients.
          </p>
          <p>
            I work across the modern AI stack — LangChain, OpenAI, Gemini, Claude, Qdrant,
            n8n — plus manual and regression software testing for web and SaaS products. I care
            about clean code, reliable systems, and outcomes that ship.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-bg-off px-3.5 py-1.5 text-xs text-muted transition-all hover:border-accent/30 hover:text-accent-hover"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
