import { type FormEvent, useEffect, useState } from 'react'
import { sendAdminMessage, type AdminContact } from '../../lib/adminApi'

export type ComposeDraft = {
  to_email: string
  recipient_name: string
  subject: string
  message: string
  contact_id?: string
}

type AdminComposeProps = {
  draft?: ComposeDraft | null
  onSent?: () => void
}

export function AdminCompose({ draft, onSent }: AdminComposeProps) {
  const [toEmail, setToEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [contactId, setContactId] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!draft) return
    setToEmail(draft.to_email)
    setRecipientName(draft.recipient_name)
    setSubject(draft.subject)
    setMessage(draft.message)
    setContactId(draft.contact_id)
    setError(null)
    setSuccess(null)
  }, [draft])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)
    try {
      await sendAdminMessage({
        to_email: toEmail.trim(),
        recipient_name: recipientName.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
        contact_id: contactId,
      })
      setSuccess('Message sent with your branded email template.')
      if (!contactId) {
        setSubject('')
        setMessage('')
      }
      onSent?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-compose">
      <div className="admin-compose__intro">
        <h2 className="admin-compose__title">Send message</h2>
        <p className="admin-compose__subtitle">
          Emails use your MuteebLabs theme (logo, colors, signature). Contacts linked below are
          marked as replied after send.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-compose__form">
        <div className="admin-compose__row">
          <label className="form-field">
            <span className="form-label">To email</span>
            <input
              type="email"
              required
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              className="form-input"
              placeholder="client@example.com"
            />
          </label>
          <label className="form-field">
            <span className="form-label">Recipient name</span>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="form-input"
              placeholder="First name"
            />
          </label>
        </div>

        <label className="form-field">
          <span className="form-label">Subject</span>
          <input
            type="text"
            required
            maxLength={200}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="form-input"
            placeholder="Following up on your inquiry"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Message</span>
          <textarea
            required
            rows={8}
            maxLength={10000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input form-textarea"
            placeholder="Write your message…"
          />
        </label>

        {contactId && (
          <p className="admin-compose__hint">Linked to a contact — they will be marked as replied after send.</p>
        )}

        {error && <p className="admin-alert admin-alert--error">{error}</p>}
        {success && <p className="admin-alert admin-alert--ok">{success}</p>}

        <button type="submit" className="btn-primary admin-compose__submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send branded email'}
        </button>
      </form>
    </div>
  )
}

export function composeDraftFromContact(contact: AdminContact): ComposeDraft {
  const first = contact.name.split(' ')[0] || contact.name
  return {
    to_email: contact.email,
    recipient_name: contact.name,
    subject: `Re: Your message to MuteebLabs`,
    message: `Hi ${first},\n\nThank you for reaching out.\n\n\n\nBest regards,`,
    contact_id: contact.id,
  }
}
