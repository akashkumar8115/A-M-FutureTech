import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfferingDetail } from '@/components/OfferingDetail';
import { getService, services } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.slug);
  if (!service) return pageMetadata({ title: 'Service', description: 'A&M FutureTech services.', path: `/services/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: service.href,
    keywords: [service.title, ...service.features.slice(0, 4)],
  });
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <OfferingDetail
      eyebrow="Service"
      title={service.title}
      intro={service.intro}
      features={service.features}
      audience={service.audience}
      outcomes={service.outcomes}
      process={service.process}
      backHref="/services"
      backLabel="Back to all services"
    />
  );
}
