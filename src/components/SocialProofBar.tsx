import { TRUST_BAR_ITEMS } from '../data/portfolio'

export function SocialProofBar() {
  return (
    <section
      aria-label="Company credentials"
      className="border-y border-white/5 bg-surface/40 px-6 py-5 backdrop-blur-sm lg:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs text-white/45 sm:text-sm">
        {TRUST_BAR_ITEMS.map((item, i) => (
          <span key={item} className="inline-flex items-center gap-3">
            {i > 0 ? (
              <span aria-hidden="true" className="hidden text-white/20 sm:inline">
                |
              </span>
            ) : null}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
