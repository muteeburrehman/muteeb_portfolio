import { Link } from 'react-router-dom'
import { ArrowIcon } from '../icons'
import { SectionLabel } from '../ui/SectionLabel'

export function LivestockCaseStudyBlock() {
  return (
    <section className="section-off section-block">
      <div className="container">
        <SectionLabel>Featured case study</SectionLabel>
        <div className="featured-project-card rounded-xl border border-border bg-white">
          <div className="min-w-0">
            <h2 className="heading-section">MarbleSemen.com</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Full-stack cattle genetics and sale management platform. We replaced a manual
              spreadsheet workflow with a custom buyer portal, EPD tracking dashboard, and semen
              inventory system for a real Wagyu operation.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {['React', 'Django', 'PostgreSQL', 'AWS', 'Authorize.net'].map((tag) => (
                <li key={tag} className="pill-tech">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/#work"
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
