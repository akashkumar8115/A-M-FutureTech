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
                  ? 'border-blue-500 bg-blue-500/15 text-blue-200'
                  : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-blue-500 hover:text-blue-200'
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
            <div className="h-56 w-full bg-gradient-to-br from-blue-500/50 via-slate-900 to-violet-500/40" />
            <div className="p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">{project.category}</span>
              <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
              <p className="mt-3 text-slate-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                Discuss this project <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-8 text-center text-slate-400">No projects found in this category yet.</p>
      )}
    </>
  );
}
