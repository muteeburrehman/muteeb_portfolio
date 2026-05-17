import { useEffect, useState } from 'react'

type BackToTopProps = {
  hideOnContact?: boolean
}

export function BackToTop({ hideOnContact }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (hideOnContact) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`group fixed right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-bg/85 text-white/70 shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 hover:border-sky-400/45 hover:bg-sky-500/10 hover:text-sky-200 ${
        visible
          ? 'pointer-events-auto bottom-20 translate-y-0 opacity-100'
          : 'pointer-events-none bottom-16 translate-y-2 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
