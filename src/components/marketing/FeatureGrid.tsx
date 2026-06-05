import { SectionLabel } from '../ui/SectionLabel'

export type FeatureItem = {
  title: string
  description: string
}

type FeatureGridProps = {
  label?: string
  items: FeatureItem[]
  columns?: 3 | 2
}

export function FeatureGrid({ label, items, columns = 3 }: FeatureGridProps) {
  const colClass =
    columns === 3
      ? 'md:grid-cols-2 lg:grid-cols-3'
      : 'md:grid-cols-2'

  return (
    <section className="section-white section-block">
      <div className="container">
        {label ? <SectionLabel>{label}</SectionLabel> : null}
        <div className={`grid gap-6 ${colClass}`}>
          {items.map((item) => (
            <article key={item.title} className="card-light h-full">
              <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
