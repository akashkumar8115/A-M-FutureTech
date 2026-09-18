import Link from 'next/link';
import { Logo } from '@/components/Logo';

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Facebook', href: 'https://www.facebook.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-2)]">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <div className="flex flex-wrap items-center gap-4">
              <Logo />
              <div>
                <p className="font-semibold text-[var(--text)]">A&amp;M FutureTech Solutions Pvt. Ltd.</p>
                <p className="mt-1 text-sm tracking-[0.16em] text-[var(--link)]">Innovate | Integrate | Elevate</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-[var(--text-soft)]">
              We build secure, scalable, high-performance digital products for businesses ready to grow with modern technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">Company</h3>
            <ul className="mt-4 space-y-3 text-[var(--text-soft)]">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">Services</h3>
            <ul className="mt-4 space-y-3 text-[var(--text-soft)]">
              <li>Software Development</li>
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>UI/UX Design</li>
              <li>Cloud Solutions</li>
              <li>IT Consulting</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">Contact</h3>
            <ul className="mt-4 space-y-3 text-[var(--text-soft)]">
              <li>A&amp;M FutureTech Solution Pvt Ltd</li>
              <li>
                <a href="mailto:info@amfuturetech.com" className="text-[var(--link)]">
                  info@amfuturetech.com
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3 text-[var(--text)]">
              {socials.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--chip)] text-xs font-bold"
                >
                  {platform.label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-soft)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div>© {new Date().getFullYear()} A&amp;M FutureTech Solution Pvt Ltd. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
