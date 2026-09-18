import { faqs } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Frequently Asked Questions',
  description: 'Answers about starting a project, timelines, integrations, source code and post-launch support with A&M FutureTech.',
  path: '/faq',
  keywords: ['IT FAQ', 'software project questions', 'A&M FutureTech'],
});

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Help</span>
          <h1 className="section-title mt-6">Questions teams usually ask first.</h1>
          <p className="section-subtitle mt-4">
            If you need a scoped proposal, send a quote request. These answers cover how we typically work.
          </p>
        </div>
      </section>
      <section className="section-shell surface-alt">
        <div className="container max-w-4xl space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
