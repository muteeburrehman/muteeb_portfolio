import { ContactForm } from '../components/ContactForm'
import { ClockIcon, MailIcon, SparklesIcon } from '../components/icons'
import { GradientGlow } from '../components/ui/GradientGlow'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { EMAIL, NAME, ROLE, SERVICES } from '../data/portfolio'

export function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-32 lg:pt-32">
      <GradientGlow />
      <div aria-hidden="true" className="grid-pattern pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            Let&apos;s build{' '}
            <span className="text-gradient">something smart</span> together.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/55">
            Have an AI project, full stack app, or cloud deployment in mind? Send a message — I
            typically reply within 24 hours.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal as="aside" delay={80} className="space-y-6 lg:col-span-2">
            <div className="border-gradient relative overflow-hidden rounded-2xl bg-surface-elevated p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-10 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl"
              />
              <h2 className="relative text-sm font-semibold text-white">Direct contact</h2>
              <ul className="relative mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/12 text-sky-300 transition-colors group-hover:bg-sky-500/20">
                      <MailIcon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] tracking-wider text-white/40 uppercase">
                        Email
                      </span>
                      <span className="block truncate text-sm text-white group-hover:text-sky-200">
                        {EMAIL}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 rounded-xl p-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <ClockIcon />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-wider text-white/40 uppercase">
                      Response time
                    </span>
                    <span className="block text-sm text-white">Within 24 hours</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/12 text-purple-300">
                  <SparklesIcon className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-sm font-semibold text-white">What I can help with</h2>
              </div>
              <ul className="space-y-4">
                {SERVICES.map((s) => (
                  <li key={s.title} className="border-l border-white/8 pl-4">
                    <p className="text-sm font-medium text-white/90">{s.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-white/30">
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
