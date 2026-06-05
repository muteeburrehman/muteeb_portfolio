import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  to?: string
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  ghost: 'border border-border text-text-primary hover:border-accent hover:bg-bg-off',
  outline: 'border border-border text-muted hover:border-accent hover:text-text-primary',
}

export function Button({
  children,
  variant = 'primary',
  href,
  to,
  type = 'button',
  className = '',
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
