import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  EMAIL,
  FOOTER_FOCUS,
  NAME,
  NAV_LINKS,
  ROLE,
  SOCIAL_LINKS,
} from '../data/portfolio'
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const

function FooterNavLink({ to, label }: { to: string; label: string }) {
  const base =
    'group inline-flex items-center gap-2 text-sm transition-colors hover:text-white'

  if (to.includes('#')) {
    return (
      <a href={to} className={`${base} text-white/45`}>
        <span className="h-px w-3 bg-white/15 transition-all group-hover:w-5 group-hover:bg-sky-400/60" />
        {label}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive ? 'font-medium text-white' : 'text-white/45'}`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`h-px transition-all ${
              isActive ? 'w-5 bg-sky-400/70' : 'w-3 bg-white/15 group-hover:w-5 group-hover:bg-sky-400/60'
            }`}
          />
          {label}
        </>
      )}
    </NavLink>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const activeSocials = SOCIAL_LINKS.filter((s) => s.url.trim().length > 0)

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/8 bg-surface/80 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-sky-500/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 pb-28 lg:px-10 lg:py-20 lg:pb-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-white/5 pb-10">
          <Link
            to="/"
            className="group inline-flex items-end gap-2 font-display tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <span className="text-5xl leading-none sm:text-6xl lg:text-7xl">
              MUR<span className="text-gradient">.</span>
            </span>
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available · UTC+5
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="max-w-sm text-base leading-relaxed text-white/55">{ROLE}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {FOOTER_FOCUS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/50"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase">
              Navigate
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <FooterNavLink key={to} to={to} label={label} />
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase">
              Connect
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-sky-400/35 hover:bg-sky-500/[0.04]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/12 text-sky-300 transition-colors group-hover:bg-sky-500/20">
                <MailIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] tracking-wider text-white/40 uppercase">
                  Email me
                </span>
                <span className="block truncate text-sm font-medium text-white group-hover:text-sky-200">
                  {EMAIL}
                </span>
              </span>
              <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {activeSocials.map(({ label, url, icon }) => {
                const Icon = socialIcons[icon]
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/55 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Icon />
                  </a>
                )
              })}

              {pathname !== '/contact' && (
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/85 transition-all hover:border-sky-400/40 hover:bg-white/[0.04] hover:text-white"
                >
                  Contact form
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/35 sm:text-left">
            © {year} {NAME}. Crafted with React &amp; Tailwind.
          </p>
          <p className="text-center text-xs text-white/25 sm:text-right">
            Python · AI · Full Stack · Cloud
          </p>
        </div>
      </div>
    </footer>
  )
}
