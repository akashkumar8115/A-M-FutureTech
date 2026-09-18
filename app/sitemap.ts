import type { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const blogs = await getBlogs();

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/solutions',
    '/portfolio',
    '/technologies',
    '/industries',
    '/blogs',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/refund-policy',
    '/disclaimer',
  ];

  return [
    ...staticRoutes.map((path) => ({ url: `${baseUrl}${path || '/'}`, lastModified: new Date() })),
    ...blogs.map((post) => ({ url: `${baseUrl}/blogs/${post.slug}`, lastModified: new Date(post.publishedAt) })),
  ];
}
