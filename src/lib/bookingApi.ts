const BOOKING_BASE = (
  (import.meta.env.VITE_BOOKING_API_URL as string | undefined)?.trim() || '/api/booking'
).replace(/\/$/, '')

function bookingPath(path: string): string {
  return `${BOOKING_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

export type BookingConfig = {
  timezone: string
  slot_duration_minutes: number
  min_notice_hours: number
  max_days_ahead: number
  meeting_provider: string
}

export type BookingSlot = {
  start: string
  end: string
  label: string
}

export type SlotsResponse = {
  timezone: string
  slots: BookingSlot[]
}

export type BookingResult = {
  ok: boolean
  booking_id: string
  start: string
  end: string
  timezone: string
  meeting_link: string
  cancel_url: string
  detail: string
}

export type DaySlotCount = {
  date: string
  available_count: number
}

export type AvailabilitySummary = {
  timezone: string
  days: DaySlotCount[]
}

export type BookingManagePreview = {
  booking_id: string
  name: string
  email: string
  starts_at: string
  ends_at: string
  status: string
  meeting_link: string | null
}

export type CancelBookingPayload = {
  token?: string
  booking_id?: string
  email?: string
}

export type CancelBookingResult = {
  ok: boolean
  detail: string
  freed_slot: string | null
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json()
    if (body && typeof body.detail === 'string') return body.detail
    if (body && Array.isArray(body.detail) && body.detail[0]?.msg) return body.detail[0].msg
  } catch {
    /* ignore */
  }
  return res.statusText || 'Request failed'
}

export async function fetchBookingConfig(): Promise<BookingConfig> {
  const res = await fetch(bookingPath('/config'))
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function fetchSlots(from: string, to: string): Promise<SlotsResponse> {
  const params = new URLSearchParams({ from, to })
  const res = await fetch(`${bookingPath('/slots')}?${params}`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function fetchAvailabilitySummary(
  from: string,
  to: string,
): Promise<AvailabilitySummary> {
  const params = new URLSearchParams({ from, to })
  const res = await fetch(`${bookingPath('/availability-summary')}?${params}`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function fetchBookingManage(token: string): Promise<BookingManagePreview> {
  const params = new URLSearchParams({ token })
  const res = await fetch(`${bookingPath('/manage')}?${params}`)
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function cancelBooking(payload: CancelBookingPayload): Promise<CancelBookingResult> {
  const res = await fetch(bookingPath('/cancel'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export type CreateBookingPayload = {
  name: string
  email: string
  start: string
  company?: string
  phone?: string
  notes?: string
  source?: string
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResult> {
  const res = await fetch(bookingPath('/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export function formatDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}
