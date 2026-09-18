import type { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/blogs';
import { allContentPaths } from '@/lib/navigation';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const blogs = await getBlogs();

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    ...allContentPaths().map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })),
    ...blogs.map((post) => ({ url: `${baseUrl}/blogs/${post.slug}`, lastModified: new Date(post.publishedAt) })),
  ];
}
