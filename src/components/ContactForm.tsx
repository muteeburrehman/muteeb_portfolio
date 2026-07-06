import { useState, type FormEvent } from 'react'
import { CONTACT_TOPICS, EMAIL, REPLY_TIME } from '../data/portfolio'
import { ArrowIcon, CheckIcon } from './icons'
import { EmailInboxNotice } from './EmailInboxNotice'

const CONTACT_ENDPOINT =
  (import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.trim() || '/api/contact'

type FormState = {
  name: string
  email: string
  topic: string
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initial: FormState = {
  name: '',
  email: '',
  topic: CONTACT_TOPICS[0],
  message: '',
}

function extractApiError(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined
  const body = payload as Record<string, unknown>
  const detail = body.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail.length > 0) {
    const row = detail[0] as Record<string, unknown>
    if (typeof row.msg === 'string') return row.msg
  }
  return undefined
}

function fieldError(field: keyof FormState, state: FormState): string | undefined {
  switch (field) {
    case 'name':
      if (!state.name.trim()) return 'Name is required'
      return undefined
    case 'email':
      if (!state.email.trim()) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) return 'Enter a valid email'
      return undefined
    case 'message': {
      const text = state.message.trim()
      if (!text) return 'Message is required'
      if (text.length < 20) return 'Please write at least 20 characters'
      return undefined
    }
    default:
      return undefined
  }
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [error, setError] = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [confirmedEmail, setConfirmedEmail] = useState<string | null>(null)

  function validateAll(state: FormState = form) {
    const next: Partial<Record<keyof FormState, string>> = {}
    for (const field of ['name', 'email', 'message'] as const) {
      const err = fieldError(field, state)
      if (err) next[field] = err
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    const nextForm = { ...form, [field]: value }
    setForm(nextForm)

    setErrors((prev) => {
      const shouldRevalidate = submitAttempted || field in prev
      if (!shouldRevalidate) return prev

      const err = fieldError(field, nextForm)
      if (!err) {
        const { [field]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [field]: err }
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitAttempted(true)
    if (!validateAll()) return

    setStatus('submitting')
    setError(null)

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic,
          message: form.message.trim(),
        }),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        const msg =
          extractApiError(body) ||
          (res.status === 422
            ? 'Please check required fields — name, email and message.'
            : 'Something went wrong. Please try again or email directly.')
        throw new Error(msg)
      }

      setConfirmedEmail(form.email.trim())
      setForm(initial)
      setErrors({})
      setSubmitAttempted(false)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      const raw = err instanceof Error ? err.message : ''
      setError(
        raw === 'Failed to fetch'
          ? 'Could not reach the server. If you self-host, ensure the contact API is running.'
          : err instanceof Error
            ? err.message
            : 'Something went wrong',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form-success panel-surface">
        <div className="contact-form-success-icon">
          <CheckIcon />
        </div>
        <h3 className="contact-form-success-title">Message sent successfully</h3>
        <p className="contact-form-success-text">
          Thanks for reaching out — I&apos;ll get back to you soon. You can also email{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        {confirmedEmail ? (
          <EmailInboxNotice email={confirmedEmail} className="contact-form-success-notice" />
        ) : (
          <EmailInboxNotice className="contact-form-success-notice" />
        )}
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setStatus('idle')
            setForm(initial)
            setErrors({})
            setSubmitAttempted(false)
            setConfirmedEmail(null)
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="contact-form panel-surface" noValidate>
      <div className="contact-form-header">
        <h2 className="contact-form-title">Send a message</h2>
        <p className="contact-form-subtitle">Tell us about your project, timeline, and goals.</p>
      </div>

      <div className="contact-form-row">
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="John Doe"
            className="form-input"
            disabled={submitting}
            autoComplete="name"
          />
          {errors.name ? <p className="form-error">{errors.name}</p> : null}
        </div>
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@company.com"
            className="form-input"
            disabled={submitting}
            autoComplete="email"
          />
          {errors.email ? <p className="form-error">{errors.email}</p> : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="topic" className="form-label">
          Project type
        </label>
        <select
          id="topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="form-input form-select"
          disabled={submitting}
        >
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell me about your project, timeline, and goals…"
          className="form-input form-textarea"
          disabled={submitting}
        />
        <div className="form-hint-row">
          {errors.message ? (
            <span className="form-error">{errors.message}</span>
          ) : form.message.trim().length >= 20 ? (
            <span className="form-hint form-hint--ok">Looks good</span>
          ) : (
            <span className="form-hint">
              Minimum 20 characters
              {form.message.trim().length > 0
                ? ` (${20 - form.message.trim().length} more needed)`
                : ''}
            </span>
          )}
          <span className="form-hint">{form.message.length}/5000</span>
        </div>
      </div>

      {error ? <p className="form-error-box">{error}</p> : null}

      <div className="contact-form-footer">
        <p className="contact-form-note">
          Personal reply <strong>{REPLY_TIME}</strong> · No spam, ever.
        </p>
        <button type="submit" className="btn-primary contact-form-submit" disabled={submitting}>
          {submitting ? (
            <>
              <svg aria-hidden="true" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                <path
                  d="M21 12a9 9 0 00-9-9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowIcon className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
