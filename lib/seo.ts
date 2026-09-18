import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${options.path}`;
  const fullTitle = options.title.includes('A&M FutureTech') ? options.title : `${options.title} | A&M FutureTech`;
  const title = options.title.replace(/\s*\|\s*A&M FutureTech$/, '');

  return {
    title,
    description: options.description,
    keywords: options.keywords,
    alternates: { canonical: url },
    robots: options.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: options.description,
      url,
      siteName: 'A&M FutureTech',
      type: options.type || 'website',
      images: options.image ? [{ url: options.image }] : [{ url: '/logo.png', width: 900, height: 665, alt: 'A&M FutureTech Solution Pvt Ltd' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: options.description,
      images: options.image ? [options.image] : ['/logo.png'],
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A&M FutureTech Solution Pvt Ltd',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: 'info@amfuturetech.com',
    sameAs: [],
    description: 'Software, web, mobile, cloud and IT services for modern businesses.',
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'A&M FutureTech',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blogs?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
