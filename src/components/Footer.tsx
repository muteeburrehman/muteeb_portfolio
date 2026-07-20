import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, EMAIL, LEGAL_ADDRESS_LINES, LEGAL_ENTITY, SITE_TAGLINE, SOCIAL_LINKS } from '../data/portfolio'
import { ArrowIcon, LinkedInIcon, MailIcon } from './icons'
import { SiteLogo } from './SiteLogo'

export function Footer() {
  const year = new Date().getFullYear()
  const linkedIn = SOCIAL_LINKS.find((s) => s.icon === 'linkedin' && s.url)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-side">
            <Link to="/" className="inline-block">
              <SiteLogo variant="footer" />
            </Link>
            <p className="footer-brand-desc max-w-sm mt-3">{SITE_TAGLINE}</p>
          </div>

          <div className="footer-links-side">
            <div className="footer-links-group">
              <span className="footer-links-title">Services</span>
              <ul className="footer-links-list">
                <li>
                  <Link to="/contest-platforms">Contest Platforms</Link>
                </li>
                <li>
                  <Link to="/inventory-systems">Inventory Systems</Link>
                </li>
                <li>
                  <Link to="/cjis-booking">CJIS &amp; Booking</Link>
                </li>
                <li>
                  <Link to="/livestock-software">Livestock Software</Link>
                </li>
                <li>
                  <Link to="/agency-solutions">Agency Solutions</Link>
                </li>
                <li>
                  <Link to="/ai-automation">AI &amp; Automation</Link>
                </li>
                <li>
                  <Link to="/qa-testing">Software Testing</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-group">
              <span className="footer-links-title">Connect</span>
              <ul className="footer-links-list">
                <li>
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5">
                    <MailIcon className="h-3.5 w-3.5" />
                    Email
                  </a>
                </li>
                {linkedIn ? (
                  <li>
                    <a
                      href={linkedIn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  </li>
                ) : null}
                <li>
                  <Link to={BOOK_CALL_PATH} className="inline-flex items-center gap-1">
                    Book a Call
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {year} {LEGAL_ENTITY}. All rights reserved.
          </p>
          <p className="footer-bottom-text text-sm text-slate-500">
            {LEGAL_ADDRESS_LINES.map((line) => (
              <span key={line} className="footer-address-line">
                {line}
              </span>
            ))}
          </p>
          <p className="footer-bottom-text text-sm text-slate-500">
            Contests · Inventory · CJIS Booking · Agribusiness · Agencies · QA · AI
          </p>
        </div>
      </div>
    </footer>
  )
}
