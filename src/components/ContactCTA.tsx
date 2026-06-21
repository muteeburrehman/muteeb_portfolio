import { BOOK_CALL_PATH, EMAIL } from '../data/portfolio'
import { ArrowIcon, MailIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function ContactCTA() {
  return (
    <section id="contact" className="section-block relative overflow-hidden" style={{ background: 'var(--bg-dark-3)' }}>
      {/* Ambient glow */}
      <div className="ambient-orb ambient-orb--1" style={{ top: '-30%', left: '20%' }} aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal>
          <div className="glass-card-static rounded-2xl border border-[rgba(0,120,215,0.14)] bg-white p-8 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-12">
            <div className="max-w-xl">
              <SectionLabel>Get started</SectionLabel>
              <h2 className="heading-section">
                Ready to Build <br />
                <span className="text-gradient">Something?</span>
              </h2>
              <p className="mt-4 text-base text-muted sm:text-lg">
                Book a free 30-minute discovery call. We&apos;ll tell you exactly what your
                platform needs and what it costs — no obligation.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm text-accent-hover transition-colors hover:text-accent"
              >
                <MailIcon className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <a
                href={BOOK_CALL_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-light"
              >
                Book a Discovery Call
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-ghost-dark"
              >
                Email directly
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
