import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AGENCY_SERVICES } from '../../data/portfolio'
import { ArrowIcon, CheckIcon } from '../icons'
import { Reveal } from '../ui/Reveal'

type CaseStudyContent = {
  overview: string
  challenge: readonly string[]
  approach: readonly string[]
  delivered: readonly string[]
  results: readonly string[]
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'approach', label: 'Approach' },
  { id: 'delivered', label: 'What we built' },
  { id: 'results', label: 'Results' },
  { id: 'services', label: 'Services' },
] as const

const RELATED_SERVICE_PATHS = ['/livestock-software', '/qa-testing', '/ai-automation'] as const

function useScrollSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

function ChallengeList({ items }: { items: readonly string[] }) {
  return (
    <ul className="case-study-points">
      {items.map((item) => (
        <li key={item} className="case-study-point case-study-point--challenge">
          <span className="case-study-point__icon case-study-point__icon--warn" aria-hidden="true">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StepList({ items }: { items: readonly string[] }) {
  return (
    <ol className="case-study-steps">
      {items.map((item, index) => (
        <li key={item} className="case-study-step">
          <span className="case-study-step__num">{String(index + 1).padStart(2, '0')}</span>
          <p className="case-study-step__text">{item}</p>
        </li>
      ))}
    </ol>
  )
}

function DeliveredList({ items }: { items: readonly string[] }) {
  return (
    <ul className="case-study-delivered">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon className="case-study-delivered__icon" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ResultsList({ items }: { items: readonly string[] }) {
  return (
    <ul className="case-study-results">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function RelatedServices() {
  const services = AGENCY_SERVICES.filter((service) =>
    RELATED_SERVICE_PATHS.includes(service.to as (typeof RELATED_SERVICE_PATHS)[number]),
  )

  return (
    <div className="case-study-services">
      <p className="case-study-services__lead">
        This project drew on our livestock, QA, and automation capabilities. Explore how we help
        similar teams.
      </p>
      <ul className="case-study-services__grid">
        {services.map((service) => (
          <li key={service.to}>
            <Link to={service.to} className="case-study-service-card">
              <span className="case-study-service-card__title">{service.title}</span>
              <span className="case-study-service-card__problem">{service.problem}</span>
              <span className="case-study-service-card__solution">{service.solution}</span>
              <span className="case-study-service-card__link">
                Learn more
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CaseStudySections({ content }: { content: CaseStudyContent }) {
  const activeId = useScrollSpy(TABS.map((tab) => tab.id))

  return (
    <section className="case-study-section">
      <div className="container">
        <div className="case-study-body">
          <nav className="case-study-tabs" aria-label="Case study sections">
            {TABS.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`case-study-tab${activeId === tab.id ? ' case-study-tab--active' : ''}`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="case-study-panels">
            <Reveal as="section" id="overview" className="case-study-panel">
              <p className="case-study-panel__eyebrow">01 · Overview</p>
              <h2 className="case-study-panel__title">Project background</h2>
              <p className="case-study-prose">{content.overview}</p>
            </Reveal>

            <Reveal as="section" delay={60} id="challenge" className="case-study-panel">
              <p className="case-study-panel__eyebrow">02 · The challenge</p>
              <h2 className="case-study-panel__title">What needed to change</h2>
              <ChallengeList items={content.challenge} />
            </Reveal>

            <Reveal as="section" delay={80} id="approach" className="case-study-panel">
              <p className="case-study-panel__eyebrow">03 · Our approach</p>
              <h2 className="case-study-panel__title">How we delivered it</h2>
              <StepList items={content.approach} />
            </Reveal>

            <Reveal as="section" delay={100} id="delivered" className="case-study-panel">
              <p className="case-study-panel__eyebrow">04 · What we built</p>
              <h2 className="case-study-panel__title">Platform deliverables</h2>
              <DeliveredList items={content.delivered} />
            </Reveal>

            <Reveal as="section" delay={120} id="results" className="case-study-panel">
              <p className="case-study-panel__eyebrow">05 · Results</p>
              <h2 className="case-study-panel__title">Outcomes in production</h2>
              <ResultsList items={content.results} />
            </Reveal>

            <Reveal as="section" delay={140} id="services" className="case-study-panel">
              <p className="case-study-panel__eyebrow">06 · Services</p>
              <h2 className="case-study-panel__title">Related capabilities</h2>
              <RelatedServices />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
