export function ScrollHint() {
  return (
    <aside
      className="pointer-events-none fixed top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] tracking-[0.38em] text-white/30 [writing-mode:vertical-rl]">
        SCROLL
      </span>
      <span className="relative h-28 w-px overflow-hidden bg-white/10">
        <span className="absolute top-0 left-0 h-1/2 w-full animate-float bg-linear-to-b from-sky-400/85 via-accent-light/40 to-transparent" />
      </span>
    </aside>
  )
}
