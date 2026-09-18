import { QuoteForm } from '@/components/QuoteForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Get a Quote',
  description: 'Request a software, website, mobile app or cloud quote from A&M FutureTech. Share scope, timeline and budget.',
  path: '/get-quote',
  keywords: ['software quote', 'IT estimate', 'A&M FutureTech'],
});

export default function GetQuotePage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Quote</span>
          <h1 className="section-title mt-6">Tell us what you need built.</h1>
          <p className="section-subtitle mt-4">
            Share goals, current systems, users and timing. We reply with clarifying questions and a practical next step.
          </p>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container max-w-4xl">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
