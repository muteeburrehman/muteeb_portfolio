export const EMAIL = 'business@muteeblabs.uk'
/** Built-in scheduling funnel (custom slots + CRM). */
export const BOOK_CALL_PATH = '/book'
/** @deprecated Use BOOK_CALL_PATH — kept for gradual migration */
export const CALENDLY_URL = BOOK_CALL_PATH
export const SITE_BRAND = 'MuteebLabs'
export const SITE_LOGO = '/logo.png'
export const NAME = 'Muteeb Ur Rehman'
export const ROLE = 'Custom Software Development & Testing Agency'
export const LINKEDIN_URL = 'https://pk.linkedin.com/in/muteeb-ur-rehman-091a2628a'
export const TECH_STACK =
  'Python • React • PostgreSQL • Software Testing • LangChain • LLMs • OpenAI • Gemini • Claude • Vector DBs • Qdrant • n8n • Voice Agents • AWS'

/** Add your profile URLs here — links only appear when url is set */
export const SOCIAL_LINKS = [
  { label: 'GitHub', url: '', icon: 'github' as const },
  { label: 'LinkedIn', url: LINKEDIN_URL, icon: 'linkedin' as const },
] as const

export const FOOTER_FOCUS = ['Livestock', 'Software Testing', 'AI Automation', 'React', 'AWS'] as const

export const SKILLS = [
  'Python',
  'React',
  'PostgreSQL',
  'Software Testing',
  'Manual QA',
  'API Testing',
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
  'SOFTWARE TESTING',
  'MANUAL QA',
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
    tags: ['React', 'Django', 'PostgreSQL', 'AWS', 'Authorize.net'],
    url: 'https://marblesemen.com',
    caseStudyTo: '/case-study/marblesemen',
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
    title: 'Software Testing & QA',
    description:
      'Manual exploratory testing, regression suites, API validation, and release sign-off — so you ship with confidence, not surprises.',
    tags: ['Manual QA', 'Regression', 'API Testing', 'Release validation'],
  },
  {
    num: '05',
    title: 'Full Stack Web Apps',
    description:
      'React frontends backed by Python APIs and PostgreSQL — clean UX, solid data models, and maintainable architecture.',
    tags: ['React', 'PostgreSQL', 'Python'],
  },
  {
    num: '06',
    title: 'Cloud & AWS Infrastructure',
    description:
      'Deploy and scale on AWS — EC2, Lambda, Elasticsearch, and related services for reliable production workloads.',
    tags: ['AWS', 'EC2', 'Lambda', 'Elasticsearch'],
  },
  {
    num: '07',
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
    title: 'Software Testing',
    description: 'Manual QA, regression suites, API testing, and pre-release validation.',
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS deployments — EC2, Lambda, Elasticsearch, and scaling.',
  },
] as const

export const CONTACT_TOPICS = [
  'AI / LLM Project',
  'Full Stack Development',
  'Software Testing / QA',
  'Freelance / Contract',
  'Full-time Opportunity',
  'Consultation',
  'Other',
] as const

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/livestock-software', label: 'Livestock Software' },
  { to: '/qa-testing', label: 'Software Testing' },
  { to: '/ai-automation', label: 'AI & Automation' },
  { to: '/#work', label: 'Work' },
  { to: '/#process', label: 'Process' },
  { to: '/#about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export const TRUST_BAR_ITEMS = [
  '3 Years Building Software',
  'Livestock · Testing · AI',
  'React · Django · FastAPI · AWS',
  'Software Testing Services',
] as const

export const HOME_METRICS = [
  { value: '3', label: 'Years experience' },
  { value: '3', label: 'Industry verticals' },
  { value: '10+', label: 'Production builds' },
  { value: '1 day', label: 'Typical reply' },
] as const

export const HERO_TRUST_ITEMS = [
  { label: 'Domain expertise', detail: 'Livestock, testing & AI' },
  { label: 'End-to-end delivery', detail: 'Build, test, and ship' },
  { label: 'Quality & reliability', detail: 'Tested before production' },
] as const

export const HOME_VALUE_PROPS = [
  { title: 'Agile approach', description: 'Frequent demos, tight feedback loops' },
  { title: 'Secure & scalable', description: 'Production-minded AWS architecture' },
  { title: 'Transparent comms', description: 'Clear scope, timeline, and updates' },
  { title: 'Dedicated support', description: 'We stay involved after launch' },
] as const

export const AGENCY_SERVICES = [
  {
    title: 'Livestock Software',
    description:
      'Herd management, genetics dashboards, and buyer portals — so cattle operations run on software, not spreadsheets.',
    to: '/livestock-software',
    icon: 'database' as const,
    accent: 'sky' as const,
  },
  {
    title: 'Software Testing',
    description:
      'Manual QA, regression suites, and release validation — catch bugs before your users do, without hiring a full in-house team.',
    to: '/qa-testing',
    icon: 'check' as const,
    accent: 'purple' as const,
  },
  {
    title: 'AI & Automation',
    description:
      'Chatbots, n8n workflows, and LLM pipelines — automate repetitive work and ship AI features that actually work.',
    to: '/ai-automation',
    icon: 'zap' as const,
    accent: 'emerald' as const,
  },
  {
    title: 'SaaS Development',
    description:
      'React + Python full-stack products with clean APIs and PostgreSQL — from MVP to production for growing teams.',
    to: '/#work',
    icon: 'code' as const,
    accent: 'amber' as const,
  },
] as const

export const FEATURED_CASE_STUDY = {
  slug: 'marblesemen',
  name: 'MarbleSemen.com',
  description:
    'Full-stack cattle genetics and sale management platform — replacing spreadsheets with a custom buyer portal and EPD tracking dashboard for a real Wagyu operation.',
  tags: ['React', 'Django', 'PostgreSQL', 'AWS', 'Authorize.net'],
  to: '/case-study/marblesemen',
} as const

export const MARBLESEMEN_CASE_STUDY = {
  slug: 'marblesemen',
  title: 'MarbleSemen.com',
  subtitle: 'Fullblood Wagyu genetics platform for a US cattle operation',
  client: 'Marble Semen',
  industry: 'Livestock · Cattle genetics · E-commerce',
  location: 'United States',
  liveUrl: 'https://marblesemen.com',
  image: '/projects/marblesemen.png',
  imageAlt: 'Marble Semen website homepage — Wagyu genetics e-commerce',
  stack: ['React', 'Django', 'PostgreSQL', 'AWS', 'Authorize.net'],
  role: 'Full-stack development partner',
  timeline: 'Multi-phase delivery · Production',
  overview:
    'Marble Semen sells genetically tested Fullblood Wagyu semen and embryos to breeders across the United States. They needed more than a brochure site — a reliable system to present inventory, educate buyers, and support orders without running the business on spreadsheets and phone tag.',
  challenge: [
    'Inventory and genetics data lived in spreadsheets — hard to keep accurate and impossible to scale.',
    'Buyers needed a professional, trustworthy storefront that reflects premium Wagyu genetics.',
    'The team wanted custom tools (including a “Bull Battery” experience) without off-the-shelf e-commerce limits.',
    'Content, catalog, and checkout flows had to work for a niche B2B audience, not generic retail shoppers.',
  ],
  approach: [
    'Discovery sessions with the client to map semen SKUs, embryos, genetics terminology, and sales workflow.',
    'Designed a clear information architecture: catalog, process pages, specials, and buyer-focused CTAs.',
    'Built a maintainable full-stack architecture with a React front end and Django API on PostgreSQL.',
    'Deployed on AWS with a production-minded setup so the site stays fast and available for US traffic.',
  ],
  delivered: [
    'Public storefront with genetics-focused branding and mobile-responsive layout.',
    'Product catalog for semen and embryos with structured categories and merchandising.',
    'Custom “Bull Battery” tool and supporting content pages for the sales process.',
    'Shopping cart and Authorize.net checkout flows aligned with how the client sells today.',
    'Admin-friendly structure so the team can evolve catalog and content over time.',
  ],
  results: [
    'Live production site serving real US customers at marblesemen.com.',
    'Replaced ad-hoc spreadsheet workflows with a single source of truth online.',
    'Professional digital presence that matches the premium positioning of Fullblood Wagyu genetics.',
    'Authorize.net payments live in production; foundation in place for CRM hooks and deeper herd-management features.',
  ],
} as const

/** Shown on site + kept in sync with MAIL_REPLY_WINDOW in .env */
export const REPLY_TIME = 'usually within one day'

export const STATS = [
  { value: '10+', label: 'Builds shipped' },
  { value: '3', label: 'Years experience' },
  { value: '1 day', label: 'Typical reply' },
] as const

export const HERO_ACCENTS = [
  'intelligent',
  'production',
  'AI-native',
  'reliable',
] as const
