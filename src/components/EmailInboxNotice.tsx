type EmailInboxNoticeProps = {
  /** Recipient address — shown when we know where the email was sent. */
  email?: string
  variant?: 'prominent' | 'compact'
  className?: string
}

export function EmailInboxNotice({
  email,
  variant = 'prominent',
  className = '',
}: EmailInboxNoticeProps) {
  return (
    <div
      className={`email-inbox-notice email-inbox-notice--${variant} ${className}`.trim()}
      role="note"
      aria-label="Email delivery tip"
    >
      <span className="email-inbox-notice__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="email-inbox-notice__body">
        <p className="email-inbox-notice__title">Didn&apos;t receive our email?</p>
        <p className="email-inbox-notice__text">
          {email ? (
            <>
              We sent a message to <strong>{email}</strong>.{' '}
            </>
          ) : (
            <>We sent you a confirmation email. </>
          )}
          If nothing arrives within a few minutes, check your <strong>Spam</strong> or{' '}
          <strong>Junk</strong> folder and mark it as &quot;Not spam&quot; so future messages reach
          your inbox.
        </p>
      </div>
    </div>
  )
}
