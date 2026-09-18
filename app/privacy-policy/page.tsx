import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How A&M FutureTech Solution Pvt Ltd collects, uses, and protects personal and business information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Privacy policy</span>
          <h1 className="section-title mt-6">Privacy Policy</h1>
          <div className="mt-8 space-y-5 text-[var(--text-soft)]">
            <p>A&M FutureTech Solution Pvt Ltd collects information submitted through contact, quote, career, and related forms to respond to enquiries, evaluate applications, and deliver requested services.</p>
            <p>Typical data includes name, company, job title, email, phone, project details, resume files, and any additional information you choose to share. We also store submission records in operational tools such as email and Google Sheets used by our team.</p>
            <p>We do not sell personal data. Access is limited to team members who need it to respond, hire, or deliver work. We may share information when legally required or when a trusted processor is needed to operate the website.</p>
            <p>You may request access, correction, or deletion of your information by emailing <a href="mailto:info@amfuturetech.com" className="text-[var(--link)]">info@amfuturetech.com</a>.</p>
            <p>This policy may be updated as our services or legal obligations change.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
