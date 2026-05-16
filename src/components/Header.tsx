import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/portfolio'

function navClass(isActive: boolean) {
  return isActive
    ? 'text-white'
    : 'text-white/60 hover:text-white'
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isContact = pathname === '/contact'

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-white/5 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        <Link
          to="/"
          className="font-display text-lg tracking-tight text-white transition-opacity hover:opacity-80"
        >
          MUR.
        </Link>

        <nav
          className={`absolute top-full right-0 left-0 flex flex-col gap-1 border-b border-white/5 bg-bg/95 p-4 backdrop-blur-xl lg:static lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0 ${
            open ? 'flex' : 'hidden lg:flex'
          }`}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ to, label }) => {
            const isHash = to.includes('#')
            if (isHash) {
              return (
                <a
                  key={to}
                  href={to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:text-white lg:px-0 lg:py-0"
                >
                  {label}
                </a>
              )
            }
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition-colors lg:px-0 lg:py-0 ${navClass(isActive)}`
                }
              >
                {label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all sm:inline-flex ${
              isContact
                ? 'border border-white/20 bg-white/10 text-white'
                : 'bg-white text-black hover:opacity-90'
            }`}
          >
            Hire Me
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span
              className={`h-0.5 w-5 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}
