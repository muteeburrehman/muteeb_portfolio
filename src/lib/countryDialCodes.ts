import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js'

export type CountryDial = {
  code: CountryCode
  name: string
  dial: string
}

let cached: CountryDial[] | null = null

/** All countries/territories supported by libphonenumber, sorted by name. */
export function listCountryDialCodes(): CountryDial[] {
  if (cached) return cached

  const display = new Intl.DisplayNames(['en'], { type: 'region' })

  cached = getCountries()
    .map((code) => {
      try {
        return {
          code,
          name: display.of(code) ?? code,
          dial: `+${getCountryCallingCode(code)}`,
        }
      } catch {
        return null
      }
    })
    .filter((row): row is CountryDial => row !== null)
    .sort((a, b) => a.name.localeCompare(b.name))

  return cached
}

export const DEFAULT_PHONE_COUNTRY: CountryCode = 'PK'
