import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function OfferingDetail({
  eyebrow,
  title,
  intro,
  features,
  audience,
  outcomes,
  process,
  backHref,
  backLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  features: string[];
  audience: string[];
  outcomes: string[];
  process: string[];
  backHref: string;
  backLabel: string;
}) {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <Link href={backHref} className="text-sm text-[var(--link)] hover:underline">{backLabel}</Link>
          <p className="badge mt-6">{eyebrow}</p>
          <h1 className="section-title mt-6">{title}</h1>
          <p className="section-subtitle mt-4 max-w-3xl">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-quote" className="primary-btn">Request a quote <ArrowRight size={16} /></Link>
            <Link href="/contact" className="secondary-btn">Talk to us</Link>
          </div>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container grid gap-6 lg:grid-cols-3">
          <article className="card-panel p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold">What we deliver</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[var(--text-soft)]">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--link)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="card-panel p-6">
            <h2 className="text-xl font-bold">Who it is for</h2>
            <ul className="mt-4 space-y-3 text-[var(--text-soft)]">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card-panel p-6">
            <h2 className="text-xl font-bold">Outcomes</h2>
            <ul className="mt-4 space-y-3 text-[var(--text-soft)]">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-[var(--link)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="card-panel p-6 lg:col-span-2">
            <h2 className="text-xl font-bold">How we work</h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {process.map((item, index) => (
                <li key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--chip)] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--link)]">Step {index + 1}</p>
                  <p className="mt-2 font-semibold">{item}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>
    </main>
  );
}
