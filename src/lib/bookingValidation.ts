import {
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,199}$/u

export type BookingDetailsFields = {
  name: string
  email: string
  company: string
  phoneCountry: CountryCode
  phoneNational: string
  notes: string
}

export type BookingField = keyof BookingDetailsFields

export function bookingFieldError(
  field: BookingField,
  state: BookingDetailsFields,
): string | undefined {
  switch (field) {
    case 'name': {
      const value = state.name.trim()
      if (!value) return 'Name is required'
      if (value.length < 2) return 'Name must be at least 2 characters'
      if (value.length > 200) return 'Name is too long (max 200 characters)'
      if (!NAME_RE.test(value)) return 'Enter a valid name (letters only)'
      return undefined
    }
    case 'email': {
      const value = state.email.trim()
      if (!value) return 'Email is required'
      if (value.length > 254) return 'Email is too long'
      if (!EMAIL_RE.test(value)) return 'Enter a valid email address'
      return undefined
    }
    case 'company': {
      const value = state.company.trim()
      if (value.length > 200) return 'Company name is too long (max 200 characters)'
      return undefined
    }
    case 'phoneNational':
      return validatePhoneNational(state.phoneCountry, state.phoneNational)
    case 'phoneCountry':
      return undefined
    case 'notes': {
      if (state.notes.length > 2000) return 'Notes are too long (max 2000 characters)'
      return undefined
    }
    default:
      return undefined
  }
}

export function validatePhoneNational(
  country: CountryCode,
  national: string,
): string | undefined {
  const trimmed = national.trim()
  if (!trimmed) return undefined

  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 6) return 'Enter a valid phone number'

  const parsed = parsePhoneNumberFromString(trimmed, country)
  if (!parsed?.isValid()) {
    return 'Enter a valid phone number for the selected country'
  }
  return undefined
}

export function formatPhoneE164(
  country: CountryCode,
  national: string,
): string | undefined {
  const trimmed = national.trim()
  if (!trimmed) return undefined

  const parsed = parsePhoneNumberFromString(trimmed, country)
  if (!parsed?.isValid()) return undefined
  return parsed.format('E.164')
}

export function validateBookingDetails(state: BookingDetailsFields): Partial<
  Record<BookingField, string>
> {
  const fields: BookingField[] = [
    'name',
    'email',
    'company',
    'phoneNational',
    'notes',
  ]
  const errors: Partial<Record<BookingField, string>> = {}
  for (const field of fields) {
    const err = bookingFieldError(field, state)
    if (err) errors[field] = err
  }
  return errors
}
