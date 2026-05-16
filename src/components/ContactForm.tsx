import { useState, type FormEvent } from 'react'
import { CONTACT_TOPICS, EMAIL } from '../data/portfolio'
import { ArrowIcon, CheckIcon } from './icons'
import { Button } from './ui/Button'

type FormState = {
  name: string
  email: string
  topic: string
  message: string
}

const initial: FormState = {
  name: '',
  email: '',
  topic: CONTACT_TOPICS[0],
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`[Portfolio] ${form.topic} — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`,
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-bg/80 px-4 py-3.5 text-sm text-white placeholder:text-white/25 transition-colors focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20'

  if (submitted) {
    return (
      <div className="border-gradient flex flex-col items-center justify-center rounded-3xl bg-surface-elevated p-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-semibold text-white">Opening your email client…</h3>
        <p className="mt-3 max-w-sm text-sm text-white/50">
          If it didn&apos;t open, email me directly at{' '}
          <a href={`mailto:${EMAIL}`} className="text-sky-400 hover:underline">
            {EMAIL}
          </a>
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setSubmitted(false)
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
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Send Message
        <ArrowIcon />
      </Button>
    </form>
  )
}
