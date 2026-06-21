import { MARQUEE_ITEMS } from '../data/portfolio'

const TICKER = MARQUEE_ITEMS.join(' • ') + ' • '

type MarqueeProps = {
  hideOnContact?: boolean
}

export function Marquee({ hideOnContact }: MarqueeProps) {
  if (hideOnContact) return null

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-30 overflow-hidden border-t border-border bg-white/90 backdrop-blur-md"
      aria-hidden="true"
    >
      <div className="relative py-3.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-bg to-transparent" />
        <div className="flex w-max animate-marquee">
          <span className="shrink-0 px-4 font-mono text-xs tracking-widest text-muted">
            {TICKER}
          </span>
          <span className="shrink-0 px-4 font-mono text-xs tracking-widest text-muted">
            {TICKER}
          </span>
        </div>
      </div>
    </div>
  )
}
