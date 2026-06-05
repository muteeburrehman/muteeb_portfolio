import { useState, type FormEvent } from 'react'
import { CONTACT_TOPICS, EMAIL, REPLY_TIME } from '../data/portfolio'
import { ArrowIcon, CheckIcon } from './icons'
import { Button } from './ui/Button'

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

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-4 py-3.5 text-sm text-text-primary placeholder:text-muted transition-all focus:border-accent focus:ring-2 focus:ring-accent/15'

  if (status === 'success') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-xl border border-border bg-white p-12 text-center">
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30">
          <CheckIcon />
        </div>
        <h3 className="relative text-xl font-semibold text-text-primary">Message sent successfully</h3>
        <p className="relative mt-3 max-w-sm text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you soon. You can also email{' '}
          <a href={`mailto:${EMAIL}`} className="text-accent hover:underline">
            {EMAIL}
          </a>
        </p>
        <Button
          variant="outline"
          className="relative mt-8"
          onClick={() => {
            setStatus('idle')
            setForm(initial)
            setErrors({})
            setSubmitAttempted(false)
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-xl border border-border bg-white p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
          >
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="John Doe"
            className={inputClass}
            disabled={submitting}
            autoComplete="name"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
            disabled={submitting}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="topic"
          className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
        >
          Project type
        </label>
        <div className="relative">
          <select
            id="topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className={`${inputClass} cursor-pointer appearance-none pr-10`}
            disabled={submitting}
          >
            {CONTACT_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-muted uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell me about your project, timeline, and goals…"
          className={`${inputClass} resize-none`}
          disabled={submitting}
        />
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted">
          {errors.message ? (
            <span className="text-red-400">{errors.message}</span>
          ) : form.message.trim().length >= 20 ? (
            <span className="text-emerald-400/80">Looks good</span>
          ) : (
            <span>
              Minimum 20 characters
              {form.message.trim().length > 0 ? (
                <span className="text-muted">
                  {' '}
                  ({20 - form.message.trim().length} more needed)
                </span>
              ) : null}
            </span>
          )}
          <span
            className={
              form.message.trim().length >= 20
                ? 'text-emerald-400/70'
                : form.message.length > 0
                  ? 'text-text-primary'
                  : ''
            }
          >
            {form.message.length}/5000
          </span>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-muted">
          Personal reply <span className="text-text-primary">{REPLY_TIME}</span> · No spam, ever.
        </p>
        <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? (
            <>
              <svg
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
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
        </Button>
      </div>
    </form>
  )
}
