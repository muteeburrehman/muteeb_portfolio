import type { CountryCode } from 'libphonenumber-js'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  createBooking,
  fetchAvailabilitySummary,
  fetchBookingConfig,
  fetchSlots,
  formatBookingDateTime,
  formatDisplayDate,
  formatTimeZoneLabel,
  isWeekendInTimeZone,
  nextDaysInTimeZone,
  type BookingConfig,
  type BookingSlot,
  type DaySlotCount,
} from '../lib/bookingApi'
import {
  bookingFieldError,
  formatPhoneE164,
  validateBookingDetails,
  type BookingDetailsFields,
  type BookingField,
} from '../lib/bookingValidation'
import { DEFAULT_PHONE_COUNTRY } from '../lib/countryDialCodes'
import { ArrowIcon, CheckIcon } from './icons'
import { PhoneField } from './PhoneField'
import { Button } from './ui/Button'

type Step = 'date' | 'time' | 'details' | 'done'

const inputClass = 'form-input'

export function BookingScheduler() {
  const [config, setConfig] = useState<BookingConfig | null>(null)
  const [configLoading, setConfigLoading] = useState(true)
  const [step, setStep] = useState<Step>('date')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null)
  const [slots, setSlots] = useState<BookingSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    meeting_link: string
    start: string
    cancel_url?: string
  } | null>(null)
  const [openSlotsByDay, setOpenSlotsByDay] = useState<Record<string, DaySlotCount>>({})

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY)
  const [phoneNational, setPhoneNational] = useState('')
  const [notes, setNotes] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<BookingField, string>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const detailsState = useMemo<BookingDetailsFields>(
    () => ({
      name,
      email,
      company,
      phoneCountry,
      phoneNational,
      notes,
    }),
    [name, email, company, phoneCountry, phoneNational, notes],
  )

  function updateDetailField<K extends BookingField>(field: K, value: BookingDetailsFields[K]) {
    const next: BookingDetailsFields = { ...detailsState, [field]: value }
    if (field === 'name') setName(value as string)
    if (field === 'email') setEmail(value as string)
    if (field === 'company') setCompany(value as string)
    if (field === 'phoneCountry') setPhoneCountry(value as CountryCode)
    if (field === 'phoneNational') setPhoneNational(value as string)
    if (field === 'notes') setNotes(value as string)

    setFieldErrors((prev) => {
      const shouldRevalidate = submitAttempted || field in prev
      if (!shouldRevalidate) return prev
      const err = bookingFieldError(field, next)
      if (!err) {
        const { [field]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [field]: err }
    })
  }

  useEffect(() => {
    setConfigLoading(true)
    fetchBookingConfig()
      .then(setConfig)
      .catch(() =>
        setError(
          'Scheduling API is not reachable. Start the backend (uvicorn on port 8000) or use the contact form.',
        ),
      )
      .finally(() => setConfigLoading(false))
  }, [])

  const dayOptions = useMemo(() => {
    if (!config) return []
    return nextDaysInTimeZone(config.max_days_ahead, config.timezone)
  }, [config])

  const timezoneLabel = config ? formatTimeZoneLabel(config.timezone) : ''

  useEffect(() => {
    if (!config || dayOptions.length === 0) return
    const from = dayOptions[0]
    const to = dayOptions[dayOptions.length - 1]
    fetchAvailabilitySummary(from, to)
      .then((summary) => {
        const map: Record<string, DaySlotCount> = {}
        for (const day of summary.days) {
          map[day.date] = day
        }
        setOpenSlotsByDay(map)
      })
      .catch(() => {
        /* dates still work; fully-booked days just won't be greyed out */
      })
  }, [config, dayOptions])

  useEffect(() => {
    if (!selectedDate || step !== 'time') return
    setLoadingSlots(true)
    setError(null)
    fetchSlots(selectedDate, selectedDate)
      .then((res) => setSlots(res.slots))
      .catch(() => setError('Could not load times for this day.'))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate, step])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedSlot) return
    setSubmitAttempted(true)
    const validationErrors = validateBookingDetails(detailsState)
    setFieldErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix the highlighted fields.')
      return
    }

    const phoneE164 = formatPhoneE164(phoneCountry, phoneNational)

    setSubmitting(true)
    setError(null)
    try {
      const booked = await createBooking({
        name: name.trim(),
        email: email.trim(),
        start: selectedSlot.start,
        company: company.trim() || undefined,
        phone: phoneE164,
        notes: notes.trim() || undefined,
        source: 'book_page',
      })
      setResult({
        meeting_link: booked.meeting_link,
        start: booked.start,
        cancel_url: booked.cancel_url,
      })
      setStep('done')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Booking failed'
      setError(
        msg.toLowerCase().includes('no longer available')
          ? 'That time was just taken by another client. Please pick another slot.'
          : msg,
      )
    } finally {
      setSubmitting(false)
    }
  }

  const stepIndex = ['date', 'time', 'details'].indexOf(step)

  if (step === 'done' && result && config) {
    const when = formatBookingDateTime(result.start, config.timezone)
    return (
      <div className="panel-surface flex flex-col items-center p-10 text-center sm:p-12">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30">
          <CheckIcon />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">You&apos;re booked</h3>
        <p className="mt-2 text-accent font-medium">{when}</p>
        <p className="mt-4 max-w-sm text-sm text-muted">
          Confirmation sent to <strong className="text-text-primary">{email}</strong>. Use this link
          at the scheduled time:
        </p>
        <a
          href={result.meeting_link}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
          target="_blank"
          rel="noreferrer"
        >
          Join meeting
          <ArrowIcon className="h-4 w-4" />
        </a>
        {result.cancel_url && (
          <a
            href={result.cancel_url}
            className="mt-4 text-sm text-muted underline hover:text-accent"
          >
            Need to cancel? Free this slot for others
          </a>
        )}
        <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
          Book another slot
        </Button>
      </div>
    )
  }

  return (
    <div className="panel-surface p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap gap-2" aria-label="Booking progress">
        {(['date', 'time', 'details'] as const).map((s, i) => (
          <span
            key={s}
            className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide uppercase ${
              step === s
                ? 'border-accent bg-accent/10 text-accent'
                : stepIndex > i
                  ? 'border-border bg-bg-off text-muted'
                  : 'border-border text-muted'
            }`}
          >
            {i + 1}. {s === 'date' ? 'Date' : s === 'time' ? 'Time' : 'Details'}
          </span>
        ))}
      </div>

      {error && (
        <div
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
          {error.includes('not reachable') && (
            <span className="mt-2 block">
              <Link to="/contact" className="font-medium underline">
                Go to contact form →
              </Link>
            </span>
          )}
        </div>
      )}

      {configLoading && (
        <p className="text-sm text-muted">Loading available times…</p>
      )}

      {!configLoading && config && step === 'date' && (
        <div>
          <p className="mb-2 max-w-none text-sm text-muted">
            Pick a weekday ({config.slot_duration_minutes}-minute discovery call). All times in{' '}
            <strong className="text-text-primary">{timezoneLabel}</strong>.
          </p>
          <p className="mb-4 max-w-none text-xs text-muted">
            One booking per time slot. Booked times are hidden; cancel via email to release a slot.
            Need Saturday or Sunday?{' '}
            <Link to="/contact" className="font-medium text-accent hover:underline">
              Send us a message
            </Link>{' '}
            and we&apos;ll arrange a time.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {dayOptions.map((d) => {
              const dayInfo = openSlotsByDay[d]
              const isWeekend = isWeekendInTimeZone(d, config.timezone)
              const isClosed = isWeekend || dayInfo?.bookable === false
              const openCount = dayInfo?.available_count ?? 0
              const fullyBooked = !isClosed && openCount === 0

              if (isClosed) {
                return (
                  <div
                    key={d}
                    className="booking-day-card booking-day-card--closed min-h-[44px] rounded-lg border border-border bg-white/[0.02] px-3 py-2.5 text-sm"
                  >
                    <span className="block font-medium text-text-primary">
                      {formatDisplayDate(d, config.timezone)}
                    </span>
                    <span className="mt-1 block text-[11px] leading-snug text-muted">
                      Weekends by request
                    </span>
                    <Link
                      to="/contact"
                      className="mt-1.5 inline-flex text-[11px] font-semibold text-accent hover:underline"
                    >
                      Contact us →
                    </Link>
                  </div>
                )
              }

              return (
                <button
                  key={d}
                  type="button"
                  disabled={fullyBooked}
                  title={fullyBooked ? 'No open slots this day' : undefined}
                  className={`min-h-[44px] rounded-lg border px-3 py-2.5 text-sm transition-all ${
                    fullyBooked
                      ? 'cursor-not-allowed border-border bg-white/[0.02] text-muted opacity-60'
                      : selectedDate === d
                        ? 'border-accent bg-accent/10 font-medium text-accent'
                        : 'border-border bg-bg-off text-text-primary hover:border-accent/40'
                  }`}
                  onClick={() => {
                    if (fullyBooked) return
                    setSelectedDate(d)
                    setSelectedSlot(null)
                    setStep('time')
                    setError(null)
                  }}
                >
                  {formatDisplayDate(d, config.timezone)}
                  {fullyBooked && (
                    <span className="mt-0.5 block text-[10px] font-normal uppercase tracking-wide">
                      Full
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 'time' && selectedDate && (
        <div>
          <button
            type="button"
            className="mb-4 text-sm text-muted hover:text-accent"
            onClick={() => setStep('date')}
          >
            ← Change date
          </button>
          <p className="mb-4 text-sm text-muted">
            {formatDisplayDate(selectedDate, config?.timezone)} — available times ({timezoneLabel})
          </p>
          {loadingSlots ? (
            <p className="text-sm text-muted">Loading slots…</p>
          ) : slots.length === 0 ? (
            <div className="rounded-lg border border-border bg-white/[0.02] px-4 py-3 text-sm text-muted">
              <p>No open slots this day. Try another weekday.</p>
              <Link to="/contact" className="mt-2 inline-flex font-medium text-accent hover:underline">
                Or contact us directly →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {slots.map((slot) => (
                <button
                  key={slot.start}
                  type="button"
                  className={`min-h-[44px] rounded-lg border px-3 py-2.5 text-sm transition-all ${
                    selectedSlot?.start === slot.start
                      ? 'border-accent bg-accent/10 font-medium text-accent'
                      : 'border-border bg-white/5 text-white/80 hover:border-accent/50'
                  }`}
                  onClick={() => {
                    setSelectedSlot(slot)
                    setStep('details')
                    setError(null)
                  }}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 'details' && selectedSlot && selectedDate && (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <button
            type="button"
            className="text-sm text-muted hover:text-accent"
            onClick={() => {
              setStep('time')
              setError(null)
            }}
          >
            ← Change time
          </button>
          <p className="text-sm font-medium text-text-primary">
            {config
              ? formatBookingDateTime(selectedSlot.start, config.timezone)
              : `${formatDisplayDate(selectedDate)} at ${selectedSlot.label}`}
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-name" className="block text-sm font-medium text-text-primary">
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="booking-name"
                className={`${inputClass} mt-1.5 ${fieldErrors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
                value={name}
                onChange={(e) => updateDetailField('name', e.target.value)}
                autoComplete="name"
                maxLength={200}
                aria-invalid={fieldErrors.name ? true : undefined}
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="booking-email" className="block text-sm font-medium text-text-primary">
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="booking-email"
                className={`${inputClass} mt-1.5 ${fieldErrors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
                type="email"
                value={email}
                onChange={(e) => updateDetailField('email', e.target.value)}
                autoComplete="email"
                maxLength={254}
                aria-invalid={fieldErrors.email ? true : undefined}
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="booking-company" className="block text-sm font-medium text-text-primary">
              Company <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="booking-company"
              className={`${inputClass} mt-1.5 ${fieldErrors.company ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
              value={company}
              onChange={(e) => updateDetailField('company', e.target.value)}
              autoComplete="organization"
              maxLength={200}
            />
            {fieldErrors.company && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.company}</p>
            )}
          </div>
          <div>
            <label htmlFor="booking-phone" className="block text-sm font-medium text-text-primary">
              Phone <span className="font-normal text-muted">(optional)</span>
            </label>
            <PhoneField
              country={phoneCountry}
              national={phoneNational}
              onCountryChange={(code) => updateDetailField('phoneCountry', code)}
              onNationalChange={(value) => updateDetailField('phoneNational', value)}
              error={fieldErrors.phoneNational}
              disabled={submitting}
              inputClass={inputClass}
            />
          </div>
          <div>
            <label htmlFor="booking-notes" className="block text-sm font-medium text-text-primary">
              What should we discuss?{' '}
              <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="booking-notes"
              className={`${inputClass} mt-1.5 resize-none ${fieldErrors.notes ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
              rows={4}
              value={notes}
              onChange={(e) => updateDetailField('notes', e.target.value)}
              placeholder="Brief project context, timeline, goals…"
              maxLength={2000}
            />
            {fieldErrors.notes ? (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.notes}</p>
            ) : null}
            <div className="mt-1 flex justify-end text-xs text-muted">
              <span>{notes.length}/2000</span>
            </div>
          </div>

          <div className="booking-submit">
            <p className="booking-submit__hint max-w-none text-sm text-muted">
              Confirm to reserve this slot. We&apos;ll email your meeting link and a cancel link
              right away.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary booking-submit__btn w-full justify-center"
            >
              {submitting ? 'Booking…' : 'Confirm discovery call'}
              {!submitting && <ArrowIcon className="h-4 w-4" />}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
