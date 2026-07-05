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
  const colClass = columns === 3 ? 'feature-grid--three' : 'feature-grid--two'

  return (
    <section className="feature-grid-section section-block section-block--compact">
      <div className="container">
        {label ? <SectionLabel>{label}</SectionLabel> : null}
        <div className={`feature-grid ${colClass}`}>
          {items.map((item) => (
            <article key={item.title} className="feature-card">
              <h3 className="feature-card__title">{item.title}</h3>
              <p className="feature-card__desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
