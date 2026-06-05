import { Link } from 'react-router-dom'
import { FEATURED_CASE_STUDY } from '../data/portfolio'
import { ArrowIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function FeaturedCaseStudy() {
  const { name, description, tags, to } = FEATURED_CASE_STUDY

  return (
    <section className="section-block" style={{ background: 'var(--bg-dark-3)' }}>
      <div className="container">
        <Reveal>
          <SectionLabel>Featured project</SectionLabel>
          <div className="glass-card-static featured-project-card rounded-xl"
            style={{
              borderLeft: '3px solid',
              borderImage: 'linear-gradient(to bottom, #6366f1, #a855f7) 1',
            }}
          >
            <div className="min-w-0">
              <h2 className="heading-section">{name}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                {description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag} className="pill-tech">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <Link to={to} className="btn-primary-light shrink-0">
              Read the Case Study
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
