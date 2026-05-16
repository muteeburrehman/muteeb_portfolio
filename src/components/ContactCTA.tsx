import { Link } from 'react-router-dom'
import { EMAIL } from '../data/portfolio'
import { ArrowIcon } from './icons'
import { SectionLabel } from './ui/SectionLabel'

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden border-t border-white/5">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-purple-600/10"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="border-gradient overflow-hidden rounded-3xl bg-surface-elevated p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <SectionLabel>Get in touch</SectionLabel>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Ready to start your <span className="text-gradient">next project</span>?
            </h2>
            <p className="mt-4 text-white/50">
              AI agents, full stack apps, voice interfaces, or AWS deployments — let&apos;s talk
              about what you&apos;re building.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-block text-sm text-sky-400/90 transition-colors hover:text-sky-300"
            >
              {EMAIL}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-all hover:opacity-90 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            >
              Go to Contact Page
              <ArrowIcon />
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Email directly
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
