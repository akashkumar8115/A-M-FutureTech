import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'A&M FutureTech Solution Pvt Ltd | IT Solutions & Software Development',
  description:
    'A&M FutureTech Solution Pvt Ltd delivers innovative software, web, mobile, cloud, and complete IT services for modern businesses.',
  keywords: [
    'IT solutions',
    'software development',
    'web development',
    'mobile app development',
    'cloud solutions',
    'ERP',
    'A&M FutureTech',
  ],
  openGraph: {
    title: 'A&M FutureTech Solution Pvt Ltd',
    description:
      'Innovative software, web, mobile and cloud solutions designed to help businesses grow.',
    url: siteUrl,
    siteName: 'A&M FutureTech',
    type: 'website',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
