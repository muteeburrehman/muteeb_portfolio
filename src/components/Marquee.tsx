import { MARQUEE_ITEMS } from '../data/portfolio'

const TICKER = MARQUEE_ITEMS.join(' • ') + ' • '

type MarqueeProps = {
  hideOnContact?: boolean
}

export function Marquee({ hideOnContact }: MarqueeProps) {
  if (hideOnContact) return null

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-30 overflow-hidden border-t border-white/5 bg-bg/90 py-4 backdrop-blur-md"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <span className="shrink-0 px-4 font-mono text-xs tracking-widest text-white/20">
          {TICKER}
        </span>
        <span className="shrink-0 px-4 font-mono text-xs tracking-widest text-white/20">
          {TICKER}
        </span>
      </div>
    </div>
  )
}
