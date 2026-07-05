import { useEffect } from 'react'
import { SITE_IMAGES } from '../data/portfolio'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const FEATURES = [
  {
    title: 'Citizen & client portals',
    description:
      'Self-service forms, status tracking, and document uploads — less phone tag for your staff.',
  },
  {
    title: 'Workflow & process fixes',
    description:
      'Replace spreadsheet handoffs and legacy tools with lightweight software your team actually uses.',
  },
  {
    title: 'Reporting & dashboards',
    description:
      'Operational visibility for managers — caseloads, SLAs, and exports without manual data pulls.',
  },
] as const

const AUDIENCE = [
  'City & county departments',
  'Municipal utilities',
  'Local government contractors',
  'Regional agency teams',
  'Public-sector IT leads',
] as const

export function AgencySolutionsPage() {
  useEffect(() => {
    document.title = 'Local Agency Software | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="Local Agency Solutions"
        headline="Software that fixes broken agency workflows"
        subtext="Client portals, process automation, and ops tools for local government teams — built to replace spreadsheets and legacy handoffs without a multi-year procurement cycle."
        backgroundImage={SITE_IMAGES.localGovernmentHero}
        secondaryLabel="See our work"
        secondaryTo="/#work"
      />
      <FeatureGrid label="What we build" items={[...FEATURES]} columns={3} />
      <WhoItsFor items={AUDIENCE} />
      <PageCta
        headline="Need a fix for a local agency process?"
        backgroundImage={SITE_IMAGES.localGovernmentHero}
      />
    </>
  )
}
