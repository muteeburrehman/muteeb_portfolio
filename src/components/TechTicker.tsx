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

const TICKER = TICKER_ITEMS.join(' · ') + ' · '

export function TechTicker() {
  return (
    <div
      className="section-dark overflow-hidden border-y border-white/[0.07]"
      aria-hidden="true"
    >
      <div className="relative py-3">
        <div className="flex w-max animate-ticker">
          <span className="shrink-0 px-6 font-mono text-[11px] tracking-wide text-on-dark-muted">
            {TICKER}
          </span>
          <span className="shrink-0 px-6 font-mono text-[11px] tracking-wide text-on-dark-muted">
            {TICKER}
          </span>
        </div>
      </div>
    </div>
  )
}
