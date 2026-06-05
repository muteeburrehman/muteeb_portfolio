import type { CountryCode } from 'libphonenumber-js'
import { DEFAULT_PHONE_COUNTRY, listCountryDialCodes } from '../lib/countryDialCodes'

type PhoneFieldProps = {
  country: CountryCode
  national: string
  onCountryChange: (code: CountryCode) => void
  onNationalChange: (value: string) => void
  error?: string
  disabled?: boolean
  inputClass: string
  id?: string
}

const countries = listCountryDialCodes()

export function PhoneField({
  country,
  national,
  onCountryChange,
  onNationalChange,
  error,
  disabled,
  inputClass,
  id = 'booking-phone',
}: PhoneFieldProps) {
  const selected = countries.some((c) => c.code === country)
    ? country
    : DEFAULT_PHONE_COUNTRY

  return (
    <div>
      <div className="mt-1.5 flex gap-2">
        <div className="relative w-[min(100%,11rem)] shrink-0">
          <select
            id={`${id}-country`}
            aria-label="Country code"
            value={selected}
            onChange={(e) => onCountryChange(e.target.value as CountryCode)}
            className={`${inputClass} cursor-pointer appearance-none pr-8`}
            disabled={disabled}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.dial} {c.name}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={national}
          onChange={(e) => onNationalChange(e.target.value)}
          placeholder="300 1234567"
          className={`${inputClass} min-w-0 flex-1`}
          disabled={disabled}
          maxLength={20}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : (
        <p className="mt-1.5 text-xs text-muted">Optional — include your local number without country code.</p>
      )}
    </div>
  )
}
