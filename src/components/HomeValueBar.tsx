import { HOME_VALUE_PROPS } from '../data/portfolio'
import { Reveal } from './ui/Reveal'

export function HomeValueBar() {
  return (
    <section className="py-10" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="container">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_VALUE_PROPS.map((item, i) => (
            <Reveal key={item.title} delay={i * 50} as="div">
              <div className="glass-card p-5">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
