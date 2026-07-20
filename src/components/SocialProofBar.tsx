import { TRUST_BAR_ITEMS } from '../data/portfolio'

export function SocialProofBar() {
  return (
    <section aria-label="Markets we serve" className="social-proof-bar">
      <div className="social-proof-bar__inner">
        {TRUST_BAR_ITEMS.map((item, i) => (
          <span key={item} className="inline-flex items-center gap-3">
            {i > 0 ? (
              <span aria-hidden="true" className="social-proof-bar__sep">
                ·
              </span>
            ) : null}
            <span className="social-proof-bar__item">{item}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
