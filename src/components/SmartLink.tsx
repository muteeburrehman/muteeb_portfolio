import type { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function SmartLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (!to.includes('#')) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  const [path = '/', hashId] = to.split('#')
  const targetPath = path || '/'

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.()

    if (pathname !== targetPath) {
      navigate(`${targetPath}#${hashId}`)
      return
    }

    const el = document.getElementById(hashId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.history.pushState(null, '', `#${hashId}`)
  }

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
