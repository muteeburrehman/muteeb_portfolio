import { useEffect } from 'react'
import { FEATURED_CASE_STUDY, SITE_IMAGES } from '../data/portfolio'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { LivestockCaseStudyBlock } from '../components/marketing/LivestockCaseStudyBlock'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const FEATURES = [
  {
    title: 'Genetics & herd records',
    description:
      'EPD scores, bloodlines, and inventory in one place — not scattered spreadsheets.',
  },
  {
    title: 'Buyer portals & catalogs',
    description:
      'Semen listings, embryos, and inquiry flows your buyers can trust and use on mobile.',
  },
  {
    title: 'Sales & reporting',
    description:
      'Dashboards and exports for sale history, genetics reports, and day-to-day ops.',
  },
] as const

const AUDIENCE = [
  'Wagyu breeders',
  'Stud farms',
  'Commercial cattle ops',
  'Livestock sale yards',
  'Genetics labs',
] as const

export function LivestockSoftwarePage() {
  useEffect(() => {
    document.title = 'Livestock & Cattle Software | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="Livestock & Cattle Software"
        headline="Software that replaces spreadsheets for cattle operations"
        subtext="Genetics storefronts, buyer portals, and herd tools — built for Wagyu breeders and ag teams selling semen, embryos, and breeding stock."
        backgroundImage={SITE_IMAGES.livestockHero}
        secondaryLabel="See Marble Semen case study"
        secondaryTo={FEATURED_CASE_STUDY.to}
      />
      <LivestockCaseStudyBlock />
      <FeatureGrid label="What we build" items={[...FEATURES]} columns={3} />
      <WhoItsFor items={AUDIENCE} />
      <PageCta
        headline="Ready to move off spreadsheets?"
        backgroundImage={SITE_IMAGES.agricultureBg}
      />
    </>
  )
}
