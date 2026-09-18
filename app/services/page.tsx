import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { services } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'IT Services',
  description: 'Custom software, websites, mobile apps, cloud, UI/UX, ecommerce and IT consulting from A&M FutureTech.',
  path: '/services',
  keywords: ['custom software', 'web development', 'mobile apps', 'cloud solutions'],
});

export default function ServicesPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Our services</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Technology solutions built for modern businesses.</h1>
          <p className="section-subtitle mx-auto mt-4 max-w-3xl">
            We provide strategy, software engineering, cloud adoption, and support services that help businesses streamline operations and grow with confidence.
          </p>
        </div>
      </section>

      <section className="section-shell surface-alt">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.slug} className="card-panel p-6">
              <h2 className="text-2xl font-bold text-[var(--text)]">{service.title}</h2>
              <p className="mt-4 text-[var(--text-soft)]">{service.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-[var(--text)]">
                {service.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-center gap-2"><ChevronRight size={14} className="text-[var(--link)]" /> {feature}</li>
                ))}
              </ul>
              <Link href={service.href} className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--link)] hover:underline">
                Explore service <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
