import { TRUST_BAR_ITEMS } from '../data/portfolio'

export function SocialProofBar() {
  return (
    <section aria-label="Companies we've worked with" className="social-proof-bar">
      <div className="container social-proof-bar__inner">
        <p className="social-proof-bar__lead">Work shipped for</p>
        <ul className="social-proof-bar__clients">
          {TRUST_BAR_ITEMS.map((item) => (
            <li key={item} className="social-proof-bar__client">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
