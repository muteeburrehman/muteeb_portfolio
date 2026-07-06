export const EMAIL = 'info@muteeblabs.com'
/** Built-in scheduling funnel (custom slots + CRM). */
export const BOOK_CALL_PATH = '/book'
/** @deprecated Use BOOK_CALL_PATH — kept for gradual migration */
export const CALENDLY_URL = BOOK_CALL_PATH
export const SITE_BRAND = 'MuteebLabs'
export const LEGAL_ENTITY = 'MuteebLabs LLC'
export const LEGAL_ADDRESS_LINES = [
  '1209 Mountain Road Pl NE, Ste N',
  'Albuquerque, Bernalillo County, NM 87110, USA',
] as const
export const SITE_LOGO = '/logo.png'
/** Same transparent wordmark — used on dark nav/footer */
export const SITE_LOGO_DARK = '/logo-dark.png'
export const SITE_PROFILE_IMAGE = '/profile.jpg'
export const SITE_IMAGES = {
  heroBackdrop: '/images/mountain-sunset.png',
  heroVisual: '/images/rancher-tablet.png',
  livestockHero: '/images/barn-golden-hour.png',
  agricultureBg: '/images/cows-grazing.png',
  angusHerd: '/images/angus-herd.png',
  wagyuIllustration: '/images/wagyu-illustration.png',
  deliveryIllustration: '/images/delivery-illustration.png',
  qaTestingHero: '/images/qa-testing-hero.png',
  racingContestsHero: '/images/racing-contests-hero.png',
  aiAutomationHero: '/images/ai-automation-hero.png',
  inventoryHero: '/images/inventory-hero.png',
  localGovernmentHero: '/images/local-government-hero.png',
  /** Cattle-only preview for livestock portfolio cards — no client screenshots */
  livestockPreview: '/images/angus-herd.png',
} as const
export const NAME = 'Muteeb Ur Rehman'
export const TAGLINE =
  'Founder & Lead Engineer · MuteebLabs | Custom software, QA & AI automation'
export const ROLE = TAGLINE
export const TEAM_INTRO =
  'MuteebLabs is a software team building custom platforms — from agribusiness genetics and contest-based racing apps to inventory systems and local agency workflow fixes.'
export const TEAM_APPROACH =
  'We work end-to-end across discovery, architecture, development, testing, and launch. Whether the problem is a Wagyu genetics storefront, a motorsport contest platform, stock tracking, or a broken agency process, the goal is the same — software your team trusts and your customers can use.'
export const LINKEDIN_URL = 'https://pk.linkedin.com/in/muteeb-ur-rehman-091a2628a'

/** About profile quick facts — broad positioning, not stack/contract limits */
export const PROFILE_QUICK_FACTS = [
  { label: 'Location', value: 'Albuquerque, New Mexico, USA' },
  { label: 'Team', value: 'Engineers · QA · AI specialists' },
  { label: 'Clients', value: 'US, UK & global teams' },
  { label: 'What we build', value: 'Ag · Contests · Inventory · QA · AI' },
  { label: 'Typical response', value: '< 1 business day' },
] as const

export const TECH_STACK =
  'Python • React • PostgreSQL • Software Testing • LangChain • LLMs • OpenAI • Gemini • Claude • Vector DBs • Qdrant • n8n • Voice Agents • AWS'

/** Add your profile URLs here — links only appear when url is set */
export const SOCIAL_LINKS = [
  { label: 'GitHub', url: '', icon: 'github' as const },
  { label: 'LinkedIn', url: LINKEDIN_URL, icon: 'linkedin' as const },
] as const

export const FOOTER_FOCUS = [
  'Agribusiness',
  'Contest Apps',
  'Inventory Ops',
  'Software Testing',
  'AI Automation',
] as const

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
    image: SITE_IMAGES.racingContestsHero,
    imageAlt: 'Motorsport contest platform — racing cars at speed',
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
    image: SITE_IMAGES.livestockPreview,
    imageAlt: 'Black Angus cattle herd grazing on open pasture',
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
    tagline: 'Self-managing inbox for busy teams',
    description:
      'Production Gmail automation: every incoming message is parsed, classified (services, consultations, payments, general), routed to the right workflow, and answered with context-aware drafts — hours of inbox triage replaced by an always-on assistant.',
    image: SITE_IMAGES.aiAutomationHero,
    imageAlt: 'AI automation — workflows, robotics, and intelligent routing',
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
      'React frontends and APIs on the stack that fits — Python, Node, Next.js, PostgreSQL, and cloud deployment options.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
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

export const NAV_SERVICES = [
  { label: 'Livestock Software', to: '/livestock-software' },
  { label: 'Software Testing', to: '/qa-testing' },
  { label: 'AI & Automation', to: '/ai-automation' },
  { label: 'Custom Web Apps', to: '/#services' },
] as const

export const NAV_INDUSTRIES = [
  { label: 'Agribusiness & genetics', to: '/livestock-software', image: SITE_IMAGES.livestockHero },
  { label: 'Motorsport & contests', to: '/#work', image: SITE_IMAGES.racingContestsHero },
  { label: 'Local agencies', to: '/agency-solutions', image: SITE_IMAGES.localGovernmentHero },
  { label: 'Inventory & operations', to: '/#industries', image: SITE_IMAGES.inventoryHero },
] as const

export type NavDropdownItem = { label: string; to: string }

export type NavItem =
  | { type: 'link'; to: string; label: string }
  | { type: 'dropdown'; label: string; items: readonly NavDropdownItem[] }

export const NAV_ITEMS: NavItem[] = [
  { type: 'link', to: '/', label: 'Home' },
  { type: 'dropdown', label: 'Services', items: NAV_SERVICES },
  { type: 'dropdown', label: 'Industries', items: NAV_INDUSTRIES.map(({ label, to }) => ({ label, to })) },
  { type: 'link', to: '/#work', label: 'Work' },
  { type: 'link', to: '/#about', label: 'About' },
  { type: 'link', to: '/contact', label: 'Contact' },
]

/** @deprecated Use NAV_ITEMS */
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services' },
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export const TRUST_BAR_ITEMS = [
  'Agribusiness & genetics',
  'Contest & racing platforms',
  'Inventory & operations',
  'Agency workflow fixes',
  'Software testing & QA',
  'AI workflow automation',
] as const

export const HOME_METRICS = [
  { value: '3+', label: 'Years experience' },
  { value: '5+', label: 'Industry verticals' },
  { value: '10+', label: 'Production builds' },
  { value: '1 day', label: 'Typical reply' },
] as const

export const HERO_TRUST_ITEMS = [
  { label: 'Agribusiness platforms', detail: 'Genetics storefronts, herd tools, buyer portals' },
  { label: 'Contest & ops software', detail: 'Racing apps, inventory dashboards, agency fixes' },
  { label: 'QA & automation', detail: 'Release-ready testing, inbox routing, AI workflows' },
] as const

export const CORE_VALUES = [
  {
    title: 'Grit under pressure',
    description:
      'Tight deadlines, production issues, and changing requirements — we stay calm, communicate clearly, and keep moving. Consistent delivery is how small teams outperform slow vendors.',
  },
  {
    title: 'Partnership over transactions',
    description:
      'Your operation is not a one-off project. We treat every build with the same long-term care we would want for our own — honest scoping, reliable follow-through, and respect for the business you have spent years building.',
  },
  {
    title: 'Integrity by default',
    description:
      'We do the right thing when no one is watching — transparent estimates, no scope games, and recommendations that serve your business even when they are not the easiest sale for us.',
  },
] as const

export const AGENCY_SERVICES = [
  {
    title: 'Livestock Software',
    problem: 'Spreadsheets and phone tag slow genetics sales.',
    solution: 'Buyer portals and catalogs built for cattle operations.',
    to: '/livestock-software',
    image: SITE_IMAGES.livestockHero,
    icon: 'database' as const,
    accent: 'sky' as const,
  },
  {
    title: 'Contest Platforms',
    problem: 'Manual scoring and payouts slow race-season launches.',
    solution: 'Skill-based contest apps with live leaderboards and payments.',
    to: '/#work',
    image: SITE_IMAGES.racingContestsHero,
    icon: 'code' as const,
    accent: 'amber' as const,
  },
  {
    title: 'Inventory Systems',
    problem: 'Stock counts and orders scattered across spreadsheets.',
    solution: 'Dashboards, alerts, and integrations for real inventory ops.',
    to: '/contact',
    image: SITE_IMAGES.inventoryHero,
    icon: 'database' as const,
    accent: 'emerald' as const,
  },
  {
    title: 'Agency Solutions',
    problem: 'Local agencies stuck on broken workflows and legacy tools.',
    solution: 'Client portals, process fixes, and lightweight ops software.',
    to: '/agency-solutions',
    image: SITE_IMAGES.localGovernmentHero,
    icon: 'sparkles' as const,
    accent: 'purple' as const,
  },
  {
    title: 'Software Testing',
    problem: 'Bugs slip through before a critical launch.',
    solution: 'Manual QA and regression so you ship with confidence.',
    to: '/qa-testing',
    image: SITE_IMAGES.qaTestingHero,
    icon: 'check' as const,
    accent: 'purple' as const,
  },
  {
    title: 'AI & Automation',
    problem: 'Teams lose hours on inbox triage and repeat tasks.',
    solution: 'Workflows and AI assistants that handle the busywork.',
    to: '/ai-automation',
    image: SITE_IMAGES.aiAutomationHero,
    icon: 'zap' as const,
    accent: 'emerald' as const,
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
  { value: '3+', label: 'Years experience' },
  { value: '1 day', label: 'Typical reply' },
] as const

export const HERO_ACCENTS = [
  'intelligent',
  'production',
  'AI-native',
  'reliable',
] as const
