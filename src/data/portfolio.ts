export const EMAIL = 'business@muteeblabs.uk'
export const NAME = 'Muteeb Ur Rehman'
export const ROLE = 'Full Stack Developer & AI Engineer'
export const TECH_STACK =
  'Python • React • PostgreSQL • LangChain • LLMs • OpenAI • Gemini • Claude • Vector DBs • Qdrant • n8n • Voice Agents • AWS'

/** Add your profile URLs here — links only appear when url is set */
export const SOCIAL_LINKS = [
  { label: 'GitHub', url: '', icon: 'github' as const },
  { label: 'LinkedIn', url: '', icon: 'linkedin' as const },
] as const

export const FOOTER_FOCUS = ['Python', 'AI / LLMs', 'React', 'AWS', 'LangChain'] as const

export const SKILLS = [
  'Python',
  'React',
  'PostgreSQL',
  'LangChain',
  'LLMs',
  'OpenAI',
  'Gemini',
  'Claude',
  'Qdrant',
  'n8n',
  'Voice Agents',
  'AWS',
  'EC2',
  'Lambda',
] as const

export const MARQUEE_ITEMS = [
  'PYTHON',
  'REACT',
  'POSTGRESQL',
  'LANGCHAIN',
  'OPENAI',
  'GEMINI',
  'CLAUDE',
  'QDRANT',
  'N8N',
  'VOICE AGENTS',
  'VECTOR DBs',
  'AI AGENTS',
  'AWS',
  'EC2',
  'LAMBDA',
  'ELASTICSEARCH',
] as const

export const PROJECTS = [
  {
    slug: 'pitprize',
    name: 'PitPrize',
    category: 'Full Stack · Live',
    tagline: 'Skill-based motorsport prediction platform',
    description:
      'A live competition platform where users build teams, predict race outcomes and compete for real cash prizes. Built end-to-end — scoring engine, prize pools, contest entries, leaderboards and admin tooling.',
    image: '/projects/pitprize.png',
    imageAlt: 'PitPrize racing prediction platform homepage',
    tags: ['React', 'Python', 'PostgreSQL', 'Stripe', 'Real-time'],
    url: 'https://pitprize.com',
    role: 'Full Stack Engineer',
    status: 'Live · 2026 season',
    accent: 'amber' as const,
  },
  {
    slug: 'marblesemen',
    name: 'Marble Semen',
    category: 'E-commerce · Live',
    tagline: 'Wagyu genetics storefront & catalog',
    description:
      'A specialised e-commerce platform for genetically tested Wagyu cattle semen — product catalog, embryos, custom "Bull Battery" tool, shopping cart and content-rich storefront for a niche US client.',
    image: '/projects/marblesemen.png',
    imageAlt: 'Marble Semen Wagyu e-commerce homepage',
    tags: ['Full Stack', 'Catalog', 'Cart', 'Payments', 'CMS'],
    url: 'https://marblesemen.com',
    role: 'Full Stack Engineer',
    status: 'Live · in production',
    accent: 'sky' as const,
  },
  {
    slug: 'ai-email-router',
    name: 'AI Email Automation Suite',
    category: 'AI Automation · Production',
    tagline: 'Intelligent inbox routing & auto-reply',
    description:
      'A custom n8n + OpenAI pipeline that listens to Gmail, extracts intent with an LLM, classifies messages (services / consultations / payments / other) and drafts contextual replies — turning a busy inbox into a self-managing assistant.',
    image: '/projects/n8n-workflow.png',
    imageAlt: 'n8n workflow connecting Gmail with OpenAI classification and auto-reply branches',
    tags: ['n8n', 'OpenAI', 'Gmail API', 'LLM Classifier', 'Auto-reply'],
    url: '',
    role: 'AI Engineer',
    status: 'Production',
    accent: 'purple' as const,
  },
  {
    slug: 'custom-chatbots',
    name: 'Custom AI Chatbots',
    category: 'AI Engineering · Multiple clients',
    tagline: 'Domain-trained conversational agents',
    description:
      'Bespoke chatbots for client websites and internal tools — RAG knowledge bases, tool use, voice interfaces and tight integrations with each client\'s data and stack. From support bots to lead-qualification agents.',
    image: '',
    imageAlt: '',
    tags: ['LangChain', 'RAG', 'OpenAI', 'Claude', 'Voice'],
    url: '',
    role: 'AI Engineer',
    status: 'Multiple deployments',
    accent: 'emerald' as const,
  },
] as const

export const CAPABILITIES = [
  {
    num: '01',
    title: 'AI Agents & LLM Pipelines',
    description:
      'Production agents with LangChain, OpenAI, Gemini, Claude, and custom models. RAG over vector stores, tool use, and orchestration with n8n.',
    tags: ['LangChain', 'OpenAI', 'Claude', 'Gemini'],
  },
  {
    num: '02',
    title: 'Voice Agents & Conversational AI',
    description:
      'End-to-end voice experiences — speech-to-text, reasoning, and natural responses integrated into real products.',
    tags: ['Voice Agents', 'LLMs', 'Python'],
  },
  {
    num: '03',
    title: 'Vector Search & RAG',
    description:
      'Semantic search and retrieval with Qdrant and other vector databases, embeddings, and scalable knowledge bases.',
    tags: ['Qdrant', 'Vector DBs', 'RAG'],
  },
  {
    num: '04',
    title: 'Full Stack Web Apps',
    description:
      'React frontends backed by Python APIs and PostgreSQL — clean UX, solid data models, and maintainable architecture.',
    tags: ['React', 'PostgreSQL', 'Python'],
  },
  {
    num: '05',
    title: 'Cloud & AWS Infrastructure',
    description:
      'Deploy and scale on AWS — EC2, Lambda, Elasticsearch, and related services for reliable production workloads.',
    tags: ['AWS', 'EC2', 'Lambda', 'Elasticsearch'],
  },
  {
    num: '06',
    title: 'Automation & Integrations',
    description:
      'Workflow automation with n8n — connecting APIs, models, and databases into repeatable pipelines.',
    tags: ['n8n', 'APIs', 'Integrations'],
  },
] as const

export const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    description:
      'Understand the problem, the users and the constraints. Audit any existing systems and agree on what "done" looks like.',
  },
  {
    step: '02',
    title: 'Architect',
    description:
      'Design clean data flow, pick the right stack and lay out the AI/automation pieces — so the build stays simple and the system stays maintainable.',
  },
  {
    step: '03',
    title: 'Build & ship',
    description:
      'Ship in tight loops with frequent demos. Production-grade code, real test data and observability from day one.',
  },
  {
    step: '04',
    title: 'Iterate',
    description:
      'Support, monitor, optimise. Tighten prompts, prune costs, add features. Stay involved past launch.',
  },
] as const

export const SERVICES = [
  {
    title: 'AI & LLM Development',
    description: 'Agents, RAG, fine-tuning workflows, and model integrations.',
  },
  {
    title: 'Full Stack Applications',
    description: 'React + Python backends with PostgreSQL and clean APIs.',
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS deployments — EC2, Lambda, Elasticsearch, and scaling.',
  },
] as const

export const CONTACT_TOPICS = [
  'AI / LLM Project',
  'Full Stack Development',
  'Freelance / Contract',
  'Full-time Opportunity',
  'Consultation',
  'Other',
] as const

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/#work', label: 'Work' },
  { to: '/#process', label: 'Process' },
  { to: '/#about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

/** Shown on site + kept in sync with MAIL_REPLY_WINDOW in .env */
export const REPLY_TIME = 'usually within one day'

export const STATS = [
  { value: '10+', label: 'Builds shipped' },
  { value: '3+', label: 'Years building' },
  { value: '1 day', label: 'Typical reply' },
] as const

export const HERO_ACCENTS = [
  'intelligent',
  'production',
  'AI-native',
  'reliable',
] as const
