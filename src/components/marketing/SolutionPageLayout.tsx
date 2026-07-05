import { Link } from 'react-router-dom'
import type { PROJECTS } from '../../data/portfolio'
import { PROJECTS as ALL_PROJECTS } from '../../data/portfolio'
import { ArrowIcon, ExternalLinkIcon } from '../icons'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

type Project = (typeof PROJECTS)[number]

function SolutionProjectCard({ project }: { project: Project }) {
  const hasCaseStudy = 'caseStudyTo' in project && project.caseStudyTo

  return (
    <article className="solution-project">
      <div className="solution-project__copy">
        <span className="solution-project__category">{project.category}</span>
        <h3 className="solution-project__title">{project.name}</h3>
        <p className="solution-project__tagline">{project.tagline}</p>
        <p className="solution-project__desc">{project.description}</p>
        <ul className="solution-project__tags">
          {project.tags.slice(0, 4).map((tag) => (
            <li key={tag} className="pill-tech">
              {tag}
            </li>
          ))}
        </ul>
        <div className="solution-project__actions">
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
          <Link to="/#work" className="solution-project__more">
            View on homepage →
          </Link>
        </div>
      </div>
    </article>
  )
}

export type SolutionPageContent = {
  badge: string
  headline: string
  problem: string
  solution: string
  heroImage?: string
  projectSlugs: readonly string[]
  deliverables: readonly string[]
  quote?: { text: string; author: string; role: string }
}

export function SolutionPageLayout({
  badge,
  headline,
  problem,
  solution,
  heroImage,
  projectSlugs,
  deliverables,
  quote,
}: SolutionPageContent) {
  const projects = ALL_PROJECTS.filter((p) =>
    (projectSlugs as readonly string[]).includes(p.slug),
  )

  return (
    <div className="solution-page">
      <header className={`solution-page-hero${heroImage ? ' solution-page-hero--visual' : ''}`}>
        <div className="glow-radial" style={{ top: '-5%', right: '-10%' }} aria-hidden="true" />
        <div className="grid-overlay grid-overlay--subtle" aria-hidden="true" />
        <div className="container relative z-10">
          <div className="solution-page-hero__grid">
            <div className="solution-page-hero__copy">
              <SectionLabel>{badge}</SectionLabel>
              <h1 className="solution-page-hero__title">{headline}</h1>
              <p className="solution-page-hero__problem">{problem}</p>
              <p className="solution-page-hero__solution">{solution}</p>
              <a href="#examples" className="solution-page-hero__scroll">
                See examples below
                <ArrowIcon className="h-3.5 w-3.5 rotate-90" />
              </a>
            </div>
            {heroImage ? (
              <div className="solution-page-hero__visual">
                <img src={heroImage} alt="" loading="eager" className="solution-page-hero__image" />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section id="examples" className="solution-page-section">
        <div className="container">
          <Reveal>
            <SectionLabel>Shipped examples</SectionLabel>
            <h2 className="heading-section max-w-xl">Work that matches this service</h2>
          </Reveal>
          <div className="solution-project-list">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <SolutionProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-page-section solution-page-section--muted">
        <div className="container solution-page-deliverables">
          <Reveal>
            <SectionLabel>What you get</SectionLabel>
            <h2 className="heading-section max-w-xl">Typical deliverables</h2>
          </Reveal>
          <ul className="solution-deliverables-list">
            {deliverables.map((item, i) => (
              <Reveal key={item} delay={i * 40} as="li">
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {quote ? (
        <section className="solution-page-section">
          <div className="container">
            <Reveal>
              <blockquote className="solution-quote">
                <p>&ldquo;{quote.text}&rdquo;</p>
                <footer>
                  <cite>{quote.author}</cite>
                  <span>{quote.role}</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="solution-page-footer">
        <div className="container solution-page-footer__inner">
          <p className="solution-page-footer__text">
            Want something similar? Tell us what you&apos;re trying to fix.
          </p>
          <div className="solution-page-footer__actions">
            <Link to="/contact" className="btn-compact btn-compact--primary">
              Start a project
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
            <Link to="/#work" className="btn-compact btn-compact--ghost">
              All work
            </Link>
            <Link to="/book" className="btn-compact btn-compact--ghost">
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
