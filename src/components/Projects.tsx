import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'
import { ArrowIcon, ExternalLinkIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

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
    <div className="flex h-full min-h-[200px] flex-col gap-3 bg-bg-off p-6">
      <div className="self-start max-w-[78%] rounded-2xl rounded-bl-md border border-border bg-white px-4 py-2.5 text-[12px] text-text-primary">
        How do I reset my account password?
      </div>
      <div className="self-end max-w-[82%] rounded-2xl rounded-br-md bg-accent/10 px-4 py-2.5 text-[12px] text-text-primary">
        I&apos;ve emailed you a secure reset link valid for 15 minutes. Want me to also enable
        2FA?
      </div>
      <div className="self-start max-w-[60%] rounded-2xl rounded-bl-md border border-border bg-white px-4 py-2.5 text-[12px] text-text-primary">
        Yes — go ahead.
      </div>
      <div className="self-end max-w-[78%] rounded-2xl rounded-br-md bg-accent/10 px-4 py-2.5 text-[12px] text-text-primary">
        Done ✓ 2FA active. Anything else I can help with today?
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="work" className="section-off section-block">
      <div className="container">
        <Reveal>
          <SectionLabel>Selected work</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <h2 className="heading-section max-w-2xl">
              Work we&apos;ve <span className="text-gradient">shipped</span>
            </h2>
            <p className="max-w-md text-base text-muted lg:text-right">
              Production software for US and global clients — livestock platforms, SaaS products,
              and AI automation.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project, i) => {
            const objectFit = project.slug === 'ai-email-router' ? 'object-contain' : 'object-cover'
            const host = browserHost(project.url, `${project.slug}.local`)

            return (
              <Reveal key={project.slug} delay={i * 90} as="article">
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-white transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-bg-off">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        className={`h-full w-full ${objectFit} transition-transform duration-500 hover:scale-[1.02]`}
                      />
                    ) : (
                      <ChatPreview />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] tracking-wide text-accent uppercase">
                        {project.category}
                      </span>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-1 text-[11px] text-muted transition-colors hover:text-accent"
                        >
                          Visit live
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-text-primary">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>

                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className="pill-tech">
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-[11px] text-muted">
                      <span>
                        <span className="font-mono uppercase">Role</span>{' '}
                        <span className="text-text-primary">{project.role}</span>
                      </span>
                      <div className="flex items-center gap-4">
                        {'caseStudyTo' in project && project.caseStudyTo ? (
                          <Link
                            to={project.caseStudyTo}
                            className="inline-flex min-h-[44px] items-center gap-1 text-accent hover:text-accent-hover"
                          >
                            Case study
                            <ArrowIcon className="h-3 w-3" />
                          </Link>
                        ) : null}
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-1 hover:text-accent"
                          >
                            {host}
                            <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                        ) : null}
                      </div>
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
