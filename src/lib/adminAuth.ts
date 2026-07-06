const EMAIL_KEY = 'ml_admin_email'
const KEY_KEY = 'ml_admin_key'

export type AdminCredentials = {
  email: string
  key: string
}

export function getAdminSession(): AdminCredentials | null {
  const email = sessionStorage.getItem(EMAIL_KEY)?.trim()
  const key = sessionStorage.getItem(KEY_KEY)?.trim()
  if (!email || !key) return null
  return { email, key }
}

export function setAdminSession(credentials: AdminCredentials): void {
  sessionStorage.setItem(EMAIL_KEY, credentials.email.trim())
  sessionStorage.setItem(KEY_KEY, credentials.key.trim())
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(EMAIL_KEY)
  sessionStorage.removeItem(KEY_KEY)
}
