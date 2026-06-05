import { Link } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { ArrowIcon } from '../components/icons'
import { ClockIcon, MailIcon, SparklesIcon } from '../components/icons'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { EMAIL, NAME, REPLY_TIME, ROLE, SERVICES } from '../data/portfolio'

export function ContactPage() {
  return (
    <div className="section-off min-h-screen pb-16 pt-8">
      <div className="container section-block">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="heading-section max-w-3xl">
            Let&apos;s build <span className="text-gradient">something smart</span> together.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Have an AI project, full stack app, or cloud deployment in mind? Send a message — you
            get an instant confirmation, and I reply personally {REPLY_TIME}.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal as="aside" delay={80} className="space-y-6 lg:col-span-2">
            <div className="panel-surface p-6">
              <h2 className="text-sm font-semibold text-white">Direct contact</h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex min-h-[44px] items-start gap-4 rounded-lg p-2 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-hover">
                      <MailIcon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] tracking-wider text-muted uppercase">
                        Email
                      </span>
                      <span className="block truncate text-sm text-white/90 group-hover:text-accent-hover">
                        {EMAIL}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex min-h-[44px] items-start gap-4 rounded-lg p-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <ClockIcon />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-wider text-muted uppercase">
                      Response time
                    </span>
                    <span className="block text-sm text-white/90">{REPLY_TIME}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="panel-surface border-accent/20 bg-accent/5 p-6">
              <h2 className="text-sm font-semibold text-white">Book a discovery call</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Pick an open slot on our calendar — confirmation email includes your Meet or Zoom
                link.
              </p>
              <Link
                to="/book"
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
              >
                Schedule a call
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="panel-surface p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent-hover">
                  <SparklesIcon className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-sm font-semibold text-white">What I can help with</h2>
              </div>
              <ul className="space-y-4">
                {SERVICES.map((s) => (
                  <li key={s.title} className="border-l-2 border-white/10 pl-4">
                    <p className="text-sm font-medium text-white/90">{s.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-muted">
              {NAME} · {ROLE}
            </p>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
