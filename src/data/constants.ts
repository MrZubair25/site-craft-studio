export interface ProjectItem {
  id: string;
  title: string;
  category: 'SaaS' | 'Agency' | 'E-commerce' | 'Portfolio' | 'Landing Page';
  year: string;
  metric: string;
  summary: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  liveUrl: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  tools: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName:
    | 'Layout'
    | 'Sparkles'
    | 'Rocket'
    | 'RefreshCw'
    | 'Database'
    | 'Gauge'
    | 'GraduationCap';
  included: string[];
}

export interface ComparisonRow {
  feature: string;
  framer: string;
  traditional: string;
  framerWins: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  quote: string;
  outcome: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  projectUSD: number | null;
  projectPKR: number | null;
  monthlyUSD: number | null;
  monthlyPKR: number | null;
  delivery: string;
  features: string[];
  ctaLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const ASSETS = {
  logo: '/src/assets/site-craft-logo.svg',
  portrait: '/assets/aistudio/zubair-sitecraft_3af9bc81.jpeg',
};

export const BRAND = {
  owner: 'Zubair Akram',
  studio: 'Site Craft Studio',
  role: 'Framer Website Designer & Founder',
  email: 'zubairprogramerexpert@gmail.com',
  whatsappNumber: '923487718479',
  whatsappDisplay: '+92-3487718479',
  phoneTel: '+923487718479',
  location: 'Lahore, Pakistan · Working Worldwide',
  fiverrUrl: 'https://www.fiverr.com/users/sitecraftstudio/seller_dashboard',
  calendlyUrl: '#contact',
  socials: [
    {
      name: 'Fiverr',
      url: 'https://www.fiverr.com/users/sitecraftstudio/seller_dashboard',
      handle: '@sitecraftstudio',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mrzubairakram/',
      handle: 'in/mrzubairakram',
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com/mr-zubair-akram',
      handle: 'dribbble/mr-zubair-akram',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/sitecraftstudiopro/?hl=en',
      handle: '@sitecraftstudiopro',
    },
    {
      name: 'X',
      url: 'https://x.com/sitecraftstudio',
      handle: '@sitecraftstudio',
    },
  ],
};

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_COPY = {
  availability: 'Available for new projects',
  headline: 'I design & build Framer websites that turn visitors into clients.',
  subheadline:
    "Hi, I'm Zubair Akram, founder of Site Craft Studio. I craft fast, beautiful, conversion-focused Framer websites for startups, agencies, and brands worldwide.",
  primaryCta: 'View My Work',
  secondaryCta: 'Book a Free Call',
  fiverrCta: 'Hire me on Fiverr',
  floatingBadges: [
    { label: '50+ Projects', sub: 'Shipped globally' },
    { label: '5.0★ Rating', sub: 'Verified client reviews' },
    { label: 'Framer Expert', sub: 'Custom code & CMS' },
    { label: 'Fast Delivery', sub: '7–14 day turnaround' },
  ],
};

export const TOOL_MARQUEE = [
  'Framer',
  'Figma',
  'Spline 3D',
  'Lottie Animations',
  'Webflow Migration',
  'Technical SEO',
  'Framer CMS',
  'React Overrides',
];

export const PROJECT_CATEGORIES = [
  'All',
  'SaaS',
  'Agency',
  'E-commerce',
  'Portfolio',
  'Landing Page',
] as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: 'nichetrx-logistics',
    title: 'NicheTRX — GCC AI Logistics Platform',
    category: 'SaaS',
    year: '2026',
    metric: 'Real-time GCC fleet tracking',
    summary:
      'AI-powered cargo delivery and live truck tracking platform across Saudi Arabia, UAE, Qatar, Bahrain, Kuwait, and Oman.',
    image: '/assets/aistudio/image_b8dd274d.png',
    gallery: [
      '/assets/aistudio/image_b8dd274d.png',
      '/src/assets/images/project_nichetrx_logistics_1795326355308.jpg',
    ],
    featured: true,
    liveUrl: 'https://nichetrx-trx.ai.studio/',
    overview:
      'NicheTRX is a technology-driven freight and cargo delivery platform engineered to give enterprises full supply-chain visibility across the GCC corridor.',
    challenge:
      'Shippers managing flatbed, refrigerated, oversized, and hazmat cargo across borders lacked unified real-time telemetry and instant customer dispatch.',
    solution:
      'Designed and built a high-clarity web platform showcasing AI route optimization, live GPS & IoT fleet tracking, and a unified Customer Support + WhatsApp quick-connect button.',
    results: [
      'Real-time shipment visibility across 6 GCC countries',
      'Unified Customer & WhatsApp dispatch button for instant quote requests',
      'Streamlined booking flows for flatbed, reefer, oversized & hazmat cargo',
    ],
    tools: ['AI Studio', 'React', 'Framer Motion', 'GPS & IoT UI', 'Customer + WhatsApp Widget'],
  },
  {
    id: 'lumina-cloud',
    title: 'Lumina Analytics SaaS',
    category: 'SaaS',
    year: '2026',
    metric: '+45% demo conversions',
    summary: 'Complete SaaS marketing site, interactive product tour, and multi-plan pricing engine built in Framer.',
    image: '/src/assets/images/project_lumina_saas_1794885732969.jpg',
    gallery: [
      '/src/assets/images/project_lumina_saas_1794885732969.jpg',
      '/src/assets/images/project_pulse_landing_1794885736019.jpg',
    ],
    featured: false,
    liveUrl: 'https://framer.com',
    overview:
      'Lumina needed a flagship marketing site ahead of their Series A announcement that demonstrated real-time telemetry without sluggish video embeds.',
    challenge:
      'Their previous Webflow site scored 62 on Lighthouse mobile and buried product proof under three levels of dropdown menus.',
    solution:
      'Designed an interactive Framer build with custom React code overrides for live ROI estimation, crisp dark-mode contrast, and instant CMS case studies.',
    results: [
      '+45% increase in qualified demo bookings within 60 days',
      '99/100 Google Lighthouse Performance & SEO score',
      'Marketing team publishes new changelogs in under 5 minutes',
    ],
    tools: ['Framer', 'Figma', 'React Overrides', 'Framer CMS', 'Technical SEO'],
  },
  {
    id: 'forma-digital',
    title: 'Forma Digital Agency',
    category: 'Agency',
    year: '2026',
    metric: '3.2× inbound leads',
    summary: 'Swiss-grid creative agency flagship with fluid scroll choreography and CMS-driven case studies.',
    image: '/src/assets/images/project_verve_agency_1794885732988.jpg',
    gallery: [
      '/src/assets/images/project_verve_agency_1794885732988.jpg',
      '/src/assets/images/project_kinetix_portfolio_1794885734386.jpg',
    ],
    featured: false,
    liveUrl: 'https://framer.com',
    overview:
      'London-based architectural digital studio Forma wanted a sharp editorial presence that proved design taste in the first 3 seconds.',
    challenge:
      'Their legacy WordPress build felt dated and required developer tickets for every portfolio update.',
    solution:
      'Crafted a bold typographic layout in Framer with smooth scroll transitions, structured filterable work archive, and modular CMS templates.',
    results: [
      '3.2× rise in enterprise project inquiries',
      'Average session duration jumped from 52s to 2m 40s',
      'Zero developer maintenance needed post-launch',
    ],
    tools: ['Framer', 'Figma', 'Lottie', 'CMS Collections'],
  },
  {
    id: 'aurora-botanicals',
    title: 'Aurora Botanicals Store',
    category: 'E-commerce',
    year: '2025',
    metric: '+38% checkout completion',
    summary: 'Editorial skincare storefront pairing tactile photography with lightning-fast product discovery.',
    image: '/src/assets/images/project_aura_ecommerce_1794885734798.jpg',
    gallery: [
      '/src/assets/images/project_aura_ecommerce_1794885734798.jpg',
      '/src/assets/images/project_nexus_cms_1794885736032.jpg',
    ],
    featured: false,
    liveUrl: 'https://framer.com',
    overview:
      'A direct-to-consumer luxury skincare brand seeking an editorial storytelling storefront integrated seamlessly with Shopify checkout.',
    challenge:
      'Standard Shopify templates looked identical to competitors and slowed down mobile browsing with heavy scripts.',
    solution:
      'Built a custom Framer front-end with Shopify cart integration, ingredient breakdown drawers, and responsive mobile-first bundle cards.',
    results: [
      '+38% checkout completion rate on mobile',
      'Sub-1.1s First Contentful Paint across 4G connections',
      '+24% average order value via curated ritual bundles',
    ],
    tools: ['Framer', 'Shopify Integration', 'Figma', 'Motion Design'],
  },
  {
    id: 'arcform-architects',
    title: 'ArcForm Architects',
    category: 'Portfolio',
    year: '2025',
    metric: 'Featured Site of the Day',
    summary: 'Monochrome architectural monograph with bento project index and full-bleed lightbox galleries.',
    image: '/src/assets/images/project_kinetix_portfolio_1794885734386.jpg',
    gallery: [
      '/src/assets/images/project_kinetix_portfolio_1794885734386.jpg',
      '/src/assets/images/project_verve_agency_1794885732988.jpg',
    ],
    featured: true,
    liveUrl: 'https://framer.com',
    overview:
      'An international architecture practice showcasing 30+ commercial and residential commissions with zero visual noise.',
    challenge:
      'Large architectural renders previously caused layout shifts and 6-second load times.',
    solution:
      'Engineered progressive image loading, clean typographic index rows, and keyboard-accessible gallery modals inside Framer.',
    results: [
      'Featured in Framer Community Showcase',
      '64% reduction in page payload size',
      'Secured 2 international civic RFP invitations',
    ],
    tools: ['Framer', 'Figma', 'Custom Code Components', 'CMS'],
  },
  {
    id: 'pulse-fintech',
    title: 'Pulse AI Wealth Launch',
    category: 'Landing Page',
    year: '2026',
    metric: '11.4% waitlist conversion',
    summary: 'High-impact product launch landing page engineered for clarity, trust, and waitlist signups.',
    image: '/src/assets/images/project_pulse_landing_1794885736019.jpg',
    gallery: [
      '/src/assets/images/project_pulse_landing_1794885736019.jpg',
      '/src/assets/images/project_lumina_saas_1794885732969.jpg',
    ],
    featured: false,
    liveUrl: 'https://framer.com',
    overview:
      'Seed-stage AI wealth startup launching in 10 days ahead of their Product Hunt and investor demo day.',
    challenge:
      'Complex predictive portfolio tooling needed to feel effortless and trustworthy to first-time visitors.',
    solution:
      'Delivered a focused single-page Framer launch site with interactive metric previews, social proof blocks, and instant waitlist capture.',
    results: [
      '11.4% visitor-to-waitlist conversion rate',
      '4,200+ signups in launch week',
      'Shipped from wireframe to live domain in 8 days',
    ],
    tools: ['Framer', 'Spline', 'Figma', 'Conversion Copywriting'],
  },
  {
    id: 'insight-publishing',
    title: 'Insight Editorial Hub',
    category: 'SaaS',
    year: '2025',
    metric: '+62% organic traffic',
    summary: 'Structured multi-author CMS publication and resource center designed for search visibility and reading comfort.',
    image: '/src/assets/images/project_nexus_cms_1794885736032.jpg',
    gallery: [
      '/src/assets/images/project_nexus_cms_1794885736032.jpg',
      '/src/assets/images/project_aura_ecommerce_1794885734798.jpg',
    ],
    featured: false,
    liveUrl: 'https://framer.com',
    overview:
      'A B2B research platform consolidating three scattered blogs into one unified, fast-loading Framer CMS hub.',
    challenge:
      'Editors struggled with rigid templates and poor semantic markup that held back search rankings.',
    solution:
      'Architected clean CMS relations (authors, topics, featured reads), Schema markup, and instant client-side article filtering.',
    results: [
      '+62% organic search traffic within 90 days',
      '100/100 Lighthouse SEO & Accessibility scores',
      'Zero formatting issues across 120+ migrated posts',
    ],
    tools: ['Framer CMS', 'Schema JSON-LD', 'Figma', 'Technical SEO'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'framer-design',
    title: 'Framer Website Design',
    shortDesc: 'End-to-end bespoke websites designed in Figma and crafted pixel-for-pixel in Framer.',
    iconName: 'Layout',
    included: [
      'Conversion-focused wireframes & art direction',
      'Responsive breakpoints (Desktop, Tablet, Mobile)',
      'Clean component architecture & design tokens',
      'Full domain & SSL launch setup',
    ],
  },
  {
    id: 'custom-components',
    title: 'Custom Framer Components',
    shortDesc: 'Tailored React code components, smart forms, calculators, and micro-interactions.',
    iconName: 'Sparkles',
    included: [
      'Custom React overrides & Framer code components',
      'Scroll-linked animations & 3D tilt effects',
      'Interactive pricing & ROI calculators',
      '60fps GPU-accelerated transitions',
    ],
  },
  {
    id: 'landing-pages',
    title: 'High-Converting Landing Pages',
    shortDesc: 'Focused launch pages engineered for SaaS products, waitlists, and ad campaigns.',
    iconName: 'Rocket',
    included: [
      'Messaging hierarchy & value-prop framing',
      'Above-the-fold proof & CTA optimization',
      'CRM, HubSpot, or Waitlist webhook wiring',
      'Rapid 5–7 day sprint delivery',
    ],
  },
  {
    id: 'redesign',
    title: 'Website Redesign & Migration',
    shortDesc: 'Upgrade slow WordPress or dated Webflow sites into sleek, effortless Framer builds.',
    iconName: 'RefreshCw',
    included: [
      'UX & conversion audit of current site',
      '301 redirect mapping to protect SEO rankings',
      'Modern visual refresh with clean hierarchy',
      'Content & media optimization',
    ],
  },
  {
    id: 'cms-setup',
    title: 'CMS & Blog Setup',
    shortDesc: 'Structured Framer CMS collections so your team publishes pages without touching layout.',
    iconName: 'Database',
    included: [
      'Blogs, case studies, careers & changelogs',
      'Category filtering & search integration',
      'Dynamic Open Graph social share cards',
      'Clean editorial formatting styles',
    ],
  },
  {
    id: 'seo-speed',
    title: 'SEO & Speed Optimization',
    shortDesc: 'Semantic HTML structure, metadata, schema, and media tuning for top Lighthouse scores.',
    iconName: 'Gauge',
    included: [
      'Semantic headings, alt tags & ARIA labels',
      'JSON-LD structured data & sitemaps',
      'Next-gen image compression & lazy loading',
      'Core Web Vitals performance tuning',
    ],
  },
  {
    id: 'handoff-training',
    title: 'Handoff & Team Training',
    shortDesc: 'Recorded Loom walkthroughs and live team onboarding so you own your site confidently.',
    iconName: 'GraduationCap',
    included: [
      'Custom Loom video library for your site',
      'Editable global color & typography styles',
      '1-on-1 live Q&A handoff session',
      '14–30 days post-launch priority support',
    ],
  },
];

export const WHY_FRAMER_ROWS: ComparisonRow[] = [
  {
    feature: 'Launch Speed',
    framer: '7–14 days from concept to live URL',
    traditional: '6–12 weeks of design + dev sprints',
    framerWins: true,
  },
  {
    feature: 'Self-Service Editing',
    framer: 'Visual canvas + instant 1-click publish',
    traditional: 'Requires developer tickets & staging deploys',
    framerWins: true,
  },
  {
    feature: 'Built-In SEO & Speed',
    framer: 'Global CDN, SSR & semantic markup baked in',
    traditional: 'Heavy plugins, manual caching & config',
    framerWins: true,
  },
  {
    feature: 'Fluid Animations',
    framer: 'Native spring physics & scroll choreography',
    traditional: 'Extra JS libraries & costly QA cycles',
    framerWins: true,
  },
  {
    feature: 'CMS Publishing',
    framer: 'Visual collections ready for non-technical teams',
    traditional: 'Complex headless setup or clunky dashboards',
    framerWins: true,
  },
  {
    feature: 'Total Cost of Ownership',
    framer: 'Predictable build fee, zero server maintenance',
    traditional: 'High dev retainers + hosting & security patches',
    framerWins: true,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    duration: 'Days 1–2',
    description:
      'We align on your business goals, ideal customer, conversion bottleneck, and sitemap so every section earns its place.',
    deliverables: ['30-min kickoff call', 'Page architecture & copy outline', 'Visual direction moodboard'],
  },
  {
    number: '02',
    title: 'Design in Figma',
    duration: 'Days 3–6',
    description:
      'I craft a clean, modern visual system with sharp typography, high-contrast surfaces, and custom UI mockups.',
    deliverables: ['Full desktop & mobile designs', 'Interactive review link', 'Two focused revision rounds'],
  },
  {
    number: '03',
    title: 'Build & Animate in Framer',
    duration: 'Days 7–11',
    description:
      'Designs come alive in Framer with responsive breakpoints, spring micro-interactions, custom code components, and CMS collections.',
    deliverables: ['Pixel-accurate Framer build', 'CMS & form integrations', '60fps motion polish'],
  },
  {
    number: '04',
    title: 'Launch & Support',
    duration: 'Days 12–14',
    description:
      'Full SEO, speed, and accessibility QA before connecting your domain, followed by Loom training and dedicated post-launch support.',
    deliverables: ['Custom domain & analytics setup', 'Loom video walkthroughs', 'Post-launch care window'],
  },
];

export const ABOUT_STATS = [
  { value: 50, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '+', label: 'Years in Framer' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

export const SKILL_RINGS = [
  { name: 'Framer', level: 98 },
  { name: 'Figma', level: 95 },
  { name: 'Motion & UX', level: 94 },
  { name: 'Technical SEO', level: 92 },
  { name: 'React / Code', level: 88 },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-nichetrx',
    name: 'Mr Ussaid Aslam',
    role: 'Founder & CEO',
    company: 'NicheTRX',
    initials: 'UA',
    rating: 5,
    quote:
      'Zubair built our NicheTRX logistics platform with remarkable clarity and speed. From live GCC corridor tracking to the unified customer support and WhatsApp dispatch flow, clients can request freight quotes effortlessly.',
    outcome: '6-Nation GCC Freight Launch',
  },
  {
    id: 't1',
    name: 'Daniel Brooks',
    role: 'Co-Founder & CEO',
    company: 'Lumina Cloud',
    initials: 'DB',
    rating: 5,
    quote:
      'Zubair transformed a cluttered 8-page site into a sharp Framer flagship in twelve days. Our inbound demo bookings jumped 45% in the first two months.',
    outcome: '+45% Demo Bookings',
  },
  {
    id: 't2',
    name: 'Sofia Lindqvist',
    role: 'Managing Partner',
    company: 'Forma Digital London',
    initials: 'SL',
    rating: 5,
    quote:
      'Rarely do you find a designer who nails editorial taste and engineering speed together. Our team now ships new case studies in minutes without dev help.',
    outcome: '3.2× Inbound Leads',
  },
  {
    id: 't3',
    name: 'Hamza Tariq',
    role: 'Head of Growth',
    company: 'Pulse AI',
    initials: 'HT',
    rating: 5,
    quote:
      'We needed a launch page before investor demo day with zero margin for error. Zubair delivered ahead of schedule and hit an 11.4% waitlist conversion rate.',
    outcome: '11.4% Waitlist Conv.',
  },
  {
    id: 't4',
    name: 'Claire Vance',
    role: 'Founder',
    company: 'Aurora Botanicals',
    initials: 'CV',
    rating: 5,
    quote:
      'Communication was effortless from day one. Every interaction feels intentional, our mobile checkout rate climbed 38%, and the handoff videos were gold.',
    outcome: '+38% Mobile Checkout',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Best for startups needing a sharp, fast-converting landing page.',
    projectUSD: 750,
    projectPKR: 210000,
    monthlyUSD: 600,
    monthlyPKR: 168000,
    delivery: '5–7 days delivery',
    features: [
      'High-converting 1-page Framer website',
      'Responsive desktop, tablet & mobile layouts',
      'Subtle Framer motion & scroll reveals',
      'Lead capture form & basic SEO setup',
      '2 revision rounds + Loom handoff guide',
    ],
    ctaLabel: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Full multi-page brand or SaaS site built to scale inbound pipeline.',
    popular: true,
    projectUSD: 1650,
    projectPKR: 460000,
    monthlyUSD: 1350,
    monthlyPKR: 375000,
    delivery: '10–14 days delivery',
    features: [
      'Up to 6 custom pages designed & built in Framer',
      'Framer CMS setup (Blog, Case Studies, Careers)',
      'Custom React code components & micro-interactions',
      'Technical SEO, Schema markup & speed tuning',
      'Analytics, Calendly & CRM integrations',
      '30 days priority post-launch support',
    ],
    ctaLabel: 'Choose Growth Plan',
  },
  {
    id: 'custom',
    name: 'Custom Studio',
    tagline: 'Dedicated design & Framer engineering partner for ambitious teams.',
    projectUSD: null,
    projectPKR: null,
    monthlyUSD: 2400,
    monthlyPKR: 670000,
    delivery: 'Flexible sprint roadmap',
    features: [
      'Unlimited pages & complex CMS architecture',
      '3D Spline, Lottie & bespoke interactive tooling',
      'Webflow / WordPress full SEO migration',
      'Design system library & Figma component kit',
      'Dedicated Slack channel & weekly strategy calls',
    ],
    ctaLabel: 'Request Custom Quote',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How long does it take to design and build a Framer website?',
    answer:
      'Most high-converting landing pages ship in 5–7 business days. Complete multi-page SaaS or agency websites with CMS collections typically take 10–14 days from kickoff to domain launch.',
  },
  {
    question: 'How many revisions are included in a project?',
    answer:
      'Every project includes structured feedback checkpoints after wireframing, Figma design, and the interactive Framer staging link—covering two full revision rounds to guarantee you love the final result.',
  },
  {
    question: 'What is included in your pricing, and how do payments work?',
    answer:
      'Pricing covers strategy, UI design, Framer development, responsive optimization, basic SEO, and handoff training. Payments are split 50% upfront to reserve your slot and 50% upon final approval before domain transfer.',
  },
  {
    question: 'Do I need to pay separately for Framer hosting?',
    answer:
      'Yes, Framer hosting is billed directly through your own Framer workspace (typically $15–$30/month depending on CMS needs). You own 100% of the project, domain, and account with zero lock-in.',
  },
  {
    question: 'Can my team easily edit text, images, and blog posts after launch?',
    answer:
      'Absolutely. That is one of the biggest reasons I build in Framer. You can edit copy inline just like a design doc, publish new CMS blog posts or case studies in seconds, and follow the custom Loom training videos I record for your team.',
  },
  {
    question: 'What kind of support do you offer after the site goes live?',
    answer:
      'Every Growth build includes 30 days of complimentary post-launch support for tweaks, CMS questions, or analytics checks. Many clients also stay on a flexible monthly retainer for ongoing landing pages and CRO experiments.',
  },
];
