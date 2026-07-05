import { Link } from 'react-router-dom'
import { FEATURED_CASE_STUDY, PROJECTS } from '../data/portfolio'
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

function ProjectPreview({
  project,
  className = '',
}: {
  project: (typeof PROJECTS)[number]
  className?: string
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className={`project-card-image${className ? ` ${className}` : ''}`}
      />
    )
  }

  return (
    <div className="project-chat-preview" aria-hidden="true">
      <div className="project-chat-preview__bubble project-chat-preview__bubble--user">
        How do I configure webhook nodes?
      </div>
      <div className="project-chat-preview__bubble project-chat-preview__bubble--bot">
        Here&apos;s a pipeline example — set POST headers to JSON and map your payload fields.
      </div>
      <div className="project-chat-preview__bubble project-chat-preview__bubble--user">
        Perfect. Can it connect to our docs?
      </div>
      <div className="project-chat-preview__bubble project-chat-preview__bubble--bot">
        Yes — RAG over your knowledge base keeps answers on-brand.
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const host = browserHost(project.url, project.slug)
  const hasCaseStudy = 'caseStudyTo' in project && project.caseStudyTo
  const browserLabel =
    project.slug === 'ai-email-router' ? 'inbox.muteeblabs.app' : project.url ? host : `${project.slug}.app`
  const isFeatured = project.slug === FEATURED_CASE_STUDY.slug
  const serviceLink = project.slug === 'ai-email-router' ? '/ai-automation' : null

  return (
    <article className="project-card">
      <div className="project-card-media">
        <div className="project-browser">
          <div className="project-browser__chrome">
            <span className="project-browser__dot" />
            <span className="project-browser__dot" />
            <span className="project-browser__dot" />
            <span className="project-browser__url">{browserLabel}</span>
          </div>
          <div className="project-browser__viewport">
            <ProjectPreview project={project} />
          </div>
        </div>
      </div>

      <div className="project-card-body">
        <div className="project-card-labels">
          {isFeatured ? (
            <span className="project-card-badge project-card-badge--inline">Featured</span>
          ) : null}
          <span className="project-card-category">{project.category}</span>
        </div>
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-tagline">{project.tagline}</p>
        <p className="project-card-desc">{project.description}</p>

        <ul className="project-card-tags">
          {project.tags.map((tag) => (
            <li key={tag} className="pill-tech">
              {tag}
            </li>
          ))}
        </ul>

        <div className="project-card-footer">
          <div className="project-card-actions">
            {hasCaseStudy ? (
              <Link to={project.caseStudyTo!} className="btn-compact btn-compact--primary">
                Case study
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            ) : null}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-compact btn-compact--ghost"
              >
                Live site
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {serviceLink && project.slug === 'ai-email-router' ? (
              <Link to={serviceLink} className="btn-compact btn-compact--primary">
                AI service
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
          <span className="project-card-meta">
            {project.role} · {project.status}
          </span>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="work" className="section-block section-block--compact portfolio-section">
      <div className="container">
        <Reveal>
          <SectionLabel>Selected work</SectionLabel>
          <div className="section-header-row">
            <h2 className="heading-section max-w-2xl">
              Work we&apos;ve <span className="text-gradient">shipped</span>
            </h2>
            <p className="section-header-desc">
              Production platforms across agribusiness, motorsport contests, inventory ops, and
              automation.
            </p>
          </div>
        </Reveal>

        <div className="project-grid">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={60 + i * 60} as="div">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
