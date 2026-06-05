import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_CALL_PATH, MARBLESEMEN_CASE_STUDY } from '../data/portfolio'
import { ArrowIcon, ExternalLinkIcon } from '../components/icons'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'

const cs = MARBLESEMEN_CASE_STUDY

const META_TAGS = [
  ...cs.industry.split(' · '),
  cs.location,
]

export function MarbleSemenCaseStudy() {
  useEffect(() => {
    document.title = `Case Study: ${cs.title} | MuteebLabs`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute(
        'content',
        'How MuteebLabs built MarbleSemen.com — a Wagyu cattle genetics e-commerce platform for a US breeder operation.',
      )
    }
  }, [])

  return (
    <article className="min-h-screen">
      <header className="case-study-hero dot-grid-dark">
        <div className="container case-study-content">
          <Link
            to="/#work"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#9ca3af] transition-colors hover:text-white"
          >
            <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
            Back to work
          </Link>

          <SectionLabel className="!text-[#3b82f6] mt-6">Case study</SectionLabel>

          <ul className="case-study-meta-tags" aria-label="Project categories">
            {META_TAGS.map((tag) => (
              <li key={tag} className="case-study-meta-tag">
                {tag}
              </li>
            ))}
          </ul>

          <h1>{cs.title}</h1>
          <p className="case-study-hero-sub">{cs.subtitle}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {cs.stack.map((tag) => (
              <li key={tag} className="pill-tech">
                {tag}
              </li>
            ))}
          </ul>

          <dl className="case-study-meta-card">
            <div>
              <dt>Client</dt>
              <dd>{cs.client}</dd>
            </div>
            <div>
              <dt>Our role</dt>
              <dd>{cs.role}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{cs.timeline}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="section-white case-study-section">
        <div className="container case-study-content">
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <img
                src={cs.image}
                alt={cs.imageAlt}
                className="w-full object-cover object-top"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-off case-study-section">
        <div className="container case-study-content space-y-14">
          <Reveal>
            <h2>Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{cs.overview}</p>
          </Reveal>

          <Reveal delay={60}>
            <h2>The challenge</h2>
            <ul className="mt-5 space-y-3">
              {cs.challenge.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-muted before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h2>Our approach</h2>
            <ul className="mt-5 space-y-3">
              {cs.approach.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-muted before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <h2>What we built</h2>
            <ul className="mt-5 space-y-3">
              {cs.delivered.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-white px-4 py-3.5 text-sm leading-relaxed text-text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2>Results</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {cs.results.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-4 text-sm leading-relaxed text-text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-white case-study-section pb-20">
        <div className="container case-study-content">
          <Reveal>
            <div className="rounded-xl border border-border bg-bg-off p-8 sm:p-10">
              <h2 className="heading-section text-[1.5rem]">See it live</h2>
              <p className="mt-3 max-w-lg text-muted">
                The platform is in production for a real US Wagyu genetics business — not a concept
                mockup.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-light"
                >
                  Visit {cs.title}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
                <a
                  href={BOOK_CALL_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-border bg-white px-5 text-sm font-medium text-text-primary transition-colors hover:border-accent"
                >
                  Book a discovery call
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-10 text-center">
            <Link
              to="/livestock-software"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Explore our livestock software services →
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
