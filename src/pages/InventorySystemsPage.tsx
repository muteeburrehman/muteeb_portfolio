import { useEffect } from 'react'
import { SITE_IMAGES } from '../data/portfolio'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const FEATURES = [
  {
    title: 'Stock visibility',
    description:
      'Live counts, SKU tracking, and location-aware inventory so teams stop guessing from spreadsheets.',
  },
  {
    title: 'Orders & alerts',
    description:
      'Reorder thresholds, inbound/outbound workflows, and notifications when something needs attention.',
  },
  {
    title: 'Integrations',
    description:
      'Connect warehouses, stores, suppliers, or internal tools so inventory stays a single source of truth.',
  },
] as const

const AUDIENCE = [
  'Wholesale & distribution teams',
  'Multi-location operators',
  'Retail & ecommerce ops',
  'Field inventory managers',
  'Growing businesses outgrowing sheets',
] as const

export function InventorySystemsPage() {
  useEffect(() => {
    document.title = 'Inventory Systems | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="Inventory Systems"
        headline="Inventory software your ops team will actually use"
        subtext="Custom dashboards, stock tracking, and order workflows — built around how your operation works, not a generic template that gets abandoned."
        backgroundImage={SITE_IMAGES.inventoryHero}
        secondaryLabel="Talk inventory"
        secondaryTo="/contact"
      />
      <FeatureGrid label="What we build" items={[...FEATURES]} columns={3} />
      <WhoItsFor items={AUDIENCE} />
      <PageCta
        headline="Ready to replace spreadsheet inventory?"
        backgroundImage={SITE_IMAGES.inventoryHero}
      />
    </>
  )
}
