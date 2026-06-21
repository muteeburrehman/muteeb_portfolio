import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, EMAIL, NAME, ROLE, SOCIAL_LINKS } from '../data/portfolio'
import { ArrowIcon, LinkedInIcon, MailIcon } from './icons'
import { SiteLogo } from './SiteLogo'

const FOOTER_LINKS = [
  { to: '/livestock-software', label: 'Livestock Software' },
  { to: '/qa-testing', label: 'Software Testing' },
  { to: '/ai-automation', label: 'AI & Automation' },
  { to: '/#work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const linkedIn = SOCIAL_LINKS.find((s) => s.icon === 'linkedin' && s.url)

  return (
    <footer className="site-footer">
      <div className="container py-12 sm:py-14">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <SiteLogo variant="footer" />
            </Link>
            <p className="footer-tagline">{ROLE}</p>
          </div>

          <div className="footer-actions">
            <a href={`mailto:${EMAIL}`} className="footer-contact-link">
              <MailIcon className="h-4 w-4 shrink-0" />
              {EMAIL}
            </a>
            {linkedIn ? (
              <a
                href={linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0" />
                LinkedIn
              </a>
            ) : null}
            <Link to={BOOK_CALL_PATH} className="btn-primary footer-cta">
              Book a Call
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <nav className="footer-quick-links" aria-label="Footer quick links">
          {FOOTER_LINKS.map(({ to, label }, i) => (
            <span key={to} className="footer-quick-link-item">
              {i > 0 ? <span className="footer-dot" aria-hidden="true">·</span> : null}
              {to.includes('#') ? (
                <a href={to}>{label}</a>
              ) : (
                <Link to={to}>{label}</Link>
              )}
            </span>
          ))}
        </nav>

        <div className="footer-bottom">
          <p>© {year} {NAME}. Crafted with React &amp; Tailwind.</p>
          <p>Python · AI · Full Stack · Cloud</p>
        </div>
      </div>
    </footer>
  )
}
