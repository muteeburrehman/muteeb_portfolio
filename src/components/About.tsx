import { SKILLS, STATS } from '../data/portfolio'
import { SectionLabel } from './ui/SectionLabel'

export function About() {
  return (
    <section id="about" className="section-padding border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Python-first.
              <br />
              <span className="text-gradient">AI-driven.</span>
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/5 bg-surface-elevated px-4 py-5 text-center"
                >
                  <p className="font-display text-2xl text-gradient sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-white/55 sm:text-lg">
            <p>
              I&apos;m <strong className="font-medium text-white/90">Muteeb Ur Rehman</strong>, a
              full stack developer and AI engineer. I build intelligent
              products — from React and PostgreSQL web apps to LLM-powered agents, voice
              interfaces, and cloud deployments on AWS.
            </p>
            <p>
              I work across the modern AI stack: LangChain, open-source and proprietary models
              (OpenAI, Gemini, Claude), vector databases like Qdrant, and automation with n8n. On
              the infrastructure side, I ship with EC2, Lambda, Elasticsearch, and the broader AWS
              ecosystem.
            </p>
            <p>
              Whether you need a production RAG pipeline, a voice agent, or a full stack product
              end to end — I focus on clean code, reliable systems, and outcomes that ship.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-sky-400/30 hover:text-sky-200/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
