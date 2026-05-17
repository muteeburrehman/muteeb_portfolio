import { PROCESS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function Process() {
  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden border-t border-white/5"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb top-1/2 left-1/2 h-80 w-[36rem] -translate-x-1/2 -translate-y-1/2 bg-sky-500/[0.05]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>How I work</SectionLabel>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
              A simple, <span className="text-gradient">honest</span> process.
            </h2>
            <p className="max-w-md text-sm text-white/55 sm:text-base">
              No mystery, no over-engineering. Just four predictable steps from kickoff to a
              shipped, supported product.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-7 left-0 hidden h-px w-full bg-linear-to-r from-transparent via-white/12 to-transparent lg:block"
          />

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 80} as="li">
                <li className="group relative h-full rounded-2xl border border-white/[0.07] bg-surface/55 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/25 hover:bg-surface/85">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-sky-500/15 to-purple-500/15 font-mono text-sm font-semibold text-sky-200">
                      {step.step}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-xl bg-linear-to-br from-sky-400/30 to-purple-500/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-linear-to-r from-white/15 via-white/5 to-transparent"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
