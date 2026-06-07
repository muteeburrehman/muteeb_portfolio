import { useEffect } from 'react'
import { LINKEDIN_URL, LINKEDIN_VANITY, NAME } from '../data/portfolio'

const LINKEDIN_BADGE_SCRIPT = 'https://platform.linkedin.com/badges/js/profile.js'

type LinkedInBadgeProps = {
  layout?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium'
  className?: string
}

export function LinkedInBadge({
  layout = 'horizontal',
  size = 'small',
  className = '',
}: LinkedInBadgeProps) {
  useEffect(() => {
    const existing = document.querySelector(`script[src="${LINKEDIN_BADGE_SCRIPT}"]`)
    if (existing) return

    const script = document.createElement('script')
    script.src = LINKEDIN_BADGE_SCRIPT
    script.async = true
    script.defer = true
    script.type = 'text/javascript'
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className={`linkedin-badge linkedin-badge--${layout} flex justify-center ${className}`.trim()}
    >
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size={size}
        data-theme="dark"
        data-type={layout === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL'}
        data-vanity={LINKEDIN_VANITY}
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href={`${LINKEDIN_URL}?trk=profile-badge`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {NAME}
        </a>
      </div>
    </div>
  )
}
