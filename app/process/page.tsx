import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Process',
  description: 'How A&M FutureTech discovers, designs, builds, tests, deploys and supports digital products.',
  path: '/process',
  keywords: ['software development process', 'IT delivery', 'A&M FutureTech'],
});

export default function ProcessPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Delivery</span>
          <h1 className="section-title mt-6">A clear path from idea to production.</h1>
          <p className="section-subtitle mt-4">
            We do not disappear into a long build. Each stage has an owner, an artifact, and a decision so you always know what happens next.
          </p>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container max-w-4xl space-y-4">
          {processSteps.map((step, index) => (
            <article key={step.title} className="card-panel grid gap-4 p-6 md:grid-cols-[7rem_1fr] md:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-black on-accent">
                0{index + 1}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{step.title}</h2>
                <p className="mt-2 text-[var(--text-soft)]">{step.detail}</p>
              </div>
            </article>
          ))}
          <div className="pt-4">
            <Link href="/get-quote" className="primary-btn">Start with a quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
