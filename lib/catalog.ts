import { siteConfig } from '@/lib/site-data';
import { slugify } from '@/lib/slug';

export type Offering = {
  title: string;
  slug: string;
  href: string;
  summary: string;
  intro: string;
  features: string[];
  audience: string[];
  outcomes: string[];
  process: string[];
};

export type IndustryPage = {
  title: string;
  slug: string;
  href: string;
  summary: string;
  challenges: string[];
  capabilities: string[];
  outcomes: string[];
};

const serviceCopy: Record<string, Pick<Offering, 'intro' | 'audience' | 'outcomes' | 'process'>> = {
  'custom-software-development': {
    intro: 'We design and engineer custom software around how your teams actually work: approvals, inventory, finance, operations, and reporting. The result is a secure platform that reduces manual effort instead of forcing your business into a generic product.',
    audience: ['Growing SMBs replacing spreadsheets', 'Enterprises that need industry-specific workflows', 'Operations leaders who need audit-ready systems'],
    outcomes: ['One source of truth for core operations', 'Role-based access and cleaner reporting', 'A codebase that can grow with new modules'],
    process: ['Map current workflows and pain points', 'Define modules, roles, and data model', 'Build, test, and launch in controlled releases', 'Train teams and keep iterating after go-live'],
  },
  'website-development': {
    intro: 'Your website should explain the offer, earn trust, and convert enquiries. We build fast, SEO-ready sites with clear information architecture, strong CTAs, and content that sales and marketing teams can actually maintain.',
    audience: ['Companies replacing outdated brochure sites', 'Brands that need lead generation, not just a logo page', 'Teams launching a new product or market'],
    outcomes: ['Faster pages and stronger search visibility', 'Clearer service stories and proof points', 'Forms that capture qualified enquiries'],
    process: ['Clarify positioning and page structure', 'Design conversion-focused layouts', 'Develop, optimize, and connect analytics', 'Launch, measure, and refine CTAs'],
  },
  'mobile-application-development': {
    intro: 'We build Android, iOS, and cross-platform apps for field teams, customers, and internal operations. Each app is planned around real tasks: booking, tracking, payments, notifications, and offline-friendly flows where needed.',
    audience: ['Businesses with field staff or on-demand services', 'Retail and logistics teams that need mobile workflows', 'Product owners launching a customer app'],
    outcomes: ['A reliable app that people actually use', 'Synced data with your backend or ERP', 'App-store ready delivery with support after launch'],
    process: ['Define user journeys and platform choice', 'Prototype key screens', 'Build APIs, app features, and QA cycles', 'Release, monitor, and iterate'],
  },
  'web-application-development': {
    intro: 'Web applications sit between a marketing site and a full ERP. We build portals, SaaS products, dashboards, and internal tools that handle authentication, permissions, data, and daily operations in the browser.',
    audience: ['Founders building a SaaS MVP or v2', 'Companies that need client or vendor portals', 'Teams replacing email-and-Excel processes'],
    outcomes: ['Secure login and role-based workspaces', 'Live dashboards instead of static reports', 'A platform that can add modules later'],
    process: ['Scope users, permissions, and core jobs', 'Architect APIs and data stores', 'Ship usable slices, not a big-bang launch', 'Harden security, performance, and support'],
  },
  'ui-ux-design': {
    intro: 'Design is how users decide whether your product feels trustworthy. We create research-backed UI/UX for websites, apps, and dashboards: structure, visual system, prototypes, and usability checks before engineering starts.',
    audience: ['Product teams needing a design system', 'Businesses redesigning a confusing portal', 'Founders validating a product before build'],
    outcomes: ['Clearer flows and fewer drop-offs', 'Consistent components for faster development', 'Prototypes stakeholders can react to early'],
    process: ['Understand users and business goals', 'Wireframe and test the critical paths', 'Apply visual language and interaction details', 'Hand off to engineering with reusable components'],
  },
  'cloud-solutions': {
    intro: 'Cloud work is not only hosting. We help you choose the right environment, migrate safely, automate deployments, and keep environments observable so releases are boring in the best way.',
    audience: ['Teams moving off a single office server', 'Products that need staging and production parity', 'Companies that want backups, scale, and uptime'],
    outcomes: ['Repeatable deployments instead of manual copy', 'Better uptime and rollback options', 'Infrastructure that matches how the product grows'],
    process: ['Assess current hosting and risks', 'Design environments and access controls', 'Migrate, automate CI/CD, and add monitoring', 'Document runbooks and keep optimizing cost'],
  },
  'api-and-third-party-integration': {
    intro: 'Most businesses already have payments, CRMs, ERPs, or banking tools. We connect them with secure APIs so data moves once, statuses stay in sync, and staff stop re-entering the same information.',
    audience: ['Finance and ops teams reconciling multiple tools', 'Commerce brands adding payment and shipping partners', 'IT leaders consolidating a messy system map'],
    outcomes: ['Fewer duplicate records', 'Reliable webhooks and error handling', 'Documented integrations your team can own'],
    process: ['Inventory systems and data contracts', 'Design auth, mapping, and failure cases', 'Build, sandbox-test, then go live in stages', 'Monitor, alert, and maintain version changes'],
  },
  'e-commerce-solutions': {
    intro: 'We deliver storefronts and commerce backends that handle catalog, cart, checkout, orders, and customer accounts. The emphasis is conversion, operational control, and integrations with payments and fulfilment.',
    audience: ['Retail brands moving online or replatforming', 'B2B sellers who need quotes and account pricing', 'Teams struggling with order chaos after growth'],
    outcomes: ['Cleaner product and inventory workflows', 'Secure checkout and order tracking', 'Admin tools for merchandising and support'],
    process: ['Map catalog, fulfilment, and customer types', 'Design storefront and admin journeys', 'Integrate payments, shipping, and tax', 'Launch with training and conversion reviews'],
  },
  'it-consulting': {
    intro: 'Before you spend on a rebuild, you need a plan. We help leadership choose architecture, sequencing, and vendors so technology investment matches business priorities rather than a feature wishlist.',
    audience: ['Founders unsure what to build first', 'IT managers planning a multi-year stack', 'Operations teams stuck between tools'],
    outcomes: ['A sequenced roadmap with clear trade-offs', 'Architecture that avoids expensive rework', 'Alignment between business and engineering'],
    process: ['Discover constraints and current systems', 'Score options against risk, cost, and speed', 'Recommend a target architecture', 'Support the first delivery slice'],
  },
  'maintenance-and-support': {
    intro: 'Launch is the midpoint. We stay on for monitoring, patches, small enhancements, and performance work so the product does not freeze the week after go-live.',
    audience: ['Teams with a live product but no in-house engineers', 'Companies that need SLA-style response', 'Products preparing for a second growth wave'],
    outcomes: ['Predictable fixes and security updates', 'Measured performance improvements', 'A backlog that actually ships'],
    process: ['Set up access, monitoring, and priorities', 'Triage bugs vs enhancements', 'Ship in an agreed cadence', 'Review metrics and next improvements'],
  },
};

const solutionCopy: Record<string, Pick<Offering, 'intro' | 'audience' | 'outcomes' | 'process'>> = {
  'erp-solutions': {
    intro: 'Our ERP work unifies finance, procurement, inventory, production, and reporting so managers see one operational picture instead of five conflicting spreadsheets.',
    audience: ['Manufacturers and distributors', 'Multi-location SMBs', 'Teams outgrowing disconnected tools'],
    outcomes: ['Shared masters for items, vendors, and customers', 'Faster close and clearer stock positions', 'Role-based dashboards for each function'],
    process: ['Process mapping and module selection', 'Data migration plan', 'Phased rollout by department', 'Training and hypercare'],
  },
  'hrms-and-payroll': {
    intro: 'HRMS and payroll systems should make attendance, leave, onboarding, and salary runs boringly reliable. We build or tailor HR platforms around your policies, not the other way around.',
    audience: ['HR teams doing payroll in Excel', 'Multi-state employers with compliance overhead', 'Growing companies hiring quickly'],
    outcomes: ['Cleaner employee records', 'Faster, auditable payroll cycles', 'Self-service for leave and documents'],
    process: ['Capture policies and statutory needs', 'Configure or custom-build workflows', 'Integrate attendance and finance', 'Go live with parallel payroll checks'],
  },
  'accounting-and-finance-systems': {
    intro: 'Finance systems need accuracy first. We implement invoicing, expenses, reconciliation, and reporting that leadership can trust at month-end.',
    audience: ['Finance leads tired of delayed reports', 'Professional services firms', 'SMBs preparing for audit or funding'],
    outcomes: ['Invoice-to-cash visibility', 'Fewer reconciliation surprises', 'Dashboards for cash and spend'],
    process: ['Chart of accounts and process review', 'Automation of invoices and expenses', 'Reporting pack design', 'Controls and user training'],
  },
  'inventory-management': {
    intro: 'Inventory software only helps if stock numbers match the warehouse. We build SKU tracking, alerts, vendor records, and replenishment logic around how you actually receive and ship.',
    audience: ['Retail and distribution teams', 'Manufacturers with raw and finished goods', 'Businesses losing money to stockouts'],
    outcomes: ['Live stock by location', 'Fewer emergency purchases', 'Better demand planning'],
    process: ['SKU and warehouse audit', 'Workflow for inward/outward', 'Alerts and reporting', 'Adoption on the floor'],
  },
  'warehouse-management-system': {
    intro: 'A WMS is about movement: receiving, putaway, picking, packing, and dispatch. We design scanning-friendly flows that cut errors without slowing the dock.',
    audience: ['3PLs and in-house warehouses', 'E-commerce fulfilment teams', 'Plants with high SKU velocity'],
    outcomes: ['Faster pick-pack-ship', 'Traceable inventory moves', 'Clearer labour productivity'],
    process: ['Map bin logic and peak volumes', 'Design scan and exception flows', 'Integrate with inventory/ERP', 'Pilot one zone, then expand'],
  },
  'crm-solutions': {
    intro: 'CRM should show the next action, not become a data graveyard. We implement pipelines, customer history, and reporting that sales and support will actually update.',
    audience: ['Sales-led service businesses', 'Real estate and hospitality teams', 'Support orgs that need context on every ticket'],
    outcomes: ['Visible pipeline and follow-ups', 'Shared customer history', 'Campaign and conversion reporting'],
    process: ['Define stages and required fields', 'Integrate email, forms, and WhatsApp if needed', 'Train the team on the daily habit', 'Review conversion metrics monthly'],
  },
  'project-management': {
    intro: 'Project platforms keep scope, people, and dates honest. We set up boards, timelines, and resource views for delivery teams that juggle multiple clients or sites.',
    audience: ['IT and consulting firms', 'Construction and interior contractors', 'Internal PMO teams'],
    outcomes: ['Clear owners and deadlines', 'Less status-meeting overhead', 'Earlier visibility of slip'],
    process: ['Agree delivery method and artifacts', 'Configure projects, roles, and templates', 'Connect time or cost tracking', 'Coach the first two live projects'],
  },
  'e-commerce-solutions': {
    intro: 'Commerce solutions here go beyond a theme. Catalog rules, pricing, checkout, and order ops are designed together so marketing and warehouse are not fighting the same order.',
    audience: ['D2C brands', 'B2B wholesalers', 'Retailers adding a digital channel'],
    outcomes: ['Higher completed checkouts', 'Order status customers can see', 'Admin control without developer tickets'],
    process: ['Catalog and fulfilment design', 'Checkout and payment setup', 'Ops training', 'Conversion and merchandising reviews'],
  },
  'property-management': {
    intro: 'Property platforms connect tenants, leases, maintenance, and collections. We build workflows that keep occupancy and service requests visible to managers and owners.',
    audience: ['Residential and commercial managers', 'Facility teams', 'Owners who need cleaner reports'],
    outcomes: ['Lease and rent tracking in one place', 'Faster maintenance turnaround', 'Owner-ready financial summaries'],
    process: ['Portfolio and role mapping', 'Tenant and vendor portals', 'Accounting hand-off', 'Onsite training'],
  },
  'asset-management': {
    intro: 'Asset systems track what you own, where it is, and when it needs service. That matters for plants, fleets, medical equipment, and construction gear.',
    audience: ['Manufacturing and infrastructure teams', 'Healthcare facilities', 'Construction firms with high-value equipment'],
    outcomes: ['A living asset register', 'Maintenance history per asset', 'Better capex planning'],
    process: ['Asset classes and tagging', 'Maintenance schedules', 'Depreciation or status rules', 'Mobile-friendly updates'],
  },
  'custom-business-portals': {
    intro: 'Portals give each audience the exact screens they need: customers, vendors, staff, or partners. We design permissioned workspaces with documents, tickets, and dashboards.',
    audience: ['Enterprises with many external users', 'Logistics and finance operations', 'Public-sector or regulated teams'],
    outcomes: ['Fewer email attachments', 'Self-service for the right people', 'Auditable activity'],
    process: ['Role and permission matrix', 'Information architecture', 'Secure build and SSO if needed', 'Phased user onboarding'],
  },
};

const industryCopy: Record<string, Omit<IndustryPage, 'title' | 'slug' | 'href'>> = {
  Construction: {
    summary: 'Construction firms need visibility across sites, vendors, materials, and billing. We build tools that keep project progress and costs aligned.',
    challenges: ['Site data trapped in WhatsApp and Excel', 'Material delays and wastage', 'Slow billing against running accounts'],
    capabilities: ['Project and milestone tracking', 'Material and vendor records', 'Client reporting dashboards'],
    outcomes: ['Clearer site status', 'Fewer surprise costs', 'Faster client updates'],
  },
  'Interior & Contracting': {
    summary: 'Interior and contracting teams juggle drawings, BOQs, procurement, and snag lists. Digital workflows keep design and execution on the same page.',
    challenges: ['Scope changes without a trail', 'Procurement lag', 'Handover punch lists in notebooks'],
    capabilities: ['BOQ and procurement tracking', 'Client approval trails', 'Snag and handover modules'],
    outcomes: ['Tighter change control', 'Smoother vendor follow-up', 'Cleaner project close-out'],
  },
  Logistics: {
    summary: 'Logistics businesses run on movement, documents, and exceptions. We help track shipments, warehouses, and partner hand-offs in one operational view.',
    challenges: ['Status calls instead of live tracking', 'POD and invoice mismatches', 'Multi-hub inventory confusion'],
    capabilities: ['Shipment and exception workflows', 'Warehouse and dispatch views', 'Customer status portals'],
    outcomes: ['Fewer “where is my shipment” calls', 'Cleaner billing support', 'Better hub performance visibility'],
  },
  Retail: {
    summary: 'Retail needs stock accuracy, omnichannel orders, and store-friendly tools. We connect catalog, inventory, and customer experience.',
    challenges: ['Store vs warehouse stock mismatch', 'Manual promotions', 'Weak customer history'],
    capabilities: ['Inventory and POS-adjacent workflows', 'Loyalty and CRM hooks', 'E-commerce alignment'],
    outcomes: ['Fewer lost sales from stock error', 'Clearer promotion control', 'Better repeat purchase data'],
  },
  'E-Commerce': {
    summary: 'E-commerce brands need catalog speed, checkout trust, and fulfilment that scales. We build the storefront and the operations behind it.',
    challenges: ['Cart drop-off', 'Order chaos at volume', 'Disconnected ads, store, and warehouse'],
    capabilities: ['Storefront and checkout', 'Order and inventory ops', 'Payment and shipping integrations'],
    outcomes: ['Higher completed orders', 'Ops that keep up with campaigns', 'Customer-visible tracking'],
  },
  'Real Estate': {
    summary: 'Real estate teams live on leads, site visits, inventory, and follow-ups. CRM plus listing workflows keep the pipeline honest.',
    challenges: ['Leads dying in shared inboxes', 'No visit history', 'Inventory status known only to one person'],
    capabilities: ['Lead and visit tracking', 'Property inventory views', 'Broker or customer portals'],
    outcomes: ['Faster follow-up', 'Shared inventory truth', 'Better conversion reporting'],
  },
  Healthcare: {
    summary: 'Healthcare products demand careful access control, reliable records, and calm user journeys for staff and patients.',
    challenges: ['Paper or fragmented records', 'Staff jumping between tools', 'Appointment and follow-up leakage'],
    capabilities: ['Role-based clinical or admin portals', 'Appointment and reminder flows', 'Secure document handling'],
    outcomes: ['Less duplicate data entry', 'Clearer patient follow-up', 'Audit-friendlier access'],
  },
  Education: {
    summary: 'Education institutions need admissions, learning ops, fees, and communication without five disconnected apps.',
    challenges: ['Admissions in spreadsheets', 'Fee follow-up by hand', 'Parents without a reliable channel'],
    capabilities: ['Admissions and student records', 'Fee and communication modules', 'Staff dashboards'],
    outcomes: ['Smoother admission cycles', 'Clearer fee status', 'Better parent communication'],
  },
  Finance: {
    summary: 'Finance and professional services need accurate records, client portals, and reporting that leadership can defend.',
    challenges: ['Manual reconciliations', 'Client document chase', 'Slow management reporting'],
    capabilities: ['Client portals and document rooms', 'Workflow for reviews and approvals', 'Financial dashboards'],
    outcomes: ['Less rework at month-end', 'Clients self-serving documents', 'Faster leadership packs'],
  },
  Hospitality: {
    summary: 'Hospitality is operations plus guest experience: bookings, service requests, and reputation. We connect front-of-house needs with back-office systems.',
    challenges: ['Bookings in multiple tools', 'Service requests getting lost', 'Weak guest history'],
    capabilities: ['Booking and guest profiles', 'Service request tracking', 'Review and CRM hooks'],
    outcomes: ['Fewer double bookings', 'Faster guest issue close', 'Repeat-guest insight'],
  },
  Manufacturing: {
    summary: 'Manufacturing depends on materials, machines, and delivery promises. ERP, inventory, and shop-floor visibility keep production honest.',
    challenges: ['Material shortages discovered too late', 'Production status in one supervisor’s head', 'Dispatch vs invoice mismatch'],
    capabilities: ['Inventory and production tracking', 'Quality and dispatch records', 'Management dashboards'],
    outcomes: ['Better material planning', 'Visible WIP', 'Cleaner dispatch documentation'],
  },
  'Small & Medium Businesses': {
    summary: 'SMBs need practical systems, not enterprise bloat. We start with the workflow that hurts most and grow modules as the team is ready.',
    challenges: ['Everything in Excel and chat', 'Founder as the only source of truth', 'Tools that are too heavy to adopt'],
    capabilities: ['Right-sized CRM, ops, or finance tools', 'Websites and enquiry capture', 'Training that matches a small team'],
    outcomes: ['Less founder bottleneck', 'A system the team will use', 'Room to add modules later'],
  },
};

const defaultProcess = [
  'Discover goals, users, and current systems',
  'Plan scope, architecture, and success metrics',
  'Design the experience and confirm with stakeholders',
  'Build, test, launch, and support',
];

export const processSteps = [
  { title: 'Discover', detail: 'Understand client requirements, users, constraints, and what success should look like.' },
  { title: 'Plan', detail: 'Define scope, architecture, integrations, timeline, and delivery checkpoints.' },
  { title: 'Design', detail: 'Create information architecture, UI/UX, wireframes, and prototypes before heavy engineering.' },
  { title: 'Develop', detail: 'Build the application with secure, maintainable code and clear environments.' },
  { title: 'Test', detail: 'Run functional, responsive, performance, and security checks on real user paths.' },
  { title: 'Deploy', detail: 'Launch into production with backups, monitoring, and a rollback path.' },
  { title: 'Support & Grow', detail: 'Maintain, patch, and enhance the product as the business changes.' },
];

export const whyUsPoints = [
  ['Innovative Solutions', 'Modern technology chosen for the job, not for a trend list.'],
  ['Custom Development', 'Workflows designed around your team instead of a rigid template.'],
  ['Quality First', 'Readable code, tests where they matter, and launch checklists.'],
  ['Scalable Technology', 'Architecture that can take more users, modules, and integrations.'],
  ['Dedicated Support', 'A named team after go-live, not a black box inbox.'],
  ['On-Time Delivery', 'Scoped slices, visible progress, and honest dates.'],
  ['Secure Development', 'Access control, secrets hygiene, and security-minded defaults.'],
  ['Transparent Communication', 'Updates you can show internally without translating jargon.'],
];

export const faqs = [
  {
    question: 'How do we start a project with A&M FutureTech?',
    answer: 'Share a brief through Contact or Get a Quote. We reply with clarifying questions, a proposed approach, and a commercial outline. Work starts only after scope and commercials are agreed in writing.',
  },
  {
    question: 'Do you only work with large enterprises?',
    answer: 'No. We work with SMBs and growing companies as well as established teams. The engagement is sized to the problem: a website, a portal, an ERP module, or a full product.',
  },
  {
    question: 'Can you work with our existing systems?',
    answer: 'Yes. A large part of our work is integration: payments, ERPs, CRMs, warehouses, and custom APIs. We map what you already have before recommending a rebuild.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer: 'A marketing website can be weeks. A custom application or ERP slice is usually a phased programme over a few months. We publish a timeline after discovery, not before we have seen the constraints.',
  },
  {
    question: 'Do you provide source code and documentation?',
    answer: 'Deliverables, IP, and repository access are defined in the statement of work. We document environments, admin flows, and handover notes as part of launch.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We offer maintenance and support: monitoring, bug fixes, security updates, and small enhancements. Many clients keep a monthly cadence rather than disappearing after go-live.',
  },
];

export const services: Offering[] = siteConfig.serviceCards.map((service) => {
  const slug = slugify(service.title);
  const extra = serviceCopy[slug];
  return {
    title: service.title,
    slug,
    href: `/services/${slug}`,
    summary: service.description,
    intro: extra?.intro || service.description,
    features: service.features,
    audience: extra?.audience || ['Businesses modernising operations', 'Teams that need a reliable digital partner'],
    outcomes: extra?.outcomes || ['A clearer operating system for the team', 'Measurable delivery against an agreed scope'],
    process: extra?.process || defaultProcess,
  };
});

export const solutions: Offering[] = siteConfig.solutions.map((solution) => {
  const slug = slugify(solution.name);
  const extra = solutionCopy[slug];
  return {
    title: solution.name,
    slug,
    href: `/solutions/${slug}`,
    summary: solution.overview,
    intro: extra?.intro || solution.overview,
    features: solution.features,
    audience: extra?.audience || solution.industries.map((item) => `${item} teams`),
    outcomes: extra?.outcomes || solution.benefits,
    process: extra?.process || defaultProcess,
  };
});

export const industries: IndustryPage[] = siteConfig.industries.map((title) => {
  const extra = industryCopy[title];
  return {
    title,
    slug: slugify(title),
    href: `/industries/${slugify(title)}`,
    summary: extra?.summary || `Technology systems tailored for ${title.toLowerCase()} operations, customers, and reporting.`,
    challenges: extra?.challenges || ['Fragmented tools', 'Manual reporting', 'Slow customer response'],
    capabilities: extra?.capabilities || ['Custom software and portals', 'Integrations', 'Dashboards and support'],
    outcomes: extra?.outcomes || ['Clearer operations', 'Better customer experience', 'Room to scale'],
  };
});

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getSolution(slug: string) {
  return solutions.find((item) => item.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((item) => item.slug === slug);
}
