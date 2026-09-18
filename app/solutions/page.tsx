import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { solutions } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Business Solutions',
  description: 'ERP, HRMS, inventory, WMS, CRM, ecommerce and custom business portals from A&M FutureTech.',
  path: '/solutions',
  keywords: ['ERP', 'HRMS', 'CRM', 'inventory management', 'business software'],
});

export default function SolutionsPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Business solutions</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Solutions designed for sharper operations and stronger growth.</h1>
        </div>
      </section>

      <section className="section-shell surface-alt">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <div key={solution.slug} className="card-panel p-6">
              <h2 className="text-2xl font-bold text-[var(--text)]">{solution.title}</h2>
              <p className="mt-4 text-[var(--text-soft)]">{solution.summary}</p>
              <div className="mt-5 space-y-3 text-sm text-[var(--text)]">
                <div><span className="font-semibold">Features:</span> {solution.features.join(', ')}</div>
                <div><span className="font-semibold">Outcomes:</span> {solution.outcomes.join(', ')}</div>
              </div>
              <Link href={solution.href} className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--link)] hover:underline">
                View solution <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
