import { useEffect } from 'react'
import { SITE_IMAGES } from '../data/portfolio'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const FEATURES = [
  {
    title: 'Live contest engines',
    description:
      'Entries, scoring rules, leaderboards, and season calendars that hold up under race-day traffic.',
  },
  {
    title: 'Prize pools & payments',
    description:
      'Stripe-ready payout flows, prize accounting, and admin controls so money movement stays auditable.',
  },
  {
    title: 'Operator dashboards',
    description:
      'Admin tooling for contests, users, disputes, and reporting — without spreadsheet handoffs.',
  },
] as const

const AUDIENCE = [
  'Motorsport contest operators',
  'Prediction & fantasy platforms',
  'Race-series organizers',
  'Skill-based gaming products',
  'Seasonal competition apps',
] as const

export function ContestPlatformsPage() {
  useEffect(() => {
    document.title = 'Contest & Racing Platforms | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="Contest Platforms"
        headline="Motorsport contest software that ships for race season"
        subtext="From PitPrize-style prediction apps to custom contest engines — we build scoring, entries, leaderboards, and payments as production platforms, not prototypes."
        backgroundImage={SITE_IMAGES.racingContestsHero}
        secondaryLabel="See PitPrize"
        secondaryTo="/#work"
      />
      <FeatureGrid label="What we build" items={[...FEATURES]} columns={3} />
      <WhoItsFor items={AUDIENCE} />
      <PageCta
        headline="Planning a contest platform for the next season?"
        backgroundImage={SITE_IMAGES.racingContestsHero}
      />
    </>
  )
}
