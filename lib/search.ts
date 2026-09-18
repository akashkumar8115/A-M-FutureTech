import { siteConfig } from '@/lib/site-data';
import { getBlogs } from '@/lib/blogs';

export type SearchItem = {
  title: string;
  href: string;
  type: 'Page' | 'Service' | 'Solution' | 'Blog';
  description: string;
};

export async function getSearchIndex(): Promise<SearchItem[]> {
  const blogs = await getBlogs();

  const pages: SearchItem[] = [
    { title: 'Home', href: '/', type: 'Page', description: 'A&M FutureTech digital solutions, software, web, mobile and cloud services.' },
    { title: 'About Us', href: '/about', type: 'Page', description: siteConfig.name },
    { title: 'Services', href: '/services', type: 'Page', description: 'End-to-end technology services for modern businesses.' },
    { title: 'Solutions', href: '/solutions', type: 'Page', description: 'ERP, HRMS, inventory, CRM and custom business platforms.' },
    { title: 'Portfolio', href: '/portfolio', type: 'Page', description: 'Selected work and digital delivery examples.' },
    { title: 'Technologies', href: '/technologies', type: 'Page', description: 'React, Next.js, Java, cloud, mobile and database stacks.' },
    { title: 'Industries', href: '/industries', type: 'Page', description: 'Industries we serve across India and global teams.' },
    { title: 'Careers', href: '/careers', type: 'Page', description: 'Open roles at A&M FutureTech.' },
    { title: 'Blogs', href: '/blogs', type: 'Page', description: 'Insights on software, cloud, SEO, mobile apps and digital growth.' },
    { title: 'Contact', href: '/contact', type: 'Page', description: 'Start a project or request a consultation.' },
    { title: 'Privacy Policy', href: '/privacy-policy', type: 'Page', description: 'How we handle personal and business data.' },
    { title: 'Terms & Conditions', href: '/terms', type: 'Page', description: 'Website and engagement terms.' },
    { title: 'Cookie Policy', href: '/cookie-policy', type: 'Page', description: 'How cookies are used on this website.' },
    { title: 'Refund Policy', href: '/refund-policy', type: 'Page', description: 'Commercial refund and billing terms.' },
    { title: 'Disclaimer', href: '/disclaimer', type: 'Page', description: 'Informational disclaimer for website content.' },
  ];

  const services = siteConfig.serviceCards.map((service) => ({
    title: service.title,
    href: '/services',
    type: 'Service' as const,
    description: service.description,
  }));

  const solutions = siteConfig.solutions.map((solution) => ({
    title: solution.name,
    href: '/solutions',
    type: 'Solution' as const,
    description: solution.overview,
  }));

  const blogItems = blogs.map((blog) => ({
    title: blog.title,
    href: `/blogs/${blog.slug}`,
    type: 'Blog' as const,
    description: blog.excerpt,
  }));

  return [...pages, ...services, ...solutions, ...blogItems];
}

export function filterSearchIndex(items: SearchItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items.slice(0, 8);
  return items
    .filter((item) => `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(q))
    .slice(0, 12);
}
