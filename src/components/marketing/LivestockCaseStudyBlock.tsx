import { Link } from 'react-router-dom'
import { FEATURED_CASE_STUDY, SITE_IMAGES } from '../../data/portfolio'
import { ArrowIcon } from '../icons'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function LivestockCaseStudyBlock() {
  const { name, description, tags, to } = FEATURED_CASE_STUDY

  return (
    <section className="livestock-case-block">
      <div className="container">
        <Reveal>
          <SectionLabel>Featured case study</SectionLabel>
          <div className="livestock-case-card">
            <div className="livestock-case-grid">
              <div className="livestock-case-media">
                <img
                  src={SITE_IMAGES.angusHerd}
                  alt="Black Angus cattle herd on open pasture"
                  loading="lazy"
                  className="livestock-case-photo"
                />
              </div>
              <div className="livestock-case-content">
                <h2 className="heading-section">{name}</h2>
                <p className="livestock-case-desc">{description}</p>
                <ul className="livestock-case-tags">
                  {tags.map((tag) => (
                    <li key={tag} className="pill-tech">
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link to={to} className="btn-compact btn-compact--primary">
                  Case study
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
