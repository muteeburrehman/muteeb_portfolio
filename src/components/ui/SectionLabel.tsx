type SectionLabelProps = {
  children: string
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`label-tag mb-3 ${className}`}>
      — {children}
    </p>
  )
}
