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
      className={`group fixed right-6 z-40 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-white text-text-primary shadow-lg transition-all duration-300 hover:border-accent hover:text-accent ${
        visible
          ? 'pointer-events-auto bottom-8 translate-y-0 opacity-100'
          : 'pointer-events-none bottom-6 translate-y-2 opacity-0'
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
