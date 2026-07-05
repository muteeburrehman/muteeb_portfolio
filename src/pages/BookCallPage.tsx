import { Link } from 'react-router-dom'
import { BookingScheduler } from '../components/BookingScheduler'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { EMAIL, REPLY_TIME } from '../data/portfolio'

const FUNNEL_STEPS = [
  { step: '01', title: 'Book', text: 'Pick an open slot that fits your calendar.' },
  { step: '02', title: 'Meet', text: 'Join via your Google Meet or Zoom link.' },
  { step: '03', title: 'Plan', text: 'We scope the project and outline next steps.' },
] as const

export function BookCallPage() {
  return (
    <div className="section-off min-h-screen pb-16 pt-8">
      <div className="container section-block">
        <Reveal>
          <SectionLabel>Schedule</SectionLabel>
          <h1 className="heading-section max-w-3xl">
            Book a free <span className="text-gradient">discovery call</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Choose a time below. Each slot is reserved for one client — if someone books a time, it
            disappears for everyone else until they cancel or you free the slot. Confirmation
            emails include a cancel link.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {FUNNEL_STEPS.map((item, i) => (
            <Reveal key={item.step} delay={60 + i * 40} as="li">
              <div className="panel-surface h-full p-5">
                <span className="font-mono text-[11px] tracking-wider text-accent uppercase">
                  {item.step}
                </span>
                <p className="mt-2 font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-12">
          <BookingScheduler />
        </Reveal>

        <div className="book-call-footer">
          <p className="book-call-footer__text">
            Prefer a message instead?
          </p>
          <div className="book-call-footer__actions">
            <Link to="/contact" className="btn-compact btn-compact--primary">
              Contact form
            </Link>
            <a href={`mailto:${EMAIL}`} className="btn-compact btn-compact--ghost">
              {EMAIL}
            </a>
          </div>
          <p className="book-call-footer__note">We reply {REPLY_TIME}.</p>
        </div>
      </div>
    </div>
  )
}
