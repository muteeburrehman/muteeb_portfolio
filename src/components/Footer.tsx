import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  EMAIL,
  FOOTER_FOCUS,
  NAME,
  NAV_LINKS,
  ROLE,
  SITE_BRAND,
  SOCIAL_LINKS,
} from '../data/portfolio'
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const

function FooterNavLink({ to, label }: { to: string; label: string }) {
  const base = 'text-sm transition-colors hover:text-white'

  if (to.includes('#')) {
    return (
      <a href={to} className={`${base} text-on-dark-muted`}>
        {label}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive ? 'font-medium text-white' : 'text-on-dark-muted'}`
      }
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
    <footer className="section-dark border-t border-white/[0.08]">
      <div className="container section-block">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <Link to="/" className="font-display text-xl font-bold text-white">
              {SITE_BRAND}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">{ROLE}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FOOTER_FOCUS.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-on-dark-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="label-tag mb-4 text-on-dark-muted">Navigate</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <FooterNavLink key={to} to={to} label={label} />
              ))}
            </nav>
          </div>

          <div>
            <p className="label-tag mb-4 text-on-dark-muted">Connect</p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-[44px] items-center gap-2 text-sm text-white transition-colors hover:text-accent"
            >
              <MailIcon className="h-4 w-4 shrink-0" />
              {EMAIL}
            </a>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {activeSocials.map(({ label, url, icon }) => {
                const Icon = socialIcons[icon]
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-on-dark-muted transition-colors hover:border-white/20 hover:text-white"
                  >
                    <Icon />
                  </a>
                )
              })}

              {pathname !== '/contact' && (
                <Link
                  to="/contact"
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-white/15 px-4 text-sm text-white/90 transition-colors hover:border-accent hover:text-white"
                >
                  Contact form
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-8 sm:flex-row">
          <p className="text-xs text-on-dark-muted">
            © {year} {NAME}. Crafted with React &amp; Tailwind.
          </p>
          <p className="text-xs text-on-dark-muted/80">
            Python · AI · Full Stack · Cloud
          </p>
        </div>
      </div>
    </footer>
  )
}
