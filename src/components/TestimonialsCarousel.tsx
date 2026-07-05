import { useState } from 'react'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

const TESTIMONIALS = [
  {
    quote: 'MuteebLabs replaced our legacy cattle records system with a platform our team actually uses in the field. The custom buyer portal and EPD genetics tracking saved us hundreds of manual coordination hours.',
    author: 'Wagyu Breeder & Owner',
    company: 'Marble Semen',
    location: 'Mt. Pleasant, US',
    initials: 'MS',
    industry: 'Livestock / Genetics',
  },
  {
    quote: 'They caught over 40 critical bugs before our SaaS release that our internal engineers completely missed. It felt like having a full, senior QA department standing by without the immense overhead.',
    author: 'Sara M.',
    company: 'SaaS Platform Founder',
    location: 'London, UK',
    initials: 'SM',
    industry: 'SaaS Development',
  },
  {
    quote: 'The n8n automation pipelines they deployed classify our incoming customer support tickets and draft replies using LLMs. We saved 12+ manual hours in the very first week of operations.',
    author: 'Ahmed K.',
    company: 'Lead Operations Director',
    location: 'Dubai, UAE',
    initials: 'AK',
    industry: 'AI Operations',
  },
] as const

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
  }

  const current = TESTIMONIALS[index]

  return (
    <section className="section-block bg-[#02050d] border-t border-slate-900">
      <div className="glow-radial" style={{ top: '10%', right: '-10%' }} aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel className="justify-center">Client Endorsements</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              What our <span className="text-gradient">partners say</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="testimonial-carousel max-w-4xl mx-auto">
            <span className="quote-icon" aria-hidden="true">&ldquo;</span>
            
            <div className="min-h-[160px] flex items-center">
              <p className="carousel-quote-text">
                {current.quote}
              </p>
            </div>

            <div className="carousel-client-info">
              <div className="client-author-meta">
                <div className="client-placeholder-pic" aria-hidden="true">
                  {current.initials}
                </div>
                <div className="client-name-details">
                  <span className="client-name">{current.author}</span>
                  <span className="client-role-comp">{current.company} · {current.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-xs bg-slate-900 border border-slate-800 text-teal-400 font-mono uppercase tracking-wider px-3 py-1 rounded-md">
                  {current.industry}
                </span>

                <div className="carousel-controls">
                  <button
                    type="button"
                    className="carousel-btn"
                    aria-label="Previous testimonial"
                    onClick={handlePrev}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="carousel-btn"
                    aria-label="Next testimonial"
                    onClick={handleNext}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
