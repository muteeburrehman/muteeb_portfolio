import type { ReactElement } from 'react'

type TechLogoProps = {
  name: string
  className?: string
}

const LOGOS: Record<string, () => ReactElement> = {
  React: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6.5c4.97 0 9 1.57 9 3.5S16.97 11 12 11 3 9.43 3 7.5 7.03 4 12 4zm0 14c-4.97 0-9-1.57-9-3.5S7.03 11 12 11s9 1.57 9 3.5-4.03 3.5-9 3.5z" />
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.5 2C7.57 2 6 3.46 6 5.25V7h6V6H8.5c-.28 0-.5-.22-.5-.5S8.22 5 8.5 5H14v2.75C14 9.54 12.43 11 10.5 11H6v1.75C6 14.54 7.57 16 9.5 16H14v2.5c0 .28.22.5.5.5s.5-.22.5-.5V16h3.5c1.93 0 3.5-1.46 3.5-3.25V9.25C21 7.46 19.43 6 17.5 6H15V5.25C15 3.46 13.43 2 11.5 2H9.5zm-1 2h3c.83 0 1.5.67 1.5 1.5S12.33 7 11.5 7h-3C7.67 7 7 6.33 7 5.5S7.67 4 8.5 4zm8 12c-.83 0-1.5-.67-1.5-1.5S15.67 13 16.5 13h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3z" />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c-2.2 0-4 1.8-4 4v1H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2V6c0-2.2-1.8-4-4-4zm-2 4V6c0-1.1.9-2 2-2s2 .9 2 2v1h-4zm1 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 14.5c3.2 2.4 7.4 3.8 11.8 3.8 2.3 0 4.6-.4 6.7-1.2-.3.3-.6.7-.9 1-2.5 2.7-5.8 4.2-9.3 4.2-3.8 0-7.3-1.7-9.6-4.6 1.1.9 2.4 1.6 3.8 2.1-.4-.5-.8-1.1-1.1-1.7-.5-1-.8-2.1-.8-3.2 0-1.2.3-2.3.8-3.3.3-.6.7-1.2 1.1-1.7-1.4.5-2.7 1.2-3.8 2.1zM12 3C7 3 2.7 5.4.5 9c.4-.5.9-1 1.4-1.4C4.8 5.8 8.2 4 12 4c3.8 0 7.2 1.8 10.1 4.6.5.4 1 .9 1.4 1.4C21.3 5.4 17 3 12 3z" />
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 00-4.9 11.9L3 20.5l6.6-3.1A7 7 0 1012 2zm0 2a5 5 0 110 10 5 5 0 010-10z" />
    </svg>
  ),
  LangChain: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 6h16v2H4V6zm0 5h10v2H4v-2zm0 5h16v2H4v-2z" />
    </svg>
  ),
  n8n: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6zm2 4h8v2H8V8zm0 4h5v2H8v-2z" />
    </svg>
  ),
  Django: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h7v16H4V4zm9 0h7v3h-7V4zm0 5h7v11h-7V9z" />
    </svg>
  ),
  Claude: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5L12 2z" />
    </svg>
  ),
  Gemini: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14 2 9.2h7.6L12 2z" />
    </svg>
  ),
  Qdrant: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 8L2 15l10 5 10-5-10-5z" />
    </svg>
  ),
  FastAPI: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zm-3 8v4c0 1.66 1.34 3 3 3s3-1.34 3-3v-4H9zm3 10c-2.76 0-5-2.24-5-5h10c0 2.76-2.24 5-5 5z" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.983 8.878h-2.073v-2.073h2.073zm0 2.59h-2.073v-2.073h2.073zm-2.59-2.59H9.32v-2.073h2.073zm0 2.59H9.32v-2.073h2.073zm-2.59-2.59H6.73v-2.073h2.073zm0 2.59H6.73v-2.073h2.073zm-2.59-2.59H4.14v-2.073h2.073zm0 2.59H4.14v-2.073h2.073zm10.36 0h-2.073V8.878h2.073zm2.59 0h-2.073V8.878h2.073zm0-2.59h-2.073v-2.073h2.073zm2.59 2.59h-2.073v-2.073h2.073zm-19.169 5.7c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-1.036H3.344zm20.73 0c0-1.036-.839-1.875-1.875-1.875h-1.875v3.75h1.875c1.036 0 1.875-.839 1.875-1.875z" />
    </svg>
  ),
  'Next.js': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l6-10v4h4l-6 10z" />
    </svg>
  ),
  'Node.js': () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2.2c1.2 0 2.3.3 3.3.8l-1.4 2.4a4.8 4.8 0 00-1.9-.4c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6c.7 0 1.3-.2 1.9-.5l1.4 2.4c-1 .5-2.1.8-3.3.8-4.3 0-7.8-3.5-7.8-7.8S7.7 4.2 12 4.2z" />
    </svg>
  ),
}

export function TechLogo({ name, className = '' }: TechLogoProps) {
  const Logo = LOGOS[name]
  if (!Logo) {
    return (
      <span className={`tech-logo-fallback ${className}`} aria-hidden="true">
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <span className={`tech-logo ${className}`} title={name} aria-label={name}>
      <Logo />
    </span>
  )
}
