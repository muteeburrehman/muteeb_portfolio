import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, type NavDropdownItem, type NavItem } from '../data/portfolio'
import { ChevronDownIcon } from './icons'
import { SiteLogo } from './SiteLogo'
import { SmartLink } from './SmartLink'

function isLinkActive(to: string, pathname: string, hash: string) {
  if (to === '/') return pathname === '/' && !hash
  if (to.startsWith('/#')) return pathname === '/' && hash === to.slice(2)
  return pathname === to
}

function isDropdownActive(items: readonly NavDropdownItem[], pathname: string, hash: string) {
  return items.some((item) => isLinkActive(item.to, pathname, hash))
}

function NavAnchor({
  to,
  label,
  pathname,
  hash,
  onNavigate,
  className = '',
}: {
  to: string
  label: string
  pathname: string
  hash: string
  onNavigate?: () => void
  className?: string
}) {
  const active = isLinkActive(to, pathname, hash)
  const linkClass = `${className}${active ? ' active' : ''}`.trim()

  if (to.includes('#')) {
    return (
      <SmartLink to={to} className={linkClass} onClick={onNavigate}>
        {label}
      </SmartLink>
    )
  }

  return (
    <Link to={to} className={linkClass} onClick={onNavigate}>
      {label}
    </Link>
  )
}

function NavDropdown({
  label,
  items,
  pathname,
  hash,
  onNavigate,
  mobile = false,
}: {
  label: string
  items: readonly NavDropdownItem[]
  pathname: string
  hash: string
  onNavigate?: () => void
  mobile?: boolean
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const active = isDropdownActive(items, pathname, hash)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  const toggle = () => setOpen((value) => !value)
  const close = () => setOpen(false)

  return (
    <li
      ref={dropdownRef}
      className={`nav-dropdown${open ? ' nav-dropdown--open' : ''}${active ? ' nav-dropdown--active' : ''}`}
      onMouseEnter={() => {
        if (!mobile) setOpen(true)
      }}
      onMouseLeave={() => {
        if (!mobile) setOpen(false)
      }}
    >
      <button
        type="button"
        className="nav-dropdown__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={toggle}
      >
        {label}
        <ChevronDownIcon className="nav-dropdown__chevron" />
      </button>

      <div className="nav-dropdown__flyout">
        <ul className="nav-dropdown__menu">
          {items.map((item) => (
            <li key={item.to + item.label}>
              <NavAnchor
                to={item.to}
                label={item.label}
                pathname={pathname}
                hash={hash}
                onNavigate={() => {
                  close()
                  onNavigate?.()
                }}
                className="nav-dropdown__link"
              />
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

function renderNavItem(
  item: NavItem,
  pathname: string,
  hash: string,
  onNavigate?: () => void,
  mobile = false,
) {
  if (item.type === 'link') {
    return (
      <li key={item.to}>
        <NavAnchor
          to={item.to}
          label={item.label}
          pathname={pathname}
          hash={hash}
          onNavigate={onNavigate}
        />
      </li>
    )
  }

  return (
    <NavDropdown
      key={item.label}
      label={item.label}
      items={item.items}
      pathname={pathname}
      hash={hash}
      onNavigate={onNavigate}
      mobile={mobile}
    />
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
      nav.classList.toggle('site-navbar--scrolled', window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header ref={navRef} className="site-navbar">
      <nav className="h-full">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <SiteLogo variant="nav" />
          </Link>

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => renderNavItem(item, pathname, hash))}
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

      {menuOpen && (
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <div
        className={`nav-mobile-panel${menuOpen ? ' nav-mobile-panel--open' : ''}`}
        hidden={!menuOpen}
      >
        <ul className="nav-mobile-links">
          {NAV_ITEMS.map((item) => renderNavItem(item, pathname, hash, closeMenu, true))}
        </ul>
        <Link to="/book" className="nav-cta nav-mobile-cta" onClick={closeMenu}>
          Book a Call
        </Link>
      </div>
    </header>
  )
}
