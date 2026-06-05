import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, HERO_TRUST_ITEMS, HOME_METRICS } from '../data/portfolio'
import { ArrowIcon } from './icons'

const TESTIMONIALS = [
  {
    text: 'MuteebLabs replaced our entire cattle records system with a platform our team actually uses. The buyer portal alone paid for the project.',
    name: 'Wagyu breeder',
    role: 'Mt. Pleasant, US',
    tags: ['Livestock Software', 'Buyer portal'],
  },
  {
    text: 'They caught 40+ bugs before our launch that our internal team missed. Felt like having a full QA department without the cost.',
    name: 'Sara M.',
    role: 'SaaS founder, UK',
    tags: ['QA Testing', 'SaaS'],
  },
  {
    text: 'The n8n automation they built saves us 12 hours a week on manual data entry. ROI was visible within the first month.',
    name: 'Ahmed K.',
    role: 'Operations lead, UAE',
    tags: ['AI Automation', 'n8n'],
  },
] as const

const ROTATE_MS = 5000
const FADE_MS = 400

function HeroTestimonial() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (next: number) => {
      if (next === index) return
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current)
      setVisible(false)
      fadeTimeout.current = setTimeout(() => {
        setIndex(next)
        setVisible(true)
      }, FADE_MS)
    },
    [index],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((index + 1) % TESTIMONIALS.length)
    }, ROTATE_MS)
    return () => clearInterval(interval)
  }, [index, goTo])

  useEffect(() => {
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current)
    }
  }, [])

  const current = TESTIMONIALS[index]

  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        <span aria-hidden="true">★★★★★</span>
        <span>Client feedback</span>
      </div>

      <div className="testimonial-quote-mark" aria-hidden="true">
        &ldquo;
      </div>

      <div className="testimonial-body" style={{ opacity: visible ? 1 : 0 }}>
        <p className="testimonial-text">{current.text}</p>
        <p className="testimonial-author">
          <strong className="text-white/80">{current.name}</strong>
          <span className="text-white/30"> · </span>
          {current.role}
        </p>
        <div className="testimonial-tags">
          {current.tags.map((tag) => (
            <span key={tag} className="testimonial-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="testimonial-dots" role="tablist" aria-label="Testimonials">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial ${i + 1}`}
            className={`testimonial-dot${i === index ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="hero">
      {/* Ambient floating orbs */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badges">
            <span className="hero-badge hero-badge--live">
              <span className="hero-badge-dot" aria-hidden="true">
                <span className="hero-badge-dot-ping" />
                <span className="hero-badge-dot-core" />
              </span>
              Accepting new clients
            </span>
            <span className="hero-badge hero-badge--remote">Remote · Worldwide</span>
          </div>

          <h1 className="hero-title">
            Software for{' '}
            <span className="hero-title-accent">Cattle Operations</span>,{' '}
            <span className="hero-title-accent">SaaS Teams</span> &amp;{' '}
            <span className="hero-title-accent">AI-Powered Businesses</span>
          </h1>

          <p className="hero-desc">
            We build livestock platforms, QA frameworks, and AI automation — so you ship faster,
            catch issues before launch, and replace spreadsheet chaos with software that scales.
          </p>

          <div className="hero-ctas">
            <Link to={BOOK_CALL_PATH} className="btn-primary btn-primary--glow">
              Book a Free Discovery Call
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <a href="#work" className="btn-ghost-dark">
              See Our Work
            </a>
          </div>

          <ul className="hero-trust-row">
            {HERO_TRUST_ITEMS.map((item) => (
              <li key={item.label} className="hero-trust-item">
                <span className="hero-trust-check" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <span className="hero-trust-detail">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="hero-stats">
            {HOME_METRICS.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="hero-stat-number">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <HeroTestimonial />
        </div>
      </div>
    </section>
  )
}
