import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Admin',
  description: 'A&M FutureTech operations dashboard.',
  path: '/admin',
  noIndex: true,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
