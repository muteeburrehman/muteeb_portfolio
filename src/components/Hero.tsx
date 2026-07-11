import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, FEATURED_CASE_STUDY, SITE_IMAGES } from '../data/portfolio'
import { ArrowIcon, ExternalLinkIcon } from './icons'

function HeroShowcase() {
  return (
    <div className="hero-showcase hero-showcase--card">
      <div className="hero-showcase__glow" aria-hidden="true" />
      <div className="hero-showcase__frame hero-showcase__frame--photo">
        <img
          src={SITE_IMAGES.heroVisual}
          alt="Tablet showing a cattle genetics catalog on a ranch at golden hour"
          className="hero-showcase__photo"
          width={1024}
          height={683}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="hero-showcase__footer">
        <div>
          <span className="hero-showcase__badge">
            <span className="hero-showcase__live-dot" aria-hidden="true" />
            Featured work
          </span>
          <p className="hero-showcase__title">{FEATURED_CASE_STUDY.name}</p>
          <p className="hero-showcase__desc">
            Wagyu genetics storefront for a US cattle operation.
          </p>
        </div>
        <div className="hero-showcase__actions">
          <Link to={FEATURED_CASE_STUDY.to} className="btn-compact btn-compact--primary">
            Case study
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
          <a
            href="https://marblesemen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-compact btn-compact--ghost"
          >
            Live site
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="hero hero--home">
      <div className="hero__atmosphere" aria-hidden="true">
        <div
          className="hero__backdrop hero__backdrop--photo"
          style={{ backgroundImage: `url(${SITE_IMAGES.heroBackdrop})` }}
        />
        <div className="hero__aurora hero__aurora--amber" />
        <div className="hero__aurora hero__aurora--teal" />
        <div className="hero__aurora hero__aurora--violet" />
        <div className="hero__particles" />
        <div className="hero__sheen" />
        <div className="hero__scrim" />
      </div>
      <div className="grid-overlay grid-overlay--subtle" />

      <div className="container relative z-10">
        <div className="hero-main-layout hero-main-layout--home">
          <div className="hero-left">
            <div className="hero-badge-container">
              <span className="hero-badge hero-badge-live">
                <span className="hero-badge-live-dot" />
                Accepting new clients
              </span>
              <span className="hero-badge">US · UK · Remote-friendly</span>
            </div>

            <h1 className="hero-title hero-title--display">
              <span className="hero-title__line">Custom software</span>
              <span className="hero-title__line">
                that <span className="hero-title__accent">ships</span>
              </span>
            </h1>

            <p className="hero-desc hero-desc--display">
              We build production platforms for niche operations — then stick around through launch.
            </p>

            <div className="hero-ctas">
              <Link to={BOOK_CALL_PATH} className="btn-primary">
                Book a discovery call
                <ArrowIcon className="h-5 w-5 shrink-0" />
              </Link>
              <a href="#work" className="btn-secondary">
                See our work
              </a>
            </div>
          </div>

          <div className="hero-right">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}
