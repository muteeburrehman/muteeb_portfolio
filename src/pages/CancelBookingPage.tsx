import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { cancelBooking, fetchBookingManage, type BookingManagePreview } from '../lib/bookingApi'
import { CheckIcon } from '../components/icons'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'

export function CancelBookingPage() {
  const [params] = useSearchParams()
  const token = params.get('token')?.trim() ?? ''

  const [preview, setPreview] = useState<BookingManagePreview | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      setError('Missing cancel link. Use the link from your confirmation email.')
      return
    }
    setLoading(true)
    setError(null)
    fetchBookingManage(token)
      .then(setPreview)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Could not load this booking.'),
      )
      .finally(() => setLoading(false))
  }, [token])

  async function handleCancel() {
    if (!token) return
    setCancelling(true)
    setError(null)
    try {
      await cancelBooking({ token })
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancellation failed')
    } finally {
      setCancelling(false)
    }
  }

  const when =
    preview?.starts_at &&
    new Date(preview.starts_at).toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })

  return (
    <div className="section-off min-h-screen pb-16 pt-8">
      <div className="container section-block max-w-xl">
        <Reveal>
          <SectionLabel>Schedule</SectionLabel>
          <h1 className="heading-section">Cancel discovery call</h1>
          <p className="mt-4 text-muted">
            Cancelling frees that time for other clients. You can book again anytime on the schedule
            page.
          </p>
        </Reveal>

        <Reveal delay={80} className="panel-surface mt-10 p-6 sm:p-8">
          {loading && <p className="text-sm text-muted">Loading booking…</p>}

          {error && (
            <div
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}

          {done && (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/30">
                <CheckIcon />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Booking cancelled</h2>
              <p className="mt-2 text-sm text-muted">
                That slot is open again. Someone else can book it, or you can pick a new time.
              </p>
              <Button to="/book" className="mt-6">
                Book a new call
              </Button>
            </div>
          )}

          {!loading && !done && preview && preview.status === 'confirmed' && (
            <div>
              <p className="text-sm text-muted">Scheduled for</p>
              <p className="mt-1 text-lg font-medium text-text-primary">{when}</p>
              <p className="mt-4 text-sm text-muted">
                {preview.name} · {preview.email}
              </p>
              <Button
                variant="outline"
                className="mt-8 w-full border-red-500/40 text-red-400 hover:border-red-500/60 hover:bg-red-500/10"
                disabled={cancelling}
                onClick={handleCancel}
              >
                {cancelling ? 'Cancelling…' : 'Cancel this booking'}
              </Button>
            </div>
          )}

          {!loading && !done && preview && preview.status === 'cancelled' && (
            <div>
              <p className="text-sm text-muted">This booking was already cancelled.</p>
              <Button to="/book" className="mt-6">
                Book a new call
              </Button>
            </div>
          )}

          {!loading && !error && !preview && !token && (
            <p className="text-sm text-muted">
              <Link to="/book" className="font-medium text-accent hover:underline">
                Go to scheduling →
              </Link>
            </p>
          )}

          <p className="mt-8 text-center text-sm text-muted">
            <Link to="/book" className="font-medium text-accent hover:underline">
              ← Back to booking
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  )
}
