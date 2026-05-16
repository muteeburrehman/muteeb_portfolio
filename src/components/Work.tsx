import { WORK_ITEMS } from '../data/portfolio'
import { SectionLabel } from './ui/SectionLabel'

export function Work() {
  return (
    <section id="work" className="section-padding border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Selected work</SectionLabel>
        <h2 className="mb-4 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
          Projects &amp; <span className="text-gradient">Expertise</span>
        </h2>
        <p className="mb-14 max-w-2xl text-white/45">
          From LLM agents and voice AI to full stack products and AWS infrastructure.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK_ITEMS.map((item, i) => (
            <article
              key={item.num}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/20 hover:shadow-[0_20px_50px_-20px_rgba(56,189,248,0.15)]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br from-sky-500/10 to-purple-500/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-white/25">{item.num}</span>
              <h3 className="mt-4 text-lg font-semibold text-white transition-colors group-hover:text-sky-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{item.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-white/50 transition-colors group-hover:border-white/15 group-hover:text-white/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
