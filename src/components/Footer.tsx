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
    'text-sm transition-colors hover:text-white'
  const active = 'text-white font-medium'

  if (to.includes('#')) {
    return (
      <a href={to} className={`${base} text-white/45`}>
        {label}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${base} ${isActive ? active : 'text-white/45'}`}
    >
      {label}
    </NavLink>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const activeSocials = SOCIAL_LINKS.filter((s) => s.url.trim().length > 0)

  return (
    <footer className="relative mt-auto border-t border-white/8 bg-surface/80 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/30 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-14 pb-28 lg:px-10 lg:py-16 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block font-display text-2xl tracking-tight text-white transition-opacity hover:opacity-80"
            >
              MUR.
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">{ROLE}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {FOOTER_FOCUS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] text-white/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
              Navigate
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <FooterNavLink key={to} to={to} label={label} />
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="lg:col-span-6">
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
              Connect
            </p>
            <p className="mb-5 max-w-md text-sm text-white/45">
              Open to freelance, contract, and full-time work. Drop a line about your AI or full
              stack project.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-sky-400/30 hover:bg-sky-500/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-colors group-hover:bg-sky-500/20">
                <MailIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-white/40">Email me at</span>
                <span className="block truncate text-sm font-medium text-white group-hover:text-sky-200">
                  {EMAIL}
                </span>
              </span>
              <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/60" />
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {activeSocials.map(({ label, url, icon }) => {
                const Icon = socialIcons[icon]
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <Icon />
                  </a>
                )
              })}

              {pathname !== '/contact' && (
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white ${activeSocials.length === 0 ? '' : 'sm:ml-1'}`}
                >
                  Contact form
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/30 sm:text-left">
            © {year} {NAME}. Crafted with React &amp; Tailwind.
          </p>
          <p className="text-center text-xs text-white/20 sm:text-right">
            Python · AI · Full Stack · Cloud
          </p>
        </div>
      </div>
    </footer>
  )
}
