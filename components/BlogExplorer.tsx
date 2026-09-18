'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blogs';

export function BlogExplorer({ posts, initialQuery = '' }: { posts: BlogPost[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesQuery = !q || `${post.title} ${post.excerpt} ${post.tags.join(' ')} ${post.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <>
      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_220px]">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles, topics or tags" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <article key={post.slug} className="card-panel overflow-hidden">
            <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--link)]">{post.category}</p>
              <h2 className="mt-3 text-2xl font-bold">{post.title}</h2>
              <p className="mt-3 text-[var(--text-soft)]">{post.excerpt}</p>
              <Link href={`/blogs/${post.slug}`} className="mt-5 inline-flex font-semibold text-[var(--link)] hover:underline">
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-10 text-center text-[var(--text-soft)]">No articles match that search.</p>}
    </>
  );
}
