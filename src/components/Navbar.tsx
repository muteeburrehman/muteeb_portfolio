import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE_BRAND } from '../data/portfolio'

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
        window.scrollY > 50 ? 'rgba(10,12,16,0.95)' : 'rgba(10,12,16,0.75)'
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
            <span className="nav-logo-dot" aria-hidden="true" />
            <span className="nav-logo-text">{SITE_BRAND}</span>
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
