import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH } from '../../data/portfolio'
import { ArrowIcon } from '../icons'

type PageCtaProps = {
  headline: string
  buttonLabel?: string
  backgroundImage?: string
}

export function PageCta({
  headline,
  buttonLabel = 'Book a discovery call',
  backgroundImage,
}: PageCtaProps) {
  return (
    <section className={`page-cta${backgroundImage ? ' page-cta--photo' : ''}`}>
      {backgroundImage ? (
        <div
          className="page-cta__photo"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="grid-overlay" aria-hidden="true" />
      <div className="container relative z-10 page-cta__inner">
        <h2 className="page-cta__title">{headline}</h2>
        <div className="page-cta__actions">
          <Link to={BOOK_CALL_PATH} className="btn-compact btn-compact--primary">
            {buttonLabel}
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
          <Link to="/contact" className="btn-compact btn-compact--ghost">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  )
}
