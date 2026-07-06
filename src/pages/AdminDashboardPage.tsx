import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminAnalyticsPanel, type AnalyticsMetric } from '../components/admin/AdminAnalyticsPanel'
import { AdminCompose, composeDraftFromContact, type ComposeDraft } from '../components/admin/AdminCompose'
import { AdminConfirmDialog, type AdminConfirmOptions } from '../components/admin/AdminConfirmDialog'
import { AdminShell } from '../components/AdminShell'
import {
  CalendarIcon,
  ChatBubbleIcon,
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  InboxIcon,
  LogOutIcon,
  MailIcon,
  MicIcon,
  PrintIcon,
  RefreshIcon,
  TrashIcon,
  XCircleIcon,
} from '../components/icons'
import { Reveal } from '../components/ui/Reveal'
import { useAdminSession } from '../hooks/useAdminSession'
import { SITE_BRAND } from '../data/portfolio'
import {
  cancelAdminBooking,
  deleteAdminBooking,
  deleteAdminContact,
  downloadContactsCsv,
  fetchAdminAnalytics,
  fetchAdminBookings,
  fetchAdminContacts,
  fetchAdminOverview,
  formatAdminDateTime,
  formatAdminDateTimeCompact,
  markContactReplied,
  type AdminAnalytics,
  type AdminBooking,
  type AdminContact,
  type AdminOverview,
} from '../lib/adminApi'

type Tab = 'overview' | 'contacts' | 'bookings' | 'compose'

type StatTone = 'amber' | 'green' | 'blue' | 'violet'

function StatCard({
  label,
  value,
  tone,
  icon,
}: {
  label: string
  value: number
  tone: StatTone
  icon: ReactNode
}) {
  return (
    <div className={`admin-stat-card admin-stat-card--${tone}`}>
      <div className="admin-stat-card__icon" aria-hidden>
        {icon}
      </div>
      <div className="admin-stat-card__content">
        <p className="admin-stat-label">{label}</p>
        <p className="admin-stat-value">{value}</p>
      </div>
    </div>
  )
}

function AdminBusySpinner() {
  return (
    <svg aria-hidden="true" className="admin-icon-btn__spinner" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M21 12a9 9 0 00-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function EmptyState({
  title,
  detail,
  icon,
}: {
  title: string
  detail: string
  icon: ReactNode
}) {
  return (
    <div className="admin-empty">
      <div className="admin-empty__icon" aria-hidden>
        {icon}
      </div>
      <p className="admin-empty__title">{title}</p>
      <p className="admin-empty__detail">{detail}</p>
    </div>
  )
}

function ToolbarButton({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  danger?: boolean
}) {
  return (
    <button
      type="button"
      className={`admin-toolbar-btn${danger ? ' admin-toolbar-btn--danger' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const { isAdmin, checking, logout, email } = useAdminSession()
  const [tab, setTab] = useState<Tab>('overview')
  const [overview, setOverview] = useState<AdminOverview | null>(null)
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [contacts, setContacts] = useState<AdminContact[]>([])
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [composeDraft, setComposeDraft] = useState<ComposeDraft | null>(null)
  const [contactFilter, setContactFilter] = useState<'all' | 'pending' | 'replied'>('all')
  const [bookingFilter, setBookingFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all')
  const [overviewLoading, setOverviewLoading] = useState(true)
  const [listLoading, setListLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analyticsDays, setAnalyticsDays] = useState(14)
  const [analyticsMetric, setAnalyticsMetric] = useState<AnalyticsMetric>('all')
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [confirm, setConfirm] = useState<AdminConfirmOptions | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true)
    try {
      const next = await fetchAdminAnalytics(analyticsDays)
      setAnalytics(next)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load analytics'
      setError(message)
      if (message === 'Session expired') navigate('/admin/login', { replace: true })
    } finally {
      setAnalyticsLoading(false)
    }
  }, [analyticsDays, navigate])

  const loadOverview = useCallback(async () => {
    try {
      const nextOverview = await fetchAdminOverview()
      setOverview(nextOverview)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load overview'
      setError(message)
      if (message === 'Session expired') navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  const loadContacts = useCallback(async () => {
    setListLoading(true)
    try {
      const nextContacts = await fetchAdminContacts(contactFilter)
      setContacts(nextContacts)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load contacts'
      setError(message)
      if (message === 'Session expired') navigate('/admin/login', { replace: true })
    } finally {
      setListLoading(false)
    }
  }, [contactFilter, navigate])

  const loadBookings = useCallback(async () => {
    setListLoading(true)
    try {
      const nextBookings = await fetchAdminBookings(bookingFilter)
      setBookings(nextBookings)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load bookings'
      setError(message)
      if (message === 'Session expired') navigate('/admin/login', { replace: true })
    } finally {
      setListLoading(false)
    }
  }, [bookingFilter, navigate])

  const refreshAll = useCallback(async () => {
    setOverviewLoading(true)
    setError(null)
    try {
      await Promise.all([
        loadOverview(),
        loadContacts(),
        loadBookings(),
        tab === 'overview' ? loadAnalytics() : Promise.resolve(),
      ])
    } finally {
      setOverviewLoading(false)
    }
  }, [loadAnalytics, loadBookings, loadContacts, loadOverview, tab])

  useEffect(() => {
    if (!checking && !isAdmin) {
      navigate('/admin/login', { replace: true })
    }
  }, [checking, isAdmin, navigate])

  useEffect(() => {
    if (!isAdmin) return
    void (async () => {
      setOverviewLoading(true)
      await loadOverview()
      setOverviewLoading(false)
    })()
  }, [isAdmin, loadOverview])

  useEffect(() => {
    if (!isAdmin) return
    void loadContacts()
  }, [isAdmin, loadContacts])

  useEffect(() => {
    if (!isAdmin) return
    void loadBookings()
  }, [isAdmin, loadBookings])

  useEffect(() => {
    if (!isAdmin || tab !== 'overview') return
    void loadAnalytics()
  }, [isAdmin, tab, loadAnalytics])

  async function handleMarkReplied(contactId: string) {
    setBusyId(contactId)
    try {
      await markContactReplied(contactId)
      await Promise.all([loadOverview(), loadContacts()])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setBusyId(null)
    }
  }

  function handleCancelBooking(booking: AdminBooking) {
    if (booking.status === 'cancelled') return
    setConfirm({
      title: 'Cancel discovery call?',
      message: (
        <>
          Cancel this <strong>{SITE_BRAND}</strong> discovery call?{' '}
          <span className="admin-modal__client">{booking.name}</span> will receive a cancellation email
          and the time slot will reopen for others.
        </>
      ),
      confirmLabel: 'Cancel call',
      cancelLabel: 'Keep booking',
      danger: true,
      onConfirm: async () => {
        setBusyId(booking.id)
        setError(null)
        try {
          await cancelAdminBooking(booking.id)
          setConfirm(null)
          await Promise.all([
            loadOverview(),
            loadBookings(),
            tab === 'overview' ? loadAnalytics() : Promise.resolve(),
          ])
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Cancel failed')
        } finally {
          setBusyId(null)
        }
      },
    })
  }

  function handleDeleteBooking(booking: AdminBooking) {
    setConfirm({
      title: 'Delete booking permanently?',
      message: (
        <>
          Remove the booking for <span className="admin-modal__client">{booking.name}</span> from your
          dashboard? The time slot will reopen. <strong>No email</strong> is sent to the client — use
          Cancel instead if they should be notified.
        </>
      ),
      confirmLabel: 'Delete booking',
      cancelLabel: 'Keep',
      danger: true,
      onConfirm: async () => {
        setBusyId(booking.id)
        setError(null)
        try {
          await deleteAdminBooking(booking.id)
          setConfirm(null)
          await Promise.all([
            loadOverview(),
            loadBookings(),
            tab === 'overview' ? loadAnalytics() : Promise.resolve(),
          ])
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Delete failed')
        } finally {
          setBusyId(null)
        }
      },
    })
  }

  function handleDeleteContact(contact: AdminContact) {
    setConfirm({
      title: 'Delete contact?',
      message: (
        <>
          Permanently delete the message from{' '}
          <span className="admin-modal__client">{contact.name}</span>? This cannot be undone.
        </>
      ),
      confirmLabel: 'Delete contact',
      cancelLabel: 'Keep',
      danger: true,
      onConfirm: async () => {
        setBusyId(contact.id)
        setError(null)
        try {
          await deleteAdminContact(contact.id)
          setConfirm(null)
          await Promise.all([loadOverview(), loadContacts()])
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Delete failed')
        } finally {
          setBusyId(null)
        }
      },
    })
  }

  function openComposeForContact(contact: AdminContact) {
    setComposeDraft(composeDraftFromContact(contact))
    setTab('compose')
  }

  function handlePrint() {
    window.print()
  }

  async function handleCsvExport() {
    try {
      await downloadContactsCsv(contactFilter)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    }
  }

  const headerActions = (
    <>
      <ToolbarButton onClick={() => void refreshAll()} disabled={overviewLoading || listLoading}>
        <RefreshIcon />
        <span>Refresh</span>
      </ToolbarButton>
      <ToolbarButton onClick={() => void handleCsvExport()}>
        <DownloadIcon />
        <span>Export CSV</span>
      </ToolbarButton>
      <ToolbarButton onClick={handlePrint}>
        <PrintIcon />
        <span>Print / PDF</span>
      </ToolbarButton>
      <ToolbarButton
        danger
        onClick={() => {
          logout()
          navigate('/admin/login', { replace: true })
        }}
      >
        <LogOutIcon />
        <span>Sign out</span>
      </ToolbarButton>
    </>
  )

  if (checking || !isAdmin) {
    return (
      <AdminShell>
        <div className="admin-page">
          <p className="admin-loading">Loading dashboard…</p>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell actions={headerActions}>
      <div className="admin-page" id="admin-print-root">
        <Reveal>
          <header className="admin-page__intro">
            <div>
              <h1 className="admin-page__title">Pipeline dashboard</h1>
              <p className="admin-page__subtitle">Signed in as {email}</p>
            </div>
          </header>
        </Reveal>

        {overview && (
          <Reveal delay={60}>
            <div className="admin-stats-grid">
              <StatCard
                label="Pending reply"
                value={overview.contacts_pending}
                tone="amber"
                icon={<ClockIcon className="h-5 w-5" />}
              />
              <StatCard
                label="Replied"
                value={overview.contacts_replied}
                tone="green"
                icon={<CheckIcon className="h-5 w-5" />}
              />
              <StatCard
                label="Total bookings"
                value={overview.bookings_confirmed + overview.bookings_cancelled}
                tone="violet"
                icon={<CalendarIcon className="h-5 w-5" />}
              />
              <StatCard
                label="Upcoming meetings"
                value={overview.bookings_upcoming}
                tone="blue"
                icon={<MicIcon className="h-5 w-5" />}
              />
            </div>
          </Reveal>
        )}

        {error && (
          <p className="admin-alert admin-alert--error mt-6" role="alert">
            {error}
          </p>
        )}

        <Reveal delay={100} className="admin-panel panel-surface">
          <div className="admin-panel__toolbar no-print">
            <div className="admin-tabs">
              <button
                type="button"
                className={tab === 'overview' ? 'admin-tab admin-tab--active' : 'admin-tab'}
                onClick={() => setTab('overview')}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Overview</span>
              </button>
              <button
                type="button"
                className={tab === 'contacts' ? 'admin-tab admin-tab--active' : 'admin-tab'}
                onClick={() => setTab('contacts')}
              >
                <ChatBubbleIcon className="h-4 w-4" />
                <span>Contacts</span>
                {overview ? <span className="admin-tab__count">{overview.contacts_total}</span> : null}
              </button>
              <button
                type="button"
                className={tab === 'bookings' ? 'admin-tab admin-tab--active' : 'admin-tab'}
                onClick={() => setTab('bookings')}
              >
                <MicIcon className="h-4 w-4" />
                <span>Bookings</span>
                {overview ? (
                  <span className="admin-tab__count">
                    {overview.bookings_confirmed + overview.bookings_cancelled}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                className={tab === 'compose' ? 'admin-tab admin-tab--active' : 'admin-tab'}
                onClick={() => setTab('compose')}
              >
                <MailIcon className="h-4 w-4" />
                <span>Compose</span>
              </button>
            </div>

            {tab === 'contacts' ? (
              <label className="admin-filter">
                <span className="admin-filter__label">Show</span>
                <select
                  value={contactFilter}
                  onChange={(e) => setContactFilter(e.target.value as typeof contactFilter)}
                  className="form-input form-select admin-filter__select"
                >
                  <option value="all">All contacts</option>
                  <option value="pending">Pending reply</option>
                  <option value="replied">Replied</option>
                </select>
              </label>
            ) : tab === 'bookings' ? (
              <label className="admin-filter">
                <span className="admin-filter__label">Show</span>
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value as typeof bookingFilter)}
                  className="form-input form-select admin-filter__select"
                >
                  <option value="all">All bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
            ) : null}
          </div>

          {tab === 'overview' && (
            <div className="admin-overview-panel">
              {analytics ? (
                <AdminAnalyticsPanel
                  data={analytics}
                  days={analyticsDays}
                  metric={analyticsMetric}
                  loading={analyticsLoading}
                  onDaysChange={setAnalyticsDays}
                  onMetricChange={setAnalyticsMetric}
                />
              ) : (
                <p className="admin-loading">Loading analytics…</p>
              )}
            </div>
          )}

          {tab === 'compose' && (
            <AdminCompose
              draft={composeDraft}
              onSent={() => {
                void Promise.all([loadOverview(), loadContacts()])
              }}
            />
          )}

          {listLoading && tab !== 'overview' && tab !== 'compose' ? (
            <p className="admin-loading">Loading records…</p>
          ) : tab === 'contacts' ? (
            <>
              {contacts.length === 0 ? (
                <EmptyState
                  icon={<InboxIcon className="h-8 w-8" />}
                  title="No contacts in this view"
                  detail='New contact form submissions will appear here. Try "All contacts" if you filtered to pending only.'
                />
              ) : (
                <>
                  <div className="admin-table-wrap">
                    <table className="admin-table admin-table--contacts">
                      <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="admin-table__col-actions" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Topic</th>
                          <th>Received</th>
                          <th>Status</th>
                          <th className="no-print admin-table__th-actions">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((row) => (
                          <tr key={row.id}>
                            <td data-label="Name" className="admin-table__clip-cell">
                              <span className="admin-table__clip" title={row.name}>
                                {row.name}
                              </span>
                            </td>
                            <td data-label="Email" className="admin-table__clip-cell">
                              <a
                                href={`mailto:${row.email}`}
                                className="admin-link admin-table__clip"
                                title={row.email}
                              >
                                {row.email}
                              </a>
                            </td>
                            <td data-label="Topic" className="admin-table__clip-cell">
                              <span
                                className="admin-table__clip"
                                title={row.topic || row.service || '—'}
                              >
                                {row.topic || row.service || '—'}
                              </span>
                            </td>
                            <td
                              data-label="Received"
                              className="admin-table__when admin-table__when--compact"
                              title={formatAdminDateTime(row.created_at)}
                            >
                              {formatAdminDateTimeCompact(row.created_at)}
                            </td>
                            <td data-label="Status" className="admin-table__status">
                              <span
                                className={
                                  row.replied
                                    ? 'admin-badge admin-badge--ok'
                                    : 'admin-badge admin-badge--pending'
                                }
                              >
                                {row.replied ? 'Replied' : 'Pending'}
                              </span>
                            </td>
                            <td data-label="Action" className="no-print admin-table__actions">
                              <div className="admin-table__action-toolbar" role="group" aria-label="Contact actions">
                                {!row.replied ? (
                                  <button
                                    type="button"
                                    className="admin-icon-btn admin-icon-btn--ok"
                                    disabled={busyId === row.id}
                                    title="Mark replied"
                                    aria-label="Mark replied"
                                    onClick={() => void handleMarkReplied(row.id)}
                                  >
                                    {busyId === row.id ? <AdminBusySpinner /> : <CheckIcon />}
                                  </button>
                                ) : (
                                  <span className="admin-icon-btn--spacer" aria-hidden="true" />
                                )}
                                <button
                                  type="button"
                                  className="admin-icon-btn admin-icon-btn--ghost"
                                  title="Email contact"
                                  aria-label="Email contact"
                                  onClick={() => openComposeForContact(row)}
                                >
                                  <MailIcon />
                                </button>
                                <button
                                  type="button"
                                  className="admin-icon-btn admin-icon-btn--danger"
                                  disabled={busyId === row.id}
                                  title="Delete contact"
                                  aria-label="Delete contact"
                                  onClick={() => handleDeleteContact(row)}
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <details className="admin-details no-print">
                    <summary>Message previews</summary>
                    <div className="admin-message-list">
                      {contacts.map((row) => (
                        <article key={row.id} className="admin-message-card">
                          <header className="admin-message-card__head">
                            <strong>{row.name}</strong>
                            <span>{row.email}</span>
                            <time>{formatAdminDateTime(row.created_at)}</time>
                          </header>
                          <p className="admin-message-card__body">{row.message}</p>
                        </article>
                      ))}
                    </div>
                  </details>
                </>
              )}
            </>
          ) : tab === 'bookings' ? (
            bookings.length === 0 ? (
              <EmptyState
                icon={<CalendarIcon className="h-8 w-8" />}
                title="No bookings in this view"
                detail="Discovery calls booked on /book will show up here with meeting links and contact details."
              />
            ) : (
              <div className="admin-table-wrap">
              <table className="admin-table admin-table--bookings">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col className="admin-table__col-actions" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>When</th>
                    <th>Meeting</th>
                    <th>Status</th>
                    <th className="no-print admin-table__th-actions">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((row) => (
                    <tr key={row.id}>
                      <td data-label="Client">
                        <div className="admin-client-cell">
                          <strong>{row.name}</strong>
                          <a href={`mailto:${row.email}`} className="admin-link">
                            {row.email}
                          </a>
                          {row.phone && <span className="admin-client-cell__meta">{row.phone}</span>}
                          {row.company && <span className="admin-client-cell__meta">{row.company}</span>}
                          {row.notes && <span className="admin-client-cell__notes">{row.notes}</span>}
                        </div>
                      </td>
                      <td
                        data-label="When"
                        className="admin-table__when admin-table__when--compact"
                        title={formatAdminDateTime(row.starts_at)}
                      >
                        {formatAdminDateTimeCompact(row.starts_at)}
                      </td>
                      <td data-label="Meeting" className="admin-table__meeting">
                        <a
                          href={row.meeting_link}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-meet-btn"
                        >
                          Join meeting
                        </a>
                      </td>
                      <td data-label="Status" className="admin-table__status">
                        <span
                          className={
                            row.status === 'confirmed'
                              ? 'admin-badge admin-badge--ok'
                              : 'admin-badge admin-badge--muted'
                          }
                        >
                          {row.status}
                        </span>
                      </td>
                      <td data-label="Action" className="no-print admin-table__actions">
                        <div
                          className="admin-table__action-toolbar admin-table__action-toolbar--pair"
                          role="group"
                          aria-label="Booking actions"
                        >
                          {row.status === 'confirmed' ? (
                            <button
                              type="button"
                              className="admin-icon-btn admin-icon-btn--danger"
                              disabled={busyId === row.id}
                              title="Cancel booking"
                              aria-label="Cancel booking"
                              onClick={() => handleCancelBooking(row)}
                            >
                              {busyId === row.id ? <AdminBusySpinner /> : <XCircleIcon />}
                            </button>
                          ) : (
                            <span className="admin-icon-btn--spacer" aria-hidden="true" />
                          )}
                          <button
                            type="button"
                            className="admin-icon-btn admin-icon-btn--ghost"
                            disabled={busyId === row.id}
                            title="Delete booking"
                            aria-label="Delete booking"
                            onClick={() => handleDeleteBooking(row)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )
          ) : null}
        </Reveal>
      </div>

      <AdminConfirmDialog
        open={confirm}
        busy={busyId !== null}
        onClose={() => {
          if (!busyId) setConfirm(null)
        }}
      />
    </AdminShell>
  )
}
