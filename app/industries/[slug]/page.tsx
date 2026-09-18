import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getIndustry, industries } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return industries.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return pageMetadata({ title: 'Industry', description: 'Industries we serve.', path: `/industries/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: `${industry.title} technology solutions`,
    description: industry.summary,
    path: industry.href,
    keywords: [industry.title, 'IT solutions', 'custom software'],
  });
}

export default function IndustryDetailPage({ params }: Props) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <Link href="/industries" className="text-sm text-[var(--link)] hover:underline">Back to industries</Link>
          <p className="badge mt-6">Industry</p>
          <h1 className="section-title mt-6">{industry.title}</h1>
          <p className="section-subtitle mt-4">{industry.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-quote" className="primary-btn">Discuss a project <ArrowRight size={16} /></Link>
            <Link href="/contact" className="secondary-btn">Contact us</Link>
          </div>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            ['Typical challenges', industry.challenges],
            ['What we build', industry.capabilities],
            ['Business outcomes', industry.outcomes],
          ].map(([heading, items]) => (
            <article key={heading as string} className="card-panel p-6">
              <h2 className="text-xl font-bold">{heading as string}</h2>
              <ul className="mt-4 space-y-3 text-[var(--text-soft)]">
                {(items as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-[var(--link)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
