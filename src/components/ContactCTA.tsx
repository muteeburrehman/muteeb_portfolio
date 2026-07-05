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
          <div className="glass-panel p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <SectionLabel>Start Your Project</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Ready to build <span className="text-gradient">something that ships?</span>
              </h2>
              <p className="text-base text-slate-400">
                Book a free discovery call — we&apos;ll scope the problem and outline next steps.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2.5 text-sm text-teal-400 font-semibold mt-4 hover:text-teal-300 transition-colors"
              >
                <MailIcon className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:mt-0 lg:w-auto lg:shrink-0">
              <a
                href={BOOK_CALL_PATH}
                className="btn-primary w-full justify-center sm:w-auto"
              >
                Book Discovery Call
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn-secondary w-full justify-center sm:w-auto"
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
