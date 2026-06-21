import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/portfolio'
import { SiteLogo } from './SiteLogo'

function isLinkActive(to: string, pathname: string, hash: string) {
  if (to === '/') return pathname === '/' && !hash
  if (to.startsWith('/#')) return pathname === '/' && hash === to.slice(1)
  return pathname === to
}

function NavLinkItem({
  to,
  label,
  pathname,
  hash,
  onNavigate,
}: {
  to: string
  label: string
  pathname: string
  hash: string
  onNavigate?: () => void
}) {
  const active = isLinkActive(to, pathname, hash)
  const className = active ? 'active' : ''

  if (to.includes('#')) {
    return (
      <li>
        <a href={to} className={className} onClick={onNavigate}>
          {label}
        </a>
      </li>
    )
  }

  return (
    <li>
      <Link to={to} className={className} onClick={onNavigate}>
        {label}
      </Link>
    </li>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current
      if (!nav) return
      nav.style.background =
        window.scrollY > 50 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)'
      nav.style.boxShadow =
        window.scrollY > 50 ? '0 4px 24px rgba(0, 120, 215, 0.08)' : '0 1px 0 rgba(0, 120, 215, 0.06)'
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-navbar">
      <nav ref={navRef}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <SiteLogo variant="nav" />
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLinkItem
                key={to}
                to={to}
                label={label}
                pathname={pathname}
                hash={hash}
              />
            ))}
          </ul>

          <div className="nav-cta-zone">
            <Link to="/book" className="nav-cta">
              Book a Call
            </Link>
            <button
              type="button"
              className="nav-hamburger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`nav-mobile-panel${menuOpen ? ' nav-mobile-panel--open' : ''}`}
        hidden={!menuOpen}
      >
        <ul className="nav-mobile-links">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLinkItem
              key={to}
              to={to}
              label={label}
              pathname={pathname}
              hash={hash}
              onNavigate={closeMenu}
            />
          ))}
        </ul>
        <Link to="/book" className="nav-cta nav-mobile-cta" onClick={closeMenu}>
          Book a Call
        </Link>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  )
}
