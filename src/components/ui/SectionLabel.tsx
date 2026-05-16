import type { ReactNode } from 'react'

type SectionLabelProps = {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-white/40 uppercase ${className}`}
    >
      <span className="h-px w-6 bg-linear-to-r from-sky-400/60 to-transparent" aria-hidden="true" />
      {children}
    </p>
  )
}
