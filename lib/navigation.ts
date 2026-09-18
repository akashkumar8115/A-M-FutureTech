import { industries, services, solutions } from '@/lib/catalog';

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  mega?: boolean;
};

export const navItems: NavItem[] = [
  {
    label: 'Company',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about', description: 'Who we are and how we work' },
      { label: 'Why Choose Us', href: '/why-us', description: 'Delivery principles and proof points' },
      { label: 'Our Process', href: '/process', description: 'From discovery to support' },
      { label: 'Careers', href: '/careers', description: 'Open roles and how to apply' },
      { label: 'FAQs', href: '/faq', description: 'Engagement, timelines, and handover' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    mega: true,
    children: [
      { label: 'All services', href: '/services', description: 'Full capability overview' },
      ...services.map((item) => ({
        label: item.title,
        href: item.href,
        description: item.summary,
      })),
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    mega: true,
    children: [
      { label: 'All solutions', href: '/solutions', description: 'ERP, CRM, commerce and more' },
      ...solutions.map((item) => ({
        label: item.title,
        href: item.href,
        description: item.summary,
      })),
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    mega: true,
    children: [
      { label: 'All industries', href: '/industries', description: 'Sectors we know well' },
      ...industries.map((item) => ({
        label: item.title,
        href: item.href,
        description: item.summary,
      })),
    ],
  },
  {
    label: 'Work',
    href: '/portfolio',
    children: [
      { label: 'Portfolio', href: '/portfolio', description: 'Selected delivery examples' },
      { label: 'Technologies', href: '/technologies', description: 'Stacks we ship with' },
      { label: 'Blogs', href: '/blogs', description: 'Practical delivery notes' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Contact Us', href: '/contact', description: 'Start a conversation' },
      { label: 'Get a Quote', href: '/get-quote', description: 'Share scope and budget' },
    ],
  },
];

export const mobileHomeLink: NavItem = { label: 'Home', href: '/' };

export function allContentPaths() {
  return [
    '/about',
    '/why-us',
    '/process',
    '/faq',
    '/services',
    ...services.map((item) => item.href),
    '/solutions',
    ...solutions.map((item) => item.href),
    '/industries',
    ...industries.map((item) => item.href),
    '/portfolio',
    '/technologies',
    '/blogs',
    '/careers',
    '/contact',
    '/get-quote',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/refund-policy',
    '/disclaimer',
  ];
}
