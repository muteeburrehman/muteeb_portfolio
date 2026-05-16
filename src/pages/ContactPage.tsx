import { ContactForm } from '../components/ContactForm'
import { ClockIcon, MailIcon } from '../components/icons'
import { GradientGlow } from '../components/ui/GradientGlow'
import { SectionLabel } from '../components/ui/SectionLabel'
import { EMAIL, NAME, ROLE, SERVICES } from '../data/portfolio'

export function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-32 lg:pt-32">
      <GradientGlow />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          Let&apos;s build{' '}
          <span className="text-gradient">something smart</span> together.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/50">
          Have an AI project, full stack app, or cloud deployment in mind? Send a message — I
          typically reply within 24 hours.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <aside className="space-y-6 lg:col-span-2">
            <div className="border-gradient rounded-2xl bg-surface-elevated p-6">
              <h2 className="text-sm font-semibold text-white">Direct contact</h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                      <MailIcon />
                    </span>
                    <span>
                      <span className="block text-xs text-white/40">Email</span>
                      <span className="text-sm text-white group-hover:text-sky-300">{EMAIL}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 rounded-xl p-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <ClockIcon />
                  </span>
                  <span>
                    <span className="block text-xs text-white/40">Response time</span>
                    <span className="text-sm text-white">Within 24 hours</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/5 bg-surface p-6">
              <h2 className="text-sm font-semibold text-white">What I can help with</h2>
              <ul className="mt-4 space-y-4">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <p className="text-sm font-medium text-white/90">{s.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-white/30">
              {NAME} · {ROLE}
            </p>
          </aside>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
