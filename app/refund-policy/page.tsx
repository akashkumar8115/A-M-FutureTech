import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Refund Policy',
  description: 'Refund, invoicing, and commercial billing terms for A&M FutureTech engagements.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Refund policy</span>
          <h1 className="section-title mt-6">Refund Policy</h1>
          <div className="mt-8 space-y-5 text-[var(--text-soft)]">
            <p>Discovery calls and website enquiries are complimentary. Paid work is billed according to the approved proposal, milestone plan, or retainer agreement.</p>
            <p>Because software, design, and consulting work is custom, fees for completed milestones are generally non-refundable. If a milestone has not started, unused prepaid value may be reviewed in writing.</p>
            <p>Any refund, credit, or pause in work must be agreed by both parties and documented by email. Chargebacks initiated without first contacting us may delay resolution.</p>
            <p>Questions: <a href="mailto:info@amfuturetech.com" className="text-[var(--link)]">info@amfuturetech.com</a>.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
