import { Link } from 'react-router-dom'
import { FEATURED_CASE_STUDY } from '../../data/portfolio'
import { ArrowIcon } from '../icons'
import { SectionLabel } from '../ui/SectionLabel'

export function LivestockCaseStudyBlock() {
  const { name, description, tags, to } = FEATURED_CASE_STUDY

  return (
    <section className="section-off section-block">
      <div className="container">
        <SectionLabel>Featured case study</SectionLabel>
        <div
          className="glass-card-static featured-project-card rounded-xl"
          style={{
            borderLeft: '3px solid',
            borderImage: 'linear-gradient(to bottom, #6366f1, #a855f7) 1',
          }}
        >
          <div className="min-w-0">
            <h2 className="heading-section">{name}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag} className="pill-tech">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <Link
            to={to}
            className="btn-primary-light shrink-0 justify-self-start lg:justify-self-center"
          >
            Read the Case Study
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
