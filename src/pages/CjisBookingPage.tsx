import { useEffect } from 'react'
import { SITE_IMAGES } from '../data/portfolio'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const FEATURES = [
  {
    title: 'Secure booking flows',
    description:
      'Appointment and visit scheduling with role-based access, audit trails, and clear staff workflows.',
  },
  {
    title: 'Compliance-minded design',
    description:
      'Built with CJIS-oriented practices in mind — least privilege, logging, and data handling that stands up to scrutiny.',
  },
  {
    title: 'Intake & records',
    description:
      'Structured forms, status tracking, and searchable records so paper and fragile tools stop being the bottleneck.',
  },
] as const

const AUDIENCE = [
  'Public safety & justice agencies',
  'Facilities with secure visit scheduling',
  'Government contractors',
  'Teams needing audit-friendly booking',
  'Operations replacing paper intake',
] as const

export function CjisBookingPage() {
  useEffect(() => {
    document.title = 'CJIS & Booking Software | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="CJIS & Booking Software"
        headline="Compliance-minded booking software for secure operations"
        subtext="Scheduling, intake, and visitor workflows designed with security and auditability in mind — so sensitive environments get software that fits the real constraints."
        backgroundImage={SITE_IMAGES.cjisBookingHero}
        secondaryLabel="Discuss requirements"
        secondaryTo="/contact"
      />
      <FeatureGrid label="What we build" items={[...FEATURES]} columns={3} />
      <WhoItsFor items={AUDIENCE} />
      <PageCta
        headline="Need booking software built for compliance constraints?"
        backgroundImage={SITE_IMAGES.cjisBookingHero}
      />
    </>
  )
}
