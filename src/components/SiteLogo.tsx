import { SITE_BRAND, SITE_LOGO } from '../data/portfolio'

type SiteLogoProps = {
  variant?: 'nav' | 'footer'
  className?: string
}

const LOGO_DIMENSIONS = {
  nav: { width: 72, height: 56 },
  footer: { width: 103, height: 80 },
} as const

export function SiteLogo({ variant = 'nav', className = '' }: SiteLogoProps) {
  const { width, height } = LOGO_DIMENSIONS[variant]

  return (
    <img
      src={SITE_LOGO}
      alt={SITE_BRAND}
      width={width}
      height={height}
      className={`site-logo site-logo--${variant} ${className}`.trim()}
      decoding="async"
      fetchPriority={variant === 'nav' ? 'high' : 'auto'}
    />
  )
}
