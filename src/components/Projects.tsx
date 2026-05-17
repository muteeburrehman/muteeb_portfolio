import { PROJECTS } from '../data/portfolio'
import { ArrowIcon, ExternalLinkIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

type Accent = 'sky' | 'purple' | 'amber' | 'emerald'

const ACCENT_DOT: Record<Accent, string> = {
  sky: 'bg-sky-400',
  purple: 'bg-purple-400',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
}

const ACCENT_TEXT: Record<Accent, string> = {
  sky: 'text-sky-300',
  purple: 'text-purple-300',
  amber: 'text-amber-300',
  emerald: 'text-emerald-300',
}

const ACCENT_GLOW: Record<Accent, string> = {
  sky: 'from-sky-500/30 to-sky-500/0',
  purple: 'from-purple-500/30 to-purple-500/0',
  amber: 'from-amber-500/30 to-amber-500/0',
  emerald: 'from-emerald-500/30 to-emerald-500/0',
}

function browserHost(url: string | undefined, fallback: string) {
  if (!url) return fallback
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return fallback
  }
}

function ChatPreview() {
  return (
    <div className="flex h-full flex-col gap-3 bg-linear-to-br from-emerald-500/[0.06] via-bg/95 to-purple-500/[0.06] p-6">
      <div className="self-start max-w-[78%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12.5px] text-white/85">
        How do I reset my account password?
      </div>
      <div className="self-end max-w-[82%] rounded-2xl rounded-br-md bg-linear-to-br from-sky-500/25 to-purple-500/25 px-4 py-2.5 text-[12.5px] text-white shadow-[0_8px_24px_rgba(56,189,248,0.15)]">
        I&apos;ve emailed you a secure reset link valid for 15 minutes. Want me to also enable
        2FA?
      </div>
      <div className="self-start max-w-[60%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12.5px] text-white/85">
        Yes — go ahead.
      </div>
      <div className="self-end max-w-[78%] rounded-2xl rounded-br-md bg-linear-to-br from-sky-500/25 to-purple-500/25 px-4 py-2.5 text-[12.5px] text-white shadow-[0_8px_24px_rgba(56,189,248,0.15)]">
        Done ✓ 2FA active. Anything else I can help with today?
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-full border border-white/10 bg-bg/60 px-4 py-2 text-[11px] text-white/35">
        <span className="flex gap-1">
          <span className="h-1 w-1 animate-pulse rounded-full bg-white/40 [animation-delay:0s]" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-white/40 [animation-delay:0.2s]" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-white/40 [animation-delay:0.4s]" />
        </span>
        agent typing…
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="work"
      className="section-padding relative overflow-hidden border-t border-white/5"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="glow-orb top-32 left-1/4 h-72 w-72 bg-sky-500/8" />
        <div className="glow-orb bottom-20 right-0 h-80 w-80 bg-purple-500/8" />
      </div>

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Selected work</SectionLabel>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
              Things I&apos;ve <span className="text-gradient">shipped</span>
            </h2>
            <p className="max-w-md text-sm text-white/55 sm:text-base">
              Real products in production — full stack web apps, AI automation pipelines and
              conversational agents built for real clients.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-7">
          {PROJECTS.map((project, i) => {
            const accent = project.accent as Accent
            const objectFit = project.slug === 'ai-email-router' ? 'object-contain' : 'object-cover'
            const host = browserHost(project.url, `${project.slug}.local`)

            return (
              <Reveal key={project.slug} delay={i * 90} as="article">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-[0_30px_80px_-30px_rgba(56,189,248,0.25)]">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-linear-to-br ${ACCENT_GLOW[accent]} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100`}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/55" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/55" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/55" />
                      </div>
                      <span className="ml-1 flex-1 truncate rounded-md border border-white/5 bg-bg/55 px-3 py-0.5 font-mono text-[11px] text-white/45">
                        {host}
                      </span>
                      <span
                        className={`hidden items-center gap-1.5 rounded-full border border-white/10 bg-bg/55 px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase sm:inline-flex ${ACCENT_TEXT[accent]}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT[accent]} animate-pulse`} />
                        {project.status}
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden bg-bg">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full ${objectFit} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                        />
                      ) : (
                        <ChatPreview />
                      )}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/70 via-transparent to-transparent opacity-60"
                      />
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-[11px] tracking-[0.18em] uppercase ${ACCENT_TEXT[accent]}`}
                      >
                        {project.category}
                      </span>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/65 transition-all hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-200"
                        >
                          Visit live
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-display text-2xl text-white sm:text-[1.65rem]">
                      {project.name}
                    </h3>
                    <p className={`mt-1.5 text-sm font-medium ${ACCENT_TEXT[accent]}`}>
                      {project.tagline}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-white/55">
                      {project.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[11px] text-white/55"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-5 text-[11px] text-white/40">
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono tracking-wider text-white/30 uppercase">Role</span>
                        <span className="text-white/65">{project.role}</span>
                      </span>
                      <span className="flex items-center gap-1.5 sm:hidden">
                        <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT[accent]} animate-pulse`} />
                        <span className={ACCENT_TEXT[accent]}>{project.status}</span>
                      </span>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden items-center gap-1.5 text-white/55 transition-colors hover:text-sky-200 sm:inline-flex"
                        >
                          {host}
                          <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        <span className="hidden text-white/40 sm:inline">Case study available on request</span>
                      )}
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
