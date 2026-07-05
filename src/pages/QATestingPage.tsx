import { useEffect } from 'react'
import { SolutionPageLayout } from '../components/marketing/SolutionPageLayout'
import { SITE_IMAGES } from '../data/portfolio'

const PAGE = {
  badge: 'Software Testing',
  headline: 'QA before your users find the bugs',
  problem: 'Shipping fast without a QA layer means production surprises and lost trust.',
  solution:
    'Manual exploratory testing, regression sweeps, and API checks — scoped to your release, not a full-time hire.',
  heroImage: SITE_IMAGES.qaTestingHero,
  projectSlugs: ['pitprize', 'marblesemen'] as const,
  deliverables: [
    'Exploratory passes on critical user flows before each release',
    'Regression checklists you can re-run sprint after sprint',
    'API and auth flow validation with reproducible bug reports',
    'Sign-off summary your dev team can act on immediately',
  ],
  quote: {
    text: 'They caught over 40 critical bugs before our SaaS release that our internal engineers completely missed.',
    author: 'Sara M.',
    role: 'SaaS founder, UK',
  },
} as const

export function QATestingPage() {
  useEffect(() => {
    document.title = 'Software Testing Services | MuteebLabs'
  }, [])

  return <SolutionPageLayout {...PAGE} />
}
