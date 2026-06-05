import { useEffect } from 'react'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { WhoItsFor } from '../components/marketing/WhoItsFor'

const SERVICES = [
  {
    title: 'Manual & Exploratory Testing',
    description:
      'We act as real users. Every release gets tested across browsers, devices, and edge cases before it ships.',
  },
  {
    title: 'Regression Test Suites',
    description:
      'We build and maintain structured regression suites so your team can ship confidently after every sprint.',
  },
  {
    title: 'Bug Reporting & Triage',
    description:
      'Detailed, reproducible bug reports with screenshots, steps, and severity ratings — ready for your dev team to action immediately.',
  },
  {
    title: 'Release Validation',
    description:
      'Pre-release sign-off process that checks every critical path in your app before you hit deploy.',
  },
  {
    title: 'API Testing',
    description:
      'Postman-based API test collections covering your endpoints, auth flows, and data contracts.',
  },
  {
    title: 'QA Documentation',
    description:
      'Test plans, test cases, and QA wikis that your team can maintain and build on.',
  },
] as const

export function QATestingPage() {
  useEffect(() => {
    document.title = 'QA Testing Services | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="QA Testing Services"
        headline="Your Outsourced QA Team — Without the Overhead"
        subtext="Manual testing, regression suites, bug reporting, and release validation for SaaS teams that ship fast and can't afford to break things in production."
      />
      <FeatureGrid label="Services" items={[...SERVICES]} />
      <WhoItsFor text="We work with: Early-stage SaaS startups · Product teams without in-house QA · Agencies launching client projects · Teams preparing for major releases" />
      <PageCta headline="No QA team? We're yours." />
    </>
  )
}
