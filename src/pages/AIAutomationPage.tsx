import { useEffect } from 'react'
import { SolutionPageLayout } from '../components/marketing/SolutionPageLayout'
import { SITE_IMAGES } from '../data/portfolio'

const PAGE = {
  badge: 'AI & Automation',
  headline: 'AI workflows that replace manual ops work',
  problem: 'Teams lose hours on inbox triage, data entry, and repeat coordination.',
  solution:
    'We ship production automations — Gmail routing, LLM classification, chatbots, and n8n pipelines tied to your real tools.',
  heroImage: SITE_IMAGES.aiAutomationHero,
  projectSlugs: ['ai-email-router', 'custom-chatbots'] as const,
  deliverables: [
    'Workflow design mapped to your current process — not generic templates',
    'n8n or API pipelines connecting email, CRM, docs, and databases',
    'LLM steps for classify, extract, draft, and route with human review where needed',
    'Handoff docs and monitoring so your team can run it after launch',
  ],
} as const

export function AIAutomationPage() {
  useEffect(() => {
    document.title = 'AI & Automation | MuteebLabs'
  }, [])

  return <SolutionPageLayout {...PAGE} />
}
