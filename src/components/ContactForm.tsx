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
    'w-full rounded-xl border border-white/10 bg-bg/80 px-4 py-3.5 text-sm text-white placeholder:text-white/25 transition-colors focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20'

  if (status === 'success') {
    return (
      <div className="border-gradient flex flex-col items-center justify-center rounded-3xl bg-surface-elevated p-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-semibold text-white">Message sent successfully</h3>
        <p className="mt-3 max-w-sm text-sm text-white/50">
          Thanks for reaching out — I&apos;ll get back to you soon. You can also email{' '}
          <a href={`mailto:${EMAIL}`} className="text-sky-400 hover:underline">
            {EMAIL}
          </a>
        </p>
        <Button
          variant="outline"
          className="mt-8"
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

  return (
    <form
      onSubmit={handleSubmit}
      className="border-gradient space-y-5 rounded-3xl bg-surface-elevated p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className={inputClass}
            disabled={status === 'submitting'}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className={inputClass}
            disabled={status === 'submitting'}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
          Project type
        </label>
        <select
          id="topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className={`${inputClass} cursor-pointer appearance-none`}
          disabled={status === 'submitting'}
        >
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t} className="bg-bg">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium tracking-wide text-white/50 uppercase">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project, timeline, and goals..."
          className={`${inputClass} resize-none`}
          disabled={status === 'submitting'}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full sm:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
        {status !== 'submitting' && <ArrowIcon />}
      </Button>
    </form>
  )
}
