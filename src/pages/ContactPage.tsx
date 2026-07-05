import { Link } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { ArrowIcon, ClockIcon, MailIcon, SparklesIcon } from '../components/icons'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { BOOK_CALL_PATH, EMAIL, NAME, REPLY_TIME, SERVICES, SITE_PROFILE_IMAGE, TAGLINE } from '../data/portfolio'

export function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container section-block contact-page-inner">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="heading-section max-w-3xl">
            Let&apos;s build <span className="text-gradient">something smart</span> together.
          </h1>
          <p className="contact-page-lead">
            Have an AI project, full stack app, or cloud deployment in mind? Send a message — you
            get an instant confirmation, and our team replies {REPLY_TIME}.
          </p>
        </Reveal>

        <div className="contact-page-grid">
          <Reveal as="aside" delay={80} className="contact-sidebar">
            <div className="contact-founder-card">
              <div className="contact-founder-header">
                <div className="profile-avatar-frame profile-avatar-frame--sm">
                  <div className="profile-avatar-inner">
                    <img
                      src={SITE_PROFILE_IMAGE}
                      alt={NAME}
                      className="profile-avatar-img"
                      width={116}
                      height={116}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <p className="contact-founder-label">Lead contact</p>
                  <h2 className="contact-founder-name">{NAME}</h2>
                </div>
              </div>
              <p className="contact-founder-tagline">{TAGLINE}</p>
            </div>

            <div className="panel-surface contact-panel">
              <h2 className="contact-panel-title">Direct contact</h2>
              <ul className="contact-panel-list">
                <li>
                  <a href={`mailto:${EMAIL}`} className="contact-panel-link">
                    <span className="contact-panel-icon">
                      <MailIcon />
                    </span>
                    <span>
                      <span className="contact-panel-link-label">Email</span>
                      <span className="contact-panel-link-value">{EMAIL}</span>
                    </span>
                  </a>
                </li>
                <li className="contact-panel-link contact-panel-link--static">
                  <span className="contact-panel-icon contact-panel-icon--teal">
                    <ClockIcon />
                  </span>
                  <span>
                    <span className="contact-panel-link-label">Response time</span>
                    <span className="contact-panel-link-value">{REPLY_TIME}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="panel-surface contact-panel contact-panel--accent">
              <h2 className="contact-panel-title">Book a discovery call</h2>
              <p className="contact-panel-text">
                Pick an open slot on our calendar — confirmation email includes your Meet or Zoom
                link.
              </p>
              <Link to={BOOK_CALL_PATH} className="btn-primary contact-panel-cta">
                Schedule a call
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="panel-surface contact-panel">
              <div className="contact-panel-heading">
                <span className="contact-panel-icon contact-panel-icon--sm">
                  <SparklesIcon className="h-3.5 w-3.5" />
                </span>
                <h2 className="contact-panel-title">What we can help with</h2>
              </div>
              <ul className="contact-services-list">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <p className="contact-service-title">{s.title}</p>
                    <p className="contact-service-desc">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140} className="contact-form-col">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
