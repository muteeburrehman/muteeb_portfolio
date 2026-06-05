import { useEffect } from 'react'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { LivestockCaseStudyBlock } from '../components/marketing/LivestockCaseStudyBlock'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const FEATURES = [
  {
    title: 'Herd Registry & Genetics Tracking',
    description:
      'Track EPD scores, bloodlines, and performance data across your entire herd. Built for Wagyu, Angus, and commercial operations.',
  },
  {
    title: 'Buyer Portal & Sale Management',
    description:
      'Custom-branded buyer-facing portals with inventory listings, semen catalogs, and direct inquiry flows. No more email chains.',
  },
  {
    title: 'Dashboard & Reporting',
    description:
      'Real-time dashboards for herd health, sale history, and genetics reports. Export to PDF or share with your vet and farm manager.',
  },
] as const

export function LivestockSoftwarePage() {
  useEffect(() => {
    document.title = 'Livestock & Cattle Software | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="Livestock & Cattle Software"
        headline="Herd Management Software Built for Serious Cattle Operations"
        subtext="From genetics tracking to buyer portals — we build the tools that replace spreadsheets for Wagyu breeders, stud farms, and livestock operations worldwide."
      />
      <LivestockCaseStudyBlock />
      <FeatureGrid label="Features" items={[...FEATURES]} />
      <WhoItsFor text="We build for: Wagyu breeders · Stud farms · Commercial cattle operations · Livestock sale yards · Genetics labs" />
      <PageCta headline="Ready to replace your spreadsheets?" />
    </>
  )
}
