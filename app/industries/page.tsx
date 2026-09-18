import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { industries } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Industries We Serve',
  description: 'Software and digital systems for construction, logistics, retail, healthcare, education, manufacturing and more.',
  path: '/industries',
  keywords: ['industry IT solutions', 'construction software', 'retail technology'],
});

export default function IndustriesPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Industries</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Industries We Serve</h1>
        </div>
      </section>

      <section className="section-shell surface-alt">
        <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry) => (
            <Link key={industry.slug} href={industry.href} className="card-panel p-6 text-center text-[var(--text)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-[var(--link)]">
                <CheckCircle2 size={22} />
              </div>
              <p className="text-lg font-semibold text-[var(--text)]">{industry.title}</p>
              <p className="mt-3 text-sm text-[var(--text-soft)]">{industry.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
