import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { whyUsPoints } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Why Choose Us',
  description: 'Why businesses work with A&M FutureTech for custom software, websites, mobile apps and cloud systems.',
  path: '/why-us',
  keywords: ['IT company India', 'custom software partner', 'A&M FutureTech'],
});

export default function WhyUsPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Company</span>
          <h1 className="section-title mt-6">Why teams choose A&M FutureTech.</h1>
          <p className="section-subtitle mt-4">
            We combine product thinking with engineering discipline: scoped delivery, readable systems, and support after launch.
          </p>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyUsPoints.map(([title, desc]) => (
            <article key={title} className="card-panel p-6">
              <CheckCircle2 className="text-[var(--link)]" size={22} />
              <h2 className="mt-4 text-xl font-bold">{title}</h2>
              <p className="mt-3 text-[var(--text-soft)]">{desc}</p>
            </article>
          ))}
        </div>
        <div className="container mt-10">
          <Link href="/contact" className="primary-btn">Talk to the team</Link>
        </div>
      </section>
    </main>
  );
}
