const TICKER_ITEMS = [
  'LANGCHAIN',
  'OPENAI',
  'GEMINI',
  'CLAUDE',
  'QDRANT',
  'N8N',
  'VOICE AGENTS',
  'VECTOR DBs',
  'AI AGENTS',
  'AWS',
  'EC2',
  'LAMBDA',
  'ELASTICSEARCH',
  'PYTHON',
  'REACT',
  'POSTGRESQL',
] as const

const TICKER = TICKER_ITEMS.join('  ·  ') + '  ·  '

export function TechTicker() {
  return (
    <div
      className="overflow-hidden"
      aria-hidden="true"
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="relative py-3.5">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style={{ background: 'linear-gradient(90deg, var(--bg-dark), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style={{ background: 'linear-gradient(270deg, var(--bg-dark), transparent)' }} />

        <div className="flex w-max animate-ticker">
          <span className="shrink-0 px-6 font-mono text-[11px] tracking-wider text-white/20">
            {TICKER}
          </span>
          <span className="shrink-0 px-6 font-mono text-[11px] tracking-wider text-white/20">
            {TICKER}
          </span>
        </div>
      </div>
    </div>
  )
}
