import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'Website terms, proposal conditions, and commercial engagement rules for A&M FutureTech.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Terms</span>
          <h1 className="section-title mt-6">Terms & Conditions</h1>
          <div className="mt-8 space-y-5 text-[var(--text-soft)]">
            <p>By using this website you agree that published information is for general guidance and does not create a contract until both parties approve a written proposal, statement of work, or service agreement.</p>
            <p>All estimates, timelines, and recommendations remain subject to discovery, scope confirmation, and commercial approval. Intellectual property, source code, and deliverables transfer only as defined in the signed engagement documents.</p>
            <p>You are responsible for providing accurate project information, timely feedback, and lawful use of any materials you submit through our forms.</p>
            <p>We may update website content, service descriptions, and these terms without prior notice. Continued use of the site after changes constitutes acceptance of the revised terms.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
