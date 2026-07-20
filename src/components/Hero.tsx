import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, HERO_TRUST_ITEMS, SITE_BRAND, SITE_IMAGES } from '../data/portfolio'
import { ArrowIcon } from './icons'

export function Hero() {
  return (
    <section id="home" className="hero hero--home hero--company">
      <div className="hero__atmosphere" aria-hidden="true">
        <div
          className="hero__backdrop hero__backdrop--photo"
          style={{ backgroundImage: `url(${SITE_IMAGES.heroBackdrop})` }}
        />
        <div className="hero__scrim hero__scrim--company" />
      </div>

      <div className="container relative z-10">
        <div className="hero-company">
          <p className="hero-brand-mark">{SITE_BRAND}</p>

          <h1 className="hero-title hero-title--company">
            Custom software for real operations
          </h1>

          <p className="hero-desc hero-desc--company">
            We build and ship production platforms across motorsport contests, inventory,
            agribusiness, CJIS compliance, booking platforms, and agency workflows — then stick
            around through launch.
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

          <ul className="hero-verticals" aria-label="What we build">
            {HERO_TRUST_ITEMS.map((item) => (
              <li key={item.label} className="hero-verticals__item">
                <span className="hero-verticals__label">{item.label}</span>
                <span className="hero-verticals__detail">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
