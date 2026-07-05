import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaseStudySections } from '../components/marketing/CaseStudySections'
import { BOOK_CALL_PATH, MARBLESEMEN_CASE_STUDY } from '../data/portfolio'
import { ArrowIcon, ExternalLinkIcon } from '../components/icons'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'

const cs = MARBLESEMEN_CASE_STUDY

const META_TAGS = [...cs.industry.split(' · '), cs.location]

function CaseStudyShowcase() {
  return (
    <div className="case-study-showcase case-study-showcase--card">
      <div className="case-study-showcase__frame">
        <div className="project-browser">
          <div className="project-browser__chrome">
            <span className="project-browser__dot" />
            <span className="project-browser__dot" />
            <span className="project-browser__dot" />
            <span className="project-browser__url">marblesemen.com</span>
          </div>
          <div className="project-browser__viewport case-study-showcase__viewport">
            <img
              src={cs.image}
              alt={cs.imageAlt}
              className="case-study-showcase__image"
              width={1024}
              height={539}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MarbleSemenCaseStudy() {
  useEffect(() => {
    document.title = `Case Study: ${cs.title} | MuteebLabs`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute(
        'content',
        'How MuteebLabs built MarbleSemen.com — a Wagyu cattle genetics e-commerce platform for a US breeder operation.',
      )
    }
  }, [])

  return (
    <article className="case-study-page">
      <header className="case-study-hero">
        <div className="glow-radial" style={{ top: '-10%', right: '-10%' }} aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />

        <div className="container case-study-hero__inner">
          <Link to="/#work" className="case-study-back">
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
            Back to work
          </Link>

          <div className="case-study-hero__grid">
            <div className="case-study-hero__copy">
              <SectionLabel>Case study</SectionLabel>

              <ul className="case-study-meta-tags" aria-label="Project categories">
                {META_TAGS.map((tag) => (
                  <li key={tag} className="case-study-meta-tag">
                    {tag}
                  </li>
                ))}
              </ul>

              <h1 className="case-study-hero__title">{cs.title}</h1>
              <p className="case-study-hero__sub">{cs.subtitle}</p>

              <ul className="case-study-stack">
                {cs.stack.map((tag) => (
                  <li key={tag} className="pill-tech">
                    {tag}
                  </li>
                ))}
              </ul>

              <dl className="case-study-meta-card">
                <div>
                  <dt>Client</dt>
                  <dd>{cs.client}</dd>
                </div>
                <div>
                  <dt>Our role</dt>
                  <dd>{cs.role}</dd>
                </div>
                <div>
                  <dt>Timeline</dt>
                  <dd>{cs.timeline}</dd>
                </div>
              </dl>

              <div className="case-study-hero__actions">
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-compact btn-compact--primary"
                >
                  Visit live site
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                </a>
                <Link to={BOOK_CALL_PATH} className="btn-compact btn-compact--ghost">
                  Book a call
                </Link>
              </div>
            </div>

            <Reveal delay={80} className="case-study-hero__media">
              <CaseStudyShowcase />
            </Reveal>
          </div>
        </div>
      </header>

      <CaseStudySections content={cs} />

      <section className="case-study-cta">
        <div className="container case-study-content">
          <Reveal>
            <div className="case-study-cta__card">
              <h2 className="case-study-cta__title">See it live</h2>
              <p className="case-study-cta__text">
                The platform is in production for a real US Wagyu genetics business — not a concept
                mockup.
              </p>
              <div className="case-study-cta__actions">
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-compact btn-compact--primary"
                >
                  Visit {cs.title}
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                </a>
                <Link to={BOOK_CALL_PATH} className="btn-compact btn-compact--ghost">
                  Book a discovery call
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="case-study-footer-link">
              <Link to="/livestock-software">Explore our livestock software services →</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
