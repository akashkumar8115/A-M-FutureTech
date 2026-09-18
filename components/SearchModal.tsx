'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import type { SearchItem } from '@/lib/search';

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSearch(value: string) {
    setQuery(value);
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const result = await response.json();
      setItems(Array.isArray(result.items) ? result.items : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const grouped = useMemo(() => items, [items]);

  return (
    <>
      <button type="button" className="icon-btn" aria-label="Search the website" onClick={() => { setOpen(true); void runSearch(''); }}>
        <Search size={16} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[80] p-4 backdrop-blur-sm" style={{ background: 'var(--overlay)' }} onClick={() => setOpen(false)}>
          <div className="search-modal mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <Search size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => runSearch(event.currentTarget.value)}
                placeholder="Search pages, services, solutions and blogs"
                className="border-0 bg-transparent shadow-none focus:ring-0"
              />
              <button type="button" className="icon-btn !h-9 !w-9" onClick={() => setOpen(false)} aria-label="Close search">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[24rem] overflow-y-auto p-3">
              {loading && <p className="px-3 py-4 text-sm text-[var(--text-soft)]">Searching...</p>}
              {!loading && grouped.length === 0 && <p className="px-3 py-4 text-sm text-[var(--text-soft)]">No matching results.</p>}
              {grouped.map((item) => (
                <Link
                  key={`${item.type}-${item.href}-${item.title}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--link)]">{item.type}</p>
                  <p className="mt-1 font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
