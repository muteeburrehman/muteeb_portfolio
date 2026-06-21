import { BOOK_CALL_PATH } from '../../data/portfolio'
import { ArrowIcon } from '../icons'

type PageHeroProps = {
  badge: string
  headline: string
  subtext: string
}

export function PageHero({ badge, headline, subtext }: PageHeroProps) {
  return (
    <section className="section-dark page-hero dot-grid-dark relative overflow-hidden">
      <div className="container relative z-10">
        <div className="page-hero-inner">
          <p className="label-tag mb-4">{badge}</p>
          <h1 className="heading-display text-[clamp(1.75rem,4vw,2.75rem)]">
            {headline}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-on-dark-muted sm:text-lg">
            {subtext}
          </p>
          <a
            href={BOOK_CALL_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            Book a Free Discovery Call
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
