import { fetchBlogsFromSheet } from '@/lib/google-sheets';
import { toDriveImageUrl } from '@/lib/drive';
import { slugify } from '@/lib/utils';

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  status?: string;
};

export const fallbackBlogs: BlogPost[] = [
  {
    title: 'How Custom Software Helps Growing Businesses Scale With Confidence',
    slug: 'custom-software-for-growing-businesses',
    excerpt: 'A practical look at when custom software outperforms off-the-shelf tools and how to plan a successful build.',
    content: `Off-the-shelf software is useful until your workflows, reporting, or customer experience start living outside the product. That is usually the moment custom software becomes a growth investment rather than a technical expense.

A well-designed business system captures how your team actually works: approvals, inventory, finance, customer records, and reporting in one reliable platform. The result is fewer manual handoffs, cleaner data, and faster decisions.

At A&M FutureTech, we start with discovery, then map processes, architecture, and UX before writing production code. That sequence keeps scope controlled and makes the first release useful instead of merely impressive.

If you are evaluating a custom build, focus on three questions: which process creates the most delay, which data is currently unreliable, and which workflow would create the biggest operational gain if it were automated.`,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    category: 'Software Development',
    author: 'A&M FutureTech Editorial',
    publishedAt: '2026-08-12',
    seoTitle: 'Custom Software for Growing Businesses | A&M FutureTech',
    seoDescription: 'Learn when custom software is worth building, how to plan a first release, and how A&M FutureTech delivers scalable business systems.',
    tags: ['custom software', 'ERP', 'digital transformation'],
  },
  {
    title: 'A Practical Cloud Migration Checklist for Mid-Size Teams',
    slug: 'cloud-migration-checklist-for-mid-size-teams',
    excerpt: 'Move to the cloud without disrupting operations. Use this checklist to reduce risk, cost surprises, and downtime.',
    content: `Cloud migration fails more often from weak planning than from weak technology. The companies that move well treat migration as an operating-model change, not a hosting change.

Start by classifying applications: what must move first, what can wait, and what should be retired. Then confirm data ownership, access control, backup policy, and monitoring before any cutover date is announced.

A useful migration plan includes environment parity, rollback steps, security baselines, and a 30-day hypercare window. It should also name who approves go-live, who watches logs, and who communicates with users.

A&M FutureTech helps teams migrate to AWS and Azure with a staged approach: assess, design, migrate, validate, and optimize. That keeps production stable while the new environment is proven.`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    category: 'Cloud',
    author: 'A&M FutureTech Cloud Team',
    publishedAt: '2026-07-28',
    seoTitle: 'Cloud Migration Checklist for Mid-Size Teams | A&M FutureTech',
    seoDescription: 'Use this cloud migration checklist to plan AWS or Azure moves with less downtime, clearer ownership, and better cost control.',
    tags: ['cloud', 'AWS', 'Azure', 'migration'],
  },
  {
    title: 'ERP vs Custom Software: Which Operating System Does Your Business Need?',
    slug: 'erp-vs-custom-software',
    excerpt: 'ERP is powerful, but it is not always the right fit. Compare both options before you commit budget and team time.',
    content: `ERP platforms shine when your processes are close to industry norms. Custom software shines when your process is the advantage.

The wrong choice is expensive. An ERP forced over a unique workflow creates workarounds. A custom product built where a proven ERP would have been enough creates unnecessary maintenance.

The practical method is to score each process: compliance-heavy finance often belongs in ERP; customer-facing operations, specialized logistics, or internal marketplaces often belong in a custom layer. Many strong companies use both.

A&M FutureTech designs hybrid architectures so reporting stays unified even when some modules are custom. The goal is operational clarity, not a larger software catalog.`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    category: 'Business Solutions',
    author: 'A&M FutureTech Strategy',
    publishedAt: '2026-07-04',
    seoTitle: 'ERP vs Custom Software: How to Choose | A&M FutureTech',
    seoDescription: 'Compare ERP and custom software with a practical decision framework for operations, cost, and long-term scale.',
    tags: ['ERP', 'custom software', 'operations'],
  },
  {
    title: 'What Makes a High-Performing Business Mobile App in 2026',
    slug: 'high-performing-business-mobile-apps-2026',
    excerpt: 'Speed, trust, and workflow fit matter more than feature count. Here is how we design mobile products that get used.',
    content: `A business app does not need every feature. It needs the shortest path to the task a user repeats every day: request, approve, track, pay, or update.

High-performing apps share a few traits: fast first load, obvious navigation, reliable offline or poor-network behavior, and clear status after every action. Visual polish helps, but unfinished workflows destroy adoption.

We recommend launching with a narrow first version, measuring completion rates, then expanding. That is faster than shipping a large app nobody finishes.

A&M FutureTech builds Android, iOS, and cross-platform apps with the same product discipline we use for web platforms: discovery, UX, engineering, QA, and post-launch support.`,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
    category: 'Mobile Apps',
    author: 'A&M FutureTech Product Team',
    publishedAt: '2026-06-18',
    seoTitle: 'High-Performing Business Mobile Apps in 2026 | A&M FutureTech',
    seoDescription: 'Discover the product, UX, and engineering practices behind mobile apps that employees and customers actually use.',
    tags: ['mobile apps', 'UX', 'product strategy'],
  },
  {
    title: 'Website SEO Basics Every IT Company Should Get Right',
    slug: 'website-seo-basics-for-it-companies',
    excerpt: 'Technical SEO, clear service pages, and useful articles still outperform generic keyword stuffing.',
    content: `Search visibility for an IT company is not a trick. It is a combination of fast pages, clear titles, relevant service copy, and articles that answer real buying questions.

Each important page should have one job: home for positioning, services for commercial intent, case studies for proof, and blogs for education. Duplicate headings and thin pages make that structure collapse.

The technical layer still matters: crawlable links, XML sitemaps, canonical URLs, mobile layout, and descriptive metadata. Without those, even good writing underperforms.

This website is structured around that model. If you want the same foundation for your own digital presence, A&M FutureTech can design, build, and optimize it as part of a broader growth system.`,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1600&q=80',
    category: 'Digital Growth',
    author: 'A&M FutureTech Marketing',
    publishedAt: '2026-05-30',
    seoTitle: 'SEO Basics for IT Company Websites | A&M FutureTech',
    seoDescription: 'Learn the SEO fundamentals IT companies need: technical structure, service pages, metadata, and content that matches buyer intent.',
    tags: ['SEO', 'websites', 'content'],
  },
  {
    title: 'Security Practices We Build Into Every Business Application',
    slug: 'security-practices-for-business-applications',
    excerpt: 'Security is not a later phase. These are the controls we include from the first architecture workshop.',
    content: `Business software holds customer records, payments, internal documents, and operational history. That makes security part of product quality, not an optional add-on.

We design with least-privilege access, encrypted data in transit, audit-friendly logs, secret management, and regular dependency updates. Authentication, role design, and backup restore tests belong in the first release plan.

A secure application is also a usable one. If people need hidden spreadsheets to finish their job, the official system has already failed. Good security reduces shadow processes.

A&M FutureTech includes security reviews in discovery, development, and launch so the product is ready for real users, not just a demo environment.`,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80',
    category: 'Security',
    author: 'A&M FutureTech Engineering',
    publishedAt: '2026-05-09',
    seoTitle: 'Application Security Practices for Business Software | A&M FutureTech',
    seoDescription: 'See the security practices A&M FutureTech builds into business applications, from access control to launch-ready reviews.',
    tags: ['security', 'software development', 'compliance'],
  },
];

function normalize(post: BlogPost): BlogPost {
  return {
    ...post,
    slug: post.slug || slugify(post.title),
    image: toDriveImageUrl(post.image),
    seoTitle: post.seoTitle || `${post.title} | A&M FutureTech`,
    seoDescription: post.seoDescription || post.excerpt,
    tags: post.tags.length ? post.tags : [post.category],
  };
}

export async function getBlogs() {
  const fromSheet = await fetchBlogsFromSheet();
    const mapped = fromSheet.map(normalize);
  const merged = new Map<string, BlogPost>();
  fallbackBlogs.concat(mapped).forEach((post) => merged.set(post.slug, normalize(post)));
  return Array.from(merged.values()).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getBlogs();
  return blogs.find((post) => post.slug === slug) || null;
}

export function blogToSheetRow(post: BlogPost): Record<string, string> {
  return {
    Title: post.title,
    Slug: post.slug,
    Excerpt: post.excerpt,
    Content: post.content,
    'Image URL': post.image,
    Category: post.category,
    Author: post.author,
    'Published At': post.publishedAt,
    'SEO Title': post.seoTitle,
    'SEO Description': post.seoDescription,
    Tags: post.tags.join(', '),
    Status: 'Published',
  };
}
