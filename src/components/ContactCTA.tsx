import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, EMAIL } from '../data/portfolio'
import { ArrowIcon, MailIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function ContactCTA() {
  return (
    <section id="contact" className="section-block section-block--compact bg-[#030712] border-t border-slate-900">
      <div className="glow-radial" style={{ top: '-10%', left: '30%' }} aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal>
          <div className="glass-panel p-6 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl min-w-0">
              <SectionLabel>Next step</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Tell us what&apos;s <span className="text-gradient">blocking you</span>
              </h2>
              <p className="text-base text-slate-400">
                A short call is enough to decide if we&apos;re the right fit — and what a first
                release should look like.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2.5 text-sm text-teal-400 font-semibold mt-4 hover:text-teal-300 transition-colors break-all"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
            </div>

            <div className="mt-8 flex w-full min-w-0 flex-col gap-3 lg:mt-0 lg:w-auto lg:shrink-0 lg:flex-row lg:flex-wrap lg:gap-4">
              <Link
                to={BOOK_CALL_PATH}
                className="btn-primary w-full justify-center lg:w-auto"
              >
                Book Discovery Call
                <ArrowIcon className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-secondary w-full justify-center lg:w-auto"
              >
                Email Directly
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
