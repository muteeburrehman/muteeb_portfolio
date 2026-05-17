import { useState, type FormEvent } from 'react'
import { CONTACT_TOPICS, EMAIL } from '../data/portfolio'
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

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [error, setError] = useState<string | null>(null)

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.message.trim()) next.message = 'Message is required'
    else if (form.message.trim().length < 20) next.message = 'Please write at least 20 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

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
    'w-full rounded-xl border border-white/10 bg-bg/70 px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-all focus:border-sky-400/60 focus:bg-bg/90 focus:ring-2 focus:ring-sky-400/15'

  if (status === 'success') {
    return (
      <div className="border-gradient relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-surface-elevated p-12 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-500/[0.06] via-transparent to-sky-500/[0.06]"
        />
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-500/30">
          <CheckIcon />
        </div>
        <h3 className="relative text-xl font-semibold text-white">Message sent successfully</h3>
        <p className="relative mt-3 max-w-sm text-sm text-white/55">
          Thanks for reaching out — I&apos;ll get back to you soon. You can also email{' '}
          <a href={`mailto:${EMAIL}`} className="text-sky-300 hover:underline">
            {EMAIL}
          </a>
        </p>
        <Button
          variant="outline"
          className="relative mt-8"
          onClick={() => {
            setStatus('idle')
            setForm(initial)
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
      className="border-gradient relative space-y-5 rounded-3xl bg-surface-elevated p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase"
          >
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase"
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
              <option key={t} value={t} className="bg-bg">
                {t}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/40"
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
          className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project, timeline, and goals…"
          className={`${inputClass} resize-none`}
          disabled={submitting}
        />
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-white/35">
          {errors.message ? (
            <span className="text-red-400">{errors.message}</span>
          ) : (
            <span>Minimum 20 characters</span>
          )}
          <span className={form.message.length > 0 ? 'text-white/55' : ''}>
            {form.message.length}/5000
          </span>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-white/35">
          Replies within <span className="text-white/55">24 hours</span> · No spam, ever.
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
