import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH } from '../../data/portfolio'
import { ArrowIcon } from '../icons'

type PageHeroProps = {
  badge: string
  headline: string
  subtext: string
  backgroundImage?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export function PageHero({
  badge,
  headline,
  subtext,
  backgroundImage,
  primaryLabel = 'Book a discovery call',
  primaryTo = BOOK_CALL_PATH,
  secondaryLabel,
  secondaryTo,
}: PageHeroProps) {
  return (
    <section className={`page-hero${backgroundImage ? ' page-hero--photo' : ''}`}>
      {backgroundImage ? (
        <div
          className="page-hero__photo"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="page-hero-glow page-hero-glow--green" aria-hidden="true" />
      <div className="page-hero-glow page-hero-glow--blue" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="page-hero-inner">
          <p className="label-tag">{badge}</p>
          <h1 className="heading-display page-hero-title">{headline}</h1>
          <p className="page-hero-subtext">{subtext}</p>
          <div className="page-hero-actions">
            <Link to={primaryTo} className="btn-primary page-hero-cta">
              {primaryLabel}
              <ArrowIcon className="h-4 w-4" />
            </Link>
            {secondaryLabel && secondaryTo ? (
              <Link to={secondaryTo} className="btn-secondary">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
