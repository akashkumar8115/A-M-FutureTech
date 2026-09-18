import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteShell } from '@/components/SiteShell';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'A&M FutureTech Solution Pvt Ltd | Software, Web, Mobile & Cloud',
    template: '%s | A&M FutureTech',
  },
  description:
    'A&M FutureTech Solution Pvt Ltd delivers custom software, websites, mobile apps, ERP, cloud, and complete IT services for modern businesses.',
  keywords: [
    'IT solutions',
    'software development company',
    'web development',
    'mobile app development',
    'cloud solutions',
    'ERP development',
    'A&M FutureTech',
  ],
  openGraph: {
    title: 'A&M FutureTech Solution Pvt Ltd',
    description: 'Custom software, web, mobile and cloud solutions designed to help businesses grow.',
    url: siteUrl,
    siteName: 'A&M FutureTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A&M FutureTech Solution Pvt Ltd',
    description: 'Custom software, web, mobile and cloud solutions designed to help businesses grow.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
