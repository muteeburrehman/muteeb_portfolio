import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SiteLogo } from './SiteLogo'

type AdminShellProps = {
  children: ReactNode
  actions?: ReactNode
  brandHref?: string
}

/** Minimal chrome for private /admin routes — no public marketing nav. */
export function AdminShell({ children, actions, brandHref = '/admin' }: AdminShellProps) {
  return (
    <div className="admin-shell">
      <header className="admin-shell__header no-print">
        <div className="admin-shell__inner">
          <Link to={brandHref} className="admin-shell__brand">
            <SiteLogo variant="nav" />
            <span className="admin-shell__badge">Admin</span>
          </Link>
          <div className="admin-shell__actions">
            {actions}
            <Link to="/" className="admin-shell__back">
              Back to site
            </Link>
          </div>
        </div>
      </header>
      <div className="admin-shell__body">{children}</div>
    </div>
  )
}
