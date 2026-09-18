import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Disclaimer',
  description: 'Informational disclaimer for the A&M FutureTech website, blogs, and service descriptions.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Disclaimer</span>
          <h1 className="section-title mt-6">Disclaimer</h1>
          <div className="mt-8 space-y-5 text-[var(--text-soft)]">
            <p>Website copy, blogs, case summaries, and service overviews are for general information. They are not legal, financial, tax, or investment advice and should not be treated as a guarantee of specific business results.</p>
            <p>Every project depends on scope, data quality, existing systems, user adoption, and decisions made during delivery. Timelines and estimates shared before discovery are indicative only.</p>
            <p>External links, third-party tools, and partner platforms remain the responsibility of their respective owners.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
