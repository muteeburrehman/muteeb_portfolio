import { Link } from 'react-router-dom'
import {
  BOOK_CALL_PATH,
  NAME,
  PROFILE_QUICK_FACTS,
  SITE_PROFILE_IMAGE,
  TAGLINE,
  TEAM_APPROACH,
  TEAM_INTRO,
} from '../data/portfolio'
import { ArrowIcon } from './icons'
import { Reveal } from './ui/Reveal'
import { SectionLabel } from './ui/SectionLabel'

export function About() {
  return (
    <section id="about" className="about-section section-block section-block--compact bg-[#030712] border-t border-slate-900">
      <div className="container relative z-10">
        <div className="about-grid">
          <Reveal className="about-grid__intro">
            <SectionLabel>About MuteebLabs</SectionLabel>
            <h2 className="heading-section">
              A software company that <span className="text-gradient">owns the build</span>
            </h2>
            <p className="about-lead">{TEAM_INTRO}</p>
            <p className="about-body">{TEAM_APPROACH}</p>
            <Link to="#values" className="about-values-link">
              How we work
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-avatar-frame">
                  <div className="profile-avatar-inner">
                    <img
                      src={SITE_PROFILE_IMAGE}
                      alt={NAME}
                      className="profile-avatar-img"
                      width={260}
                      height={260}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="profile-card-intro">
                  <h3 className="profile-card-name">{NAME}</h3>
                  <p className="profile-card-role">Lead contact · Founder</p>
                  <p className="profile-card-tagline max-w-none">{TAGLINE}</p>
                </div>
              </div>

              <div className="profile-meta-info">
                {PROFILE_QUICK_FACTS.map((row) => (
                  <div key={row.label} className="profile-meta-row">
                    <span className="profile-meta-lbl">{row.label}</span>
                    <span className="profile-meta-val">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="about-compact__actions">
                <Link to={BOOK_CALL_PATH} className="btn-compact btn-compact--primary">
                  Book a call
                </Link>
                <Link to="/contact" className="btn-compact btn-compact--ghost">
                  Send a message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
