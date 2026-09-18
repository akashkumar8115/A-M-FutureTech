import { ContactForm } from '@/components/ContactForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Start a software, web, mobile or cloud project with A&M FutureTech. Share your requirements and budget to get a response from our team.',
  path: '/contact',
  keywords: ['contact A&M FutureTech', 'IT consultation', 'software quote'],
});

export default function ContactPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Contact</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Let’s build your next digital success story.</h1>
        </div>
      </section>

      <section className="section-shell surface-alt">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="card-panel p-8">
            <h2 className="text-2xl font-bold text-[var(--text)]">A&M FutureTech Solution Pvt Ltd</h2>
            <p className="mt-5 text-[var(--text-soft)]">Email: <a href="mailto:info@amfuturetech.com" className="text-[var(--link)]">info@amfuturetech.com</a></p>
            <div className="mt-8 space-y-4 text-[var(--text-soft)]">
              <div><span className="font-semibold text-[var(--text)]">Company:</span> A&M FutureTech Solution Pvt Ltd</div>
              <div><span className="font-semibold text-[var(--text)]">Email:</span> <a href="mailto:info@amfuturetech.com" className="text-[var(--link)]">info@amfuturetech.com</a></div>
              <div><span className="font-semibold text-[var(--text)]">Focus:</span> Software Development, Web, Mobile, Cloud & IT Services</div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
