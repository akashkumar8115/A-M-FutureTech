'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-data';

const filters = ['All', ...Array.from(new Set(siteConfig.portfolio.map((project) => project.category)))];

export function PortfolioGrid({ showFilters = true }: { showFilters?: boolean }) {
  const [active, setActive] = useState('All');

  const items = useMemo(() => {
    if (active === 'All') {
      return siteConfig.portfolio;
    }

    return siteConfig.portfolio.filter((project) => project.category === active);
  }, [active]);

  return (
    <>
      {showFilters && (
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === filter
                  ? 'border-blue-500 bg-blue-500/15 text-[var(--link)]'
                  : 'border-[var(--border)] bg-[var(--chip)] text-[var(--text)] hover:border-blue-500 hover:text-[var(--link)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((project) => (
          <article key={project.title} className="card-panel overflow-hidden">
            <div className="h-56 w-full bg-gradient-to-br from-blue-500/40 via-[var(--bg-2)] to-violet-500/30" />
            <div className="p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--link)]">{project.category}</span>
              <h3 className="mt-3 text-2xl font-bold text-[var(--text)]">{project.title}</h3>
              <p className="mt-3 text-[var(--text-soft)]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full progress-track px-2.5 py-1 text-xs text-[var(--text)]">
                    {tech}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--link)] hover:underline">
                Discuss this project <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-8 text-center text-[var(--text-soft)]">No projects found in this category yet.</p>
      )}
    </>
  );
}
