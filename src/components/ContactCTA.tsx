import { Link } from 'react-router-dom'
import { EMAIL } from '../data/portfolio'
import { ArrowIcon, MailIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-sky-500/5 via-transparent to-purple-600/10"
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="border-gradient relative overflow-hidden rounded-3xl bg-surface-elevated p-8 sm:p-12 lg:p-16">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -bottom-14 font-display text-[10rem] leading-none tracking-tight text-white/[0.025] sm:text-[14rem]"
            >
              NEXT
            </span>

            <div className="relative lg:flex lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <SectionLabel>Let&apos;s collaborate</SectionLabel>
                <h2 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                  Ready to start your <br />
                  <span className="text-gradient">next project</span>?
                </h2>
                <p className="mt-5 max-w-md text-base text-white/55 sm:text-lg">
                  AI agents, full stack apps, voice interfaces, or AWS deployments — let&apos;s
                  talk about what you&apos;re building.
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-sky-300 transition-colors hover:text-sky-200"
                >
                  <MailIcon className="h-4 w-4" />
                  {EMAIL}
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)]"
                >
                  Start a project
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.08]"
                >
                  Email directly
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
