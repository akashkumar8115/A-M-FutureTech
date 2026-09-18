import type { Metadata } from 'next';
import { BlogExplorer } from '@/components/BlogExplorer';
import { getBlogs } from '@/lib/blogs';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: 'Blogs & Insights',
  description: 'Practical articles on custom software, cloud, ERP, mobile apps, SEO and secure digital delivery from A&M FutureTech.',
  path: '/blogs',
  keywords: ['IT blogs', 'software development articles', 'cloud migration', 'ERP insights', 'A&M FutureTech'],
});

export default async function BlogsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const posts = await getBlogs();

  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Insights</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Ideas, delivery notes, and technology guidance.</h1>
          <p className="section-subtitle mx-auto mt-4">
            Search and filter our latest writing on software, cloud, operations, and digital growth.
          </p>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container">
          <BlogExplorer posts={posts} initialQuery={searchParams?.q || ''} />
        </div>
      </section>
    </main>
  );
}
