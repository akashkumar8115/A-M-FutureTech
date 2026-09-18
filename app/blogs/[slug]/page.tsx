import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '@/lib/blogs';
import { pageMetadata } from '@/lib/seo';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) return pageMetadata({ title: 'Article not found', description: 'This article is unavailable.', path: `/blogs/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blogs/${post.slug}`,
    keywords: post.tags,
    image: post.image,
    type: 'article',
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    image: post.image,
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-shell">
        <div className="container max-w-4xl">
          <Link href="/blogs" className="text-sm text-[var(--link)]">Back to blogs</Link>
          <p className="badge mt-6">{post.category}</p>
          <h1 className="section-title mt-6">{post.title}</h1>
          <p className="mt-4 text-[var(--text-soft)]">{post.author} · {post.publishedAt}</p>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container max-w-4xl">
          <div className="mb-10 h-72 w-full rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
          <div className="space-y-5 text-lg leading-8 text-[var(--text-soft)]">
            {post.content.split(/\n\n+/).map((paragraph: string) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-sm">{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
