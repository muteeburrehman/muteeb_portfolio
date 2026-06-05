import { useEffect } from 'react'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { PageCta } from '../components/marketing/PageCta'
import { PageHero } from '../components/marketing/PageHero'
import { SectionLabel } from '../components/ui/SectionLabel'

const SERVICES = [
  {
    title: 'AI Chatbots & Assistants',
    description:
      'Custom LLM-powered assistants trained on your data. Built with LangChain, OpenAI, Claude, or Gemini — deployed on your stack.',
  },
  {
    title: 'n8n Workflow Automation',
    description:
      'We automate your repetitive business processes using n8n — connecting your CRM, email, databases, and APIs into zero-touch workflows.',
  },
  {
    title: 'RAG Pipelines',
    description:
      'Retrieval-Augmented Generation systems that let your team query internal documents, knowledge bases, and data with natural language.',
  },
  {
    title: 'Voice Agents',
    description:
      'AI voice agents for inbound/outbound call handling, appointment booking, and customer support — built on modern voice AI stacks.',
  },
  {
    title: 'Document Processing',
    description:
      'Intelligent document pipelines that extract, classify, and route data from PDFs, invoices, contracts, and forms automatically.',
  },
  {
    title: 'Custom AI Tools',
    description:
      'From internal tools to customer-facing AI features — we scope, build, and ship custom AI software integrated into your existing systems.',
  },
] as const

export function AIAutomationPage() {
  useEffect(() => {
    document.title = 'AI & Automation | MuteebLabs'
  }, [])

  return (
    <>
      <PageHero
        badge="AI & Automation"
        headline="AI Agents & Workflow Automation — Built for Your Business"
        subtext="We build LLM-powered tools, n8n workflow automations, RAG pipelines, and custom AI agents that replace manual processes and give your team leverage."
      />
      <FeatureGrid label="Services" items={[...SERVICES]} />
      <section className="section-off section-block">
        <div className="container text-center">
          <SectionLabel>Tech stack</SectionLabel>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            <span className="font-semibold text-text-primary">We build with: </span>
            LangChain · OpenAI · Claude · Gemini · Qdrant · n8n · AWS Lambda · Python · FastAPI ·
            Vector DBs
          </p>
        </div>
      </section>
      <PageCta headline="Want to automate something in your business?" />
    </>
  )
}
