import { Link, NavLink } from 'react-router-dom'
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
      <a href={to} className={`${base} text-muted`}>
        {label}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive ? 'font-medium text-white' : 'text-muted'}`
      }
    >
      {label}
    </NavLink>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const activeSocials = SOCIAL_LINKS.filter((s) => s.url.trim().length > 0)

  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container section-block">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            <Link to="/" className="font-display text-xl font-bold text-white">
              {SITE_BRAND}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{ROLE}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FOOTER_FOCUS.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="label-tag mb-4 text-muted">Navigate</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <FooterNavLink key={to} to={to} label={label} />
              ))}
            </nav>
          </div>

          <div>
            <p className="label-tag mb-4 text-muted">Connect</p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-[44px] items-center gap-2.5 text-sm text-white transition-colors hover:text-accent-hover"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>

              {activeSocials.map(({ label, url, icon }) => {
                const Icon = socialIcons[icon]
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2.5 text-sm text-muted transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {NAME}. Crafted with React &amp; Tailwind.
          </p>
          <p className="text-xs text-white/20">
            Python · AI · Full Stack · Cloud
          </p>
        </div>
      </div>
    </footer>
  )
}
