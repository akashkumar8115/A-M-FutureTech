import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfferingDetail } from '@/components/OfferingDetail';
import { getSolution, solutions } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) return pageMetadata({ title: 'Solution', description: 'A&M FutureTech solutions.', path: `/solutions/${params.slug}`, noIndex: true });
  return pageMetadata({
    title: solution.title,
    description: solution.summary,
    path: solution.href,
    keywords: [solution.title, ...solution.features.slice(0, 4)],
  });
}

export default function SolutionDetailPage({ params }: Props) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  return (
    <OfferingDetail
      eyebrow="Solution"
      title={solution.title}
      intro={solution.intro}
      features={solution.features}
      audience={solution.audience}
      outcomes={solution.outcomes}
      process={solution.process}
      backHref="/solutions"
      backLabel="Back to all solutions"
    />
  );
}
