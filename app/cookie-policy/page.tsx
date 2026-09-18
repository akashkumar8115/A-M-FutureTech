import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Cookie Policy',
  description: 'How A&M FutureTech uses cookies and similar technologies on this website.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Cookie policy</span>
          <h1 className="section-title mt-6">Cookie Policy</h1>
          <div className="mt-8 space-y-5 text-[var(--text-soft)]">
            <p>This website may use essential cookies to keep the site working, remember theme preference, and protect the admin session. Analytics or performance cookies, if enabled, help us understand which pages are useful.</p>
            <p>You can control or block cookies in your browser settings. Disabling some cookies may affect form recovery, theme memory, or dashboard login.</p>
            <p>By continuing to use the site, you agree to this cookie use as described here and in our Privacy Policy.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
