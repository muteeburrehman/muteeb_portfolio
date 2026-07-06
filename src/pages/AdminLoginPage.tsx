import { type FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminShell } from '../components/AdminShell'
import { Reveal } from '../components/ui/Reveal'
import { useAdminSession } from '../hooks/useAdminSession'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const { isAdmin, checking, login } = useAdminSession()
  const [email, setEmail] = useState('')
  const [key, setKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!checking && isAdmin) navigate('/admin', { replace: true })
  }, [checking, isAdmin, navigate])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    const ok = await login({ email, key })
    setSubmitting(false)
    if (ok) {
      navigate('/admin', { replace: true })
      return
    }
    setError('Invalid email or password.')
  }

  return (
    <AdminShell brandHref="/admin/login">
      <div className="admin-login">
        <Reveal className="admin-login__card panel-surface">
          <div className="admin-login__icon" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="admin-login__eyebrow">Internal access</p>
          <h1 className="admin-login__title">Sign in</h1>
          <p className="admin-login__lead">
            Private dashboard for contacts and bookings. This URL is not linked on the public site.
          </p>

          <form onSubmit={handleSubmit} className="admin-login__form">
            <label className="form-field">
              <span className="form-label">Email</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="you@example.com"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="form-input"
                placeholder="••••••••"
              />
            </label>
            {error && (
              <p className="admin-alert admin-alert--error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary admin-login__submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </Reveal>
      </div>
    </AdminShell>
  )
}
