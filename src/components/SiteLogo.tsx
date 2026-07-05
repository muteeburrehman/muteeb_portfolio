import { SITE_BRAND, SITE_LOGO } from '../data/portfolio'

type SiteLogoProps = {
  variant?: 'nav' | 'footer'
  className?: string
}

export function SiteLogo({ variant = 'nav', className = '' }: SiteLogoProps) {
  return (
    <img
      src={SITE_LOGO}
      alt={SITE_BRAND}
      className={`site-logo site-logo--${variant}${className ? ` ${className}` : ''}`}
      width={variant === 'nav' ? 180 : 220}
      height={variant === 'nav' ? 48 : 60}
      decoding="async"
    />
  )
}
