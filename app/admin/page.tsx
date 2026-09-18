'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bell, Briefcase, FileText, LogOut, Mail, Quote } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

type Row = Record<string, string>;
type Notification = { id: string; type: string; createdAt: string; read: boolean; data: Row };

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<'contact' | 'quote' | 'careers' | 'blogs'>('contact');
  const [data, setData] = useState<{
    contacts: Row[];
    quotes: Row[];
    careers: Row[];
    blogs: Array<{ title: string; slug: string; category: string }>;
    notifications: Notification[];
    unread: number;
  } | null>(null);

  async function load() {
    const response = await fetch('/api/admin/data');
    const result = await response.json();
    setData(result);
  }

  useEffect(() => {
    void load();
  }, []);

  const rows: Row[] = useMemo(() => {
    if (!data) return [];
    if (tab === 'contact') return data.contacts;
    if (tab === 'quote') return data.quotes;
    if (tab === 'careers') return data.careers;
    return data.blogs.map((blog) => ({ Title: blog.title, Slug: blog.slug, Category: blog.category }));
  }, [data, tab]);

  const headers = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Operations</p>
            <h1 className="mt-4 text-4xl font-black">Admin dashboard</h1>
          </div>
          <div className="flex gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="secondary-btn"
              onClick={async () => {
                await fetch('/api/admin/data', { method: 'POST' });
                await load();
              }}
            >
              <Bell size={16} /> Mark notifications read
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                window.location.href = '/admin/login';
              }}
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="card-panel p-5">
            <Mail size={20} className="text-[var(--link)]" />
            <p className="mt-4 text-3xl font-black">{data?.contacts.length || 0}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Contact Enquiries</p>
          </div>
          <div className="card-panel p-5">
            <Quote size={20} className="text-[var(--link)]" />
            <p className="mt-4 text-3xl font-black">{data?.quotes.length || 0}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Quote Requests</p>
          </div>
          <div className="card-panel p-5">
            <Briefcase size={20} className="text-[var(--link)]" />
            <p className="mt-4 text-3xl font-black">{data?.careers.length || 0}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Career Applications</p>
          </div>
          <div className="card-panel p-5">
            <FileText size={20} className="text-[var(--link)]" />
            <p className="mt-4 text-3xl font-black">{data?.blogs.length || 0}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Published Blogs</p>
          </div>
        </div>

        <section className="card-panel mt-8 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Notifications</h2>
            <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm text-[var(--link)]">{data?.unread || 0} new</span>
          </div>
          <div className="mt-5 space-y-3">
            {(data?.notifications || []).map((item) => (
              <div key={item.id} className="rounded-xl border border-[var(--border)] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--link)]">{item.type} {item.read ? '' : '· new'}</p>
                <p className="mt-2 font-semibold">{item.data['Full Name'] || 'Submission'}</p>
                <p className="text-sm text-[var(--text-soft)]">{item.createdAt}</p>
              </div>
            ))}
            {!data?.notifications?.length && <p className="text-[var(--text-soft)]">No submissions yet. New form entries will appear here.</p>}
          </div>
        </section>

        <section className="card-panel mt-8 overflow-hidden p-6">
          <div className="flex flex-wrap gap-3">
            {[
              ['contact', 'Contact Enquiries'],
              ['quote', 'Quote Requests'],
              ['careers', 'Career Applications'],
              ['blogs', 'Blogs'],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setTab(id as typeof tab)} className={`rounded-full px-4 py-2 text-sm ${tab === id ? 'bg-blue-500 on-accent' : 'secondary-btn !min-h-0'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="border-b border-[var(--border)] px-3 py-3 font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    {headers.map((header) => (
                      <td key={header} className="max-w-xs truncate border-b border-[var(--border)] px-3 py-3">{row[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length && <p className="mt-6 text-[var(--text-soft)]">No rows in this sheet yet. Connect the Google Sheets webhook to sync live data.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
