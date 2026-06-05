type GradientGlowProps = {
  className?: string
}

export function GradientGlow({ className = '' }: GradientGlowProps) {
  return (
    <>
      <div
        className={`glow-orb -top-32 left-1/4 h-72 w-72 bg-sky-500/20 ${className}`}
        aria-hidden="true"
      />
      <div
        className={`glow-orb top-1/3 right-0 h-96 w-96 bg-accent/12 ${className}`}
        aria-hidden="true"
      />
      <div
        className={`glow-orb bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 bg-sky-400/10 ${className}`}
        aria-hidden="true"
      />
    </>
  )
}
