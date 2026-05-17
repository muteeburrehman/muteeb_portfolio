import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { EMAIL, NAV_LINKS } from '../data/portfolio'
import { ArrowIcon, MailIcon } from './icons'

function isLinkActive(to: string, pathname: string, hash: string) {
  if (to === '/') return pathname === '/' && !hash
  if (to.startsWith('/#')) return pathname === '/' && hash === to.slice(1)
  return pathname === to
}

function DesktopNavLink({
  to,
  label,
  pathname,
  hash,
}: {
  to: string
  label: string
  pathname: string
  hash: string
}) {
  const active = isLinkActive(to, pathname, hash)
  const className = `group relative py-1 text-sm tracking-wide transition-colors duration-200 ${
    active ? 'text-white' : 'text-white/50 hover:text-white/90'
  }`

  const underline = (
    <span
      className={`absolute -bottom-1 left-0 h-px w-full origin-left rounded-full bg-linear-to-r from-sky-400 to-purple-500 transition-transform duration-300 ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-50'
      }`}
      aria-hidden="true"
    />
  )

  if (to.includes('#')) {
    return (
      <a href={to} className={className}>
        {label}
        {underline}
      </a>
    )
  }

  return (
    <Link to={to} className={className}>
      {label}
      {underline}
    </Link>
  )
}

function MobileNavLink({
  to,
  label,
  pathname,
  hash,
  onNavigate,
  index,
}: {
  to: string
  label: string
  pathname: string
  hash: string
  onNavigate: () => void
  index: number
}) {
  const active = isLinkActive(to, pathname, hash)
  const className = `flex items-center justify-between border-l-2 py-3.5 pl-4 pr-3 text-base transition-colors ${
    active
      ? 'border-sky-400 text-white'
      : 'border-transparent text-white/55 hover:border-white/20 hover:text-white/90'
  }`
  const trailing = (
    <ArrowIcon
      className={`h-3.5 w-3.5 transition-all ${
        active ? 'translate-x-0 text-sky-300 opacity-100' : '-translate-x-1 text-white/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
      }`}
    />
  )

  if (to.includes('#')) {
    return (
      <a
        href={to}
        onClick={onNavigate}
        className={`${className} group`}
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <span>{label}</span>
        {trailing}
      </a>
    )
  }

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`${className} group`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span>{label}</span>
      {trailing}
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname, hash } = useLocation()
  const isContact = pathname === '/contact'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-white/8 bg-bg/90 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.04] transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-linear-to-r from-sky-400 via-purple-500 to-sky-400 transition-[width] duration-200 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10 lg:py-4">
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-display text-lg tracking-tight text-white lg:justify-self-start"
        >
          <span
            aria-hidden="true"
            className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-sky-500/20 to-purple-500/20 transition-all group-hover:border-sky-400/40 group-hover:from-sky-500/35 group-hover:to-purple-500/35"
          >
            <span className="font-display text-xs text-white">M</span>
            <span className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span>
            MUR<span className="text-gradient">.</span>
          </span>
        </Link>

        <nav className="hidden lg:block lg:justify-self-center" aria-label="Main navigation">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <DesktopNavLink to={to} label={label} pathname={pathname} hash={hash} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:justify-self-end">
          <a
            href={`mailto:${EMAIL}`}
            className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition-all hover:border-white/25 hover:text-white md:inline-flex"
          >
            <MailIcon className="h-4 w-4 shrink-0" />
            <span className="hidden xl:inline">Email</span>
          </a>

          <Link
            to="/contact"
            className={`group hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:inline-flex ${
              isContact
                ? 'border border-white/20 bg-white/10 text-white'
                : 'bg-white text-black shadow-[0_6px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)]'
            }`}
          >
            Hire Me
            {!isContact && (
              <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            )}
          </Link>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors lg:hidden ${
              open
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-white/10 text-white/80 hover:border-white/20 hover:bg-white/5'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 bg-current transition-all ${open ? 'top-[6px] rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-[6px] h-0.5 w-4 bg-current transition-all ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 bg-current transition-all ${open ? 'top-[6px] -rotate-45' : 'top-[12px]'}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="fixed inset-0 top-14 z-40 bg-black/60 lg:hidden"
          aria-label="Close menu"
          onClick={close}
        />
      )}

      <div
        className={`relative z-50 overflow-hidden border-t border-white/5 bg-bg/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ to, label }, i) => (
              <li key={to}>
                <MobileNavLink
                  to={to}
                  label={label}
                  pathname={pathname}
                  hash={hash}
                  onNavigate={close}
                  index={i}
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/5 px-2 pt-5">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3.5 text-sm text-white/75"
            >
              <MailIcon className="h-4 w-4" />
              {EMAIL}
            </a>
            <Link
              to="/contact"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-black shadow-[0_6px_24px_rgba(255,255,255,0.15)]"
            >
              Hire Me
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
