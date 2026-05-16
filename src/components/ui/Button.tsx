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
  primary:
    'bg-white text-black hover:opacity-90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]',
  ghost:
    'border border-white/25 text-white hover:border-white/50 hover:bg-white/5',
  outline:
    'border border-white/15 text-white/80 hover:border-sky-400/40 hover:text-white',
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
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'

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
