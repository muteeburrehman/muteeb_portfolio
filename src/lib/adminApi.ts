import { clearAdminSession, getAdminSession, type AdminCredentials } from './adminAuth'

const ADMIN_BASE = (
  (import.meta.env.VITE_ADMIN_API_URL as string | undefined)?.trim() || '/api/admin'
).replace(/\/$/, '')

function adminPath(path: string): string {
  return `${ADMIN_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

function adminHeaders(session = getAdminSession()): HeadersInit {
  if (!session) throw new Error('Admin session required')
  return {
    'X-Admin-Email': session.email,
    'X-Admin-Key': session.key,
  }
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json()
    if (body && typeof body.detail === 'string') return body.detail
  } catch {
    /* ignore */
  }
  return res.statusText || 'Request failed'
}

export type AdminOverview = {
  contacts_total: number
  contacts_pending: number
  contacts_replied: number
  bookings_confirmed: number
  bookings_cancelled: number
  bookings_upcoming: number
  bookings_last_30_days: number
}

export type AdminContact = {
  id: string
  name: string
  email: string
  message: string
  topic: string | null
  service: string | null
  company: string | null
  phone: string | null
  created_at: string
  replied_at: string | null
  replied: boolean
}

export type AdminBooking = {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  notes: string | null
  starts_at: string
  ends_at: string
  meeting_link: string
  status: string
  created_at: string
}

export type AdminAnalytics = {
  days: number
  labels: string[]
  contacts_per_day: number[]
  contacts_replied_per_day: number[]
  bookings_per_day: number[]
  bookings_confirmed_per_day: number[]
  bookings_cancelled_per_day: number[]
  totals: {
    contacts: number
    contacts_replied: number
    bookings: number
    bookings_confirmed: number
    bookings_cancelled: number
  }
}

export type AdminComposePayload = {
  to_email: string
  subject: string
  message: string
  recipient_name?: string
  contact_id?: string
}

export async function fetchAdminAnalytics(days = 14): Promise<AdminAnalytics> {
  const params = new URLSearchParams({ days: String(days) })
  const res = await fetch(`${adminPath('/analytics')}?${params}`, { headers: adminHeaders() })
  if (res.status === 403) {
    clearAdminSession()
    throw new Error('Session expired')
  }
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function cancelAdminBooking(bookingId: string): Promise<AdminBooking> {
  const res = await fetch(adminPath(`/bookings/${bookingId}/cancel`), {
    method: 'POST',
    headers: adminHeaders(),
  })
  if (!res.ok) throw new Error(await parseError(res))
  const body = await res.json()
  return body.booking as AdminBooking
}

export async function deleteAdminBooking(bookingId: string): Promise<void> {
  const res = await fetch(adminPath(`/bookings/${bookingId}`), {
    method: 'DELETE',
    headers: adminHeaders(),
  })
  if (!res.ok) throw new Error(await parseError(res))
}

export async function deleteAdminContact(contactId: string): Promise<void> {
  const res = await fetch(adminPath(`/contacts/${contactId}`), {
    method: 'DELETE',
    headers: adminHeaders(),
  })
  if (!res.ok) throw new Error(await parseError(res))
}

export async function sendAdminMessage(payload: AdminComposePayload): Promise<void> {
  const res = await fetch(adminPath('/messages'), {
    method: 'POST',
    headers: {
      ...adminHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await parseError(res))
}

export function formatChartLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export async function verifyAdminSession(credentials: AdminCredentials): Promise<boolean> {
  const res = await fetch(adminPath('/session'), {
    headers: {
      'X-Admin-Email': credentials.email,
      'X-Admin-Key': credentials.key,
    },
  })
  if (!res.ok) {
    clearAdminSession()
    return false
  }
  return true
}

export async function fetchAdminOverview(): Promise<AdminOverview> {
  const res = await fetch(adminPath('/overview'), { headers: adminHeaders() })
  if (res.status === 403) {
    clearAdminSession()
    throw new Error('Session expired')
  }
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function fetchAdminContacts(
  status: 'all' | 'pending' | 'replied' = 'all',
): Promise<AdminContact[]> {
  const params = new URLSearchParams({ status })
  const res = await fetch(`${adminPath('/contacts')}?${params}`, { headers: adminHeaders() })
  if (res.status === 403) {
    clearAdminSession()
    throw new Error('Session expired')
  }
  if (!res.ok) throw new Error(await parseError(res))
  const body = await res.json()
  return body.items as AdminContact[]
}

export async function fetchAdminBookings(
  status: 'all' | 'confirmed' | 'cancelled' = 'all',
): Promise<AdminBooking[]> {
  const params = new URLSearchParams({ status })
  const res = await fetch(`${adminPath('/bookings')}?${params}`, { headers: adminHeaders() })
  if (res.status === 403) {
    clearAdminSession()
    throw new Error('Session expired')
  }
  if (!res.ok) throw new Error(await parseError(res))
  const body = await res.json()
  return body.items as AdminBooking[]
}

export async function markContactReplied(contactId: string): Promise<AdminContact> {
  const res = await fetch(adminPath(`/contacts/${contactId}`), {
    method: 'PATCH',
    headers: adminHeaders(),
  })
  if (!res.ok) throw new Error(await parseError(res))
  const body = await res.json()
  return body.contact as AdminContact
}

export async function downloadContactsCsv(status: 'all' | 'pending' | 'replied' = 'all'): Promise<void> {
  const params = new URLSearchParams({ status })
  const res = await fetch(`${adminPath('/export/contacts.csv')}?${params}`, {
    headers: adminHeaders(),
  })
  if (!res.ok) throw new Error(await parseError(res))
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `contacts-${status}.csv`
  anchor.click()
  URL.revokeObjectURL(url)
}

export function formatAdminDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Shorter label for dense admin tables (avoids column bleed). */
export function formatAdminDateTimeCompact(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
