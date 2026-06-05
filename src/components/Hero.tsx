import { useCallback, useEffect, useRef, useState } from 'react'
import { BOOK_CALL_PATH } from '../data/portfolio'
import { ArrowIcon } from './icons'

const TESTIMONIALS = [
  {
    text: 'MuteebLabs replaced our entire cattle records system with a platform our team actually uses. The buyer portal alone paid for the project.',
    author: '— Wagyu breeder, Mt. Pleasant',
  },
  {
    text: 'They caught 40+ bugs before our launch that our internal team missed. Felt like having a full QA department without the cost.',
    author: '— Sara M., SaaS founder, UK',
  },
  {
    text: 'The n8n automation they built saves us 12 hours a week on manual data entry. ROI was visible within the first month.',
    author: '— Ahmed K., Operations lead, UAE',
  },
] as const

const ROTATE_MS = 4000
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
        <span>Trusted by founders worldwide</span>
      </div>

      <div className="testimonial-quote-mark" aria-hidden="true">
        &ldquo;
      </div>

      <div className="testimonial-body" style={{ opacity: visible ? 1 : 0 }}>
        <p className="testimonial-text">{current.text}</p>
        <p className="testimonial-author">{current.author}</p>
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

      <hr className="testimonial-divider" />

      <div className="testimonial-pills">
        <span className="testimonial-pill">✓ 5+ Years Building</span>
        <span className="testimonial-pill">✓ Remote · Worldwide</span>
        <span className="testimonial-pill">✓ Accepting New Clients</span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="hero">
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

          <p className="hero-label">MuteebLabs · Software agency</p>

          <h1 className="hero-title">
            Custom Software for Cattle Operations, SaaS Teams &amp; AI-Powered Businesses
          </h1>

          <p className="hero-desc">
            We build livestock management platforms, QA testing frameworks, and AI automation
            tools — for businesses that need software built right.
          </p>

          <div className="hero-ctas">
            <a
              href={BOOK_CALL_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Free Discovery Call
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a href="#work" className="btn-ghost-dark">
              See Our Work
            </a>
          </div>

          <p className="hero-ships">
            <span className="hero-ships-dot" aria-hidden="true">
              <span className="hero-ships-dot-ping" />
              <span className="hero-ships-dot-core" />
            </span>
            <strong>Our team ships</strong>
            <span aria-hidden="true">·</span>
            <span>Livestock · QA · AI automation</span>
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">5+</span>
              <span className="hero-stat-label">Years Building</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">3</span>
              <span className="hero-stat-label">Industry Niches</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">10+</span>
              <span className="hero-stat-label">Builds Shipped</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <HeroTestimonial />
        </div>
      </div>
    </section>
  )
}
