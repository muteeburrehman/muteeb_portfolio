import { SectionLabel } from '../ui/SectionLabel'

type WhoItsForProps = {
  label?: string
  items: readonly string[]
}

export function WhoItsFor({ label = 'Who we build for', items }: WhoItsForProps) {
  return (
    <section className="audience-section section-block section-block--compact">
      <div className="container audience-section__inner">
        <SectionLabel className="justify-center">{label}</SectionLabel>
        <ul className="audience-chips">
          {items.map((item) => (
            <li key={item} className="audience-chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
