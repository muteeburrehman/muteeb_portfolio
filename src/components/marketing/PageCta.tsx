import { BOOK_CALL_PATH } from '../../data/portfolio'
import { ArrowIcon } from '../icons'

type PageCtaProps = {
  headline: string
  buttonLabel?: string
}

export function PageCta({
  headline,
  buttonLabel = 'Book a Free Discovery Call',
}: PageCtaProps) {
  return (
    <section className="section-dark section-block dot-grid-dark">
      <div className="container text-center">
        <h2 className="heading-display mx-auto max-w-xl text-[clamp(1.5rem,3.5vw,2.25rem)]">
          {headline}
        </h2>
        <a
          href={BOOK_CALL_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          {buttonLabel}
          <ArrowIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
