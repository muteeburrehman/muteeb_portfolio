import { useMemo } from 'react'
import { formatChartLabel, type AdminAnalytics } from '../../lib/adminApi'

export type AnalyticsMetric =
  | 'all'
  | 'contacts'
  | 'bookings'
  | 'bookings_confirmed'
  | 'bookings_cancelled'
  | 'contacts_replied'

type SeriesDef = {
  key: string
  label: string
  values: number[]
  className: string
  metric: AnalyticsMetric
}

type AdminAnalyticsPanelProps = {
  data: AdminAnalytics
  days: number
  metric: AnalyticsMetric
  loading?: boolean
  onDaysChange: (days: number) => void
  onMetricChange: (metric: AnalyticsMetric) => void
}

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0)
}

function peak(series: SeriesDef[]): number {
  let max = 0
  for (const row of series) {
    for (const value of row.values) max = Math.max(max, value)
  }
  return Math.max(max, 1)
}

export function AdminAnalyticsPanel({
  data,
  days,
  metric,
  loading,
  onDaysChange,
  onMetricChange,
}: AdminAnalyticsPanelProps) {
  const allSeries: SeriesDef[] = useMemo(
    () => [
      {
        key: 'contacts',
        label: 'New contacts',
        values: data.contacts_per_day,
        className: 'admin-chart-bar--contacts',
        metric: 'contacts',
      },
      {
        key: 'contacts_replied',
        label: 'Contacts replied',
        values: data.contacts_replied_per_day,
        className: 'admin-chart-bar--replied',
        metric: 'contacts_replied',
      },
      {
        key: 'bookings',
        label: 'All bookings',
        values: data.bookings_per_day,
        className: 'admin-chart-bar--bookings',
        metric: 'bookings',
      },
      {
        key: 'bookings_confirmed',
        label: 'Confirmed',
        values: data.bookings_confirmed_per_day,
        className: 'admin-chart-bar--confirmed',
        metric: 'bookings_confirmed',
      },
      {
        key: 'bookings_cancelled',
        label: 'Cancelled',
        values: data.bookings_cancelled_per_day,
        className: 'admin-chart-bar--cancelled',
        metric: 'bookings_cancelled',
      },
    ],
    [data],
  )

  const visibleSeries = useMemo(() => {
    if (metric === 'all') {
      return allSeries.filter((s) => ['contacts', 'bookings'].includes(s.key))
    }
    return allSeries.filter((s) => s.metric === metric)
  }, [allSeries, metric])

  const chartMax = peak(visibleSeries)

  const totals = useMemo(
    () => ({
      contacts: sum(data.contacts_per_day),
      replied: sum(data.contacts_replied_per_day),
      bookings: sum(data.bookings_per_day),
      confirmed: sum(data.bookings_confirmed_per_day),
      cancelled: sum(data.bookings_cancelled_per_day),
    }),
    [data],
  )

  return (
    <div className="admin-analytics">
      <div className="admin-analytics__toolbar">
        <div>
          <h2 className="admin-analytics__title">Pipeline analytics</h2>
          <p className="admin-analytics__subtitle">Filter by period and activity type to track funnel progress.</p>
        </div>
        <div className="admin-analytics__filters">
          <label className="admin-filter">
            <span className="admin-filter__label">Period</span>
            <select
              value={days}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="form-input form-select admin-filter__select"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </label>
          <label className="admin-filter">
            <span className="admin-filter__label">Show</span>
            <select
              value={metric}
              onChange={(e) => onMetricChange(e.target.value as AnalyticsMetric)}
              className="form-input form-select admin-filter__select"
            >
              <option value="all">All activity</option>
              <option value="contacts">New contacts</option>
              <option value="contacts_replied">Contacts replied</option>
              <option value="bookings">All bookings</option>
              <option value="bookings_confirmed">Confirmed bookings</option>
              <option value="bookings_cancelled">Cancelled bookings</option>
            </select>
          </label>
        </div>
      </div>

      <div className="admin-analytics__totals">
        <div className="admin-analytics__total">
          <span className="admin-analytics__total-label">New contacts</span>
          <strong>{totals.contacts}</strong>
        </div>
        <div className="admin-analytics__total">
          <span className="admin-analytics__total-label">Replied</span>
          <strong>{totals.replied}</strong>
        </div>
        <div className="admin-analytics__total">
          <span className="admin-analytics__total-label">Bookings</span>
          <strong>{totals.bookings}</strong>
        </div>
        <div className="admin-analytics__total">
          <span className="admin-analytics__total-label">Confirmed</span>
          <strong>{totals.confirmed}</strong>
        </div>
        <div className="admin-analytics__total">
          <span className="admin-analytics__total-label">Cancelled</span>
          <strong>{totals.cancelled}</strong>
        </div>
      </div>

      {loading ? (
        <p className="admin-loading">Updating analytics…</p>
      ) : (
        <>
          <div className="admin-analytics__chart" aria-hidden>
            {data.labels.map((iso, index) => {
              const dayTotal = visibleSeries.reduce((acc, row) => acc + (row.values[index] ?? 0), 0)
              if (dayTotal === 0) return null
              return (
                <div key={iso} className="admin-analytics__chart-row" title={`${formatChartLabel(iso)}: ${dayTotal}`}>
                  <span className="admin-analytics__chart-label">{formatChartLabel(iso)}</span>
                  <div className="admin-analytics__chart-track">
                    {visibleSeries.map((row) => {
                      const value = row.values[index] ?? 0
                      if (!value) return null
                      const width = `${Math.max(4, Math.round((value / chartMax) * 100))}%`
                      return (
                        <span
                          key={row.key}
                          className={`admin-analytics__chart-segment ${row.className}`}
                          style={{ width }}
                          title={`${row.label}: ${value}`}
                        />
                      )
                    })}
                  </div>
                  <span className="admin-analytics__chart-value">{dayTotal}</span>
                </div>
              )
            })}
          </div>

          <div className="admin-charts__legend admin-analytics__legend">
            {visibleSeries.map((row) => (
              <span key={row.key} className="admin-charts__legend-item">
                <span className={`admin-charts__swatch ${row.className}`} />
                {row.label}
              </span>
            ))}
          </div>

          <div className="admin-chart-table-wrap">
            <table className="admin-chart-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {visibleSeries.map((row) => (
                    <th key={row.key}>{row.label}</th>
                  ))}
                  <th>Day total</th>
                  <th className="admin-chart-table__viz-head">Bars</th>
                </tr>
              </thead>
              <tbody>
                {data.labels.map((iso, index) => {
                  const dayTotal = visibleSeries.reduce((acc, row) => acc + (row.values[index] ?? 0), 0)
                  return (
                    <tr key={iso}>
                      <td>{formatChartLabel(iso)}</td>
                      {visibleSeries.map((row) => (
                        <td key={row.key}>
                          <span className="admin-chart-table__num">{row.values[index] ?? 0}</span>
                        </td>
                      ))}
                      <td>
                        <strong className="admin-chart-table__num">{dayTotal}</strong>
                      </td>
                      <td>
                        <div className="admin-chart-bars">
                          {visibleSeries.map((row) => {
                            const value = row.values[index] ?? 0
                            const height = `${Math.round((value / chartMax) * 100)}%`
                            return (
                              <span
                                key={row.key}
                                className={`admin-chart-bar ${row.className}`}
                                style={{ height: value ? height : '2px' }}
                                title={`${row.label}: ${value}`}
                              />
                            )
                          })}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
