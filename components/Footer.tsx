import Link from 'next/link';
import { Logo } from '@/components/Logo';

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
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
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <div className="flex flex-wrap items-center gap-4">
              <Logo />
              <div>
                <p className="font-semibold text-white">A&amp;M FutureTech Solutions Pvt. Ltd.</p>
                <p className="mt-1 text-sm tracking-[0.16em] text-cyan-300">Innovate | Integrate | Elevate</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-slate-300">
              We build secure, scalable, high-performance digital products for businesses ready to grow with modern technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Company</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>Software Development</li>
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>UI/UX Design</li>
              <li>Cloud Solutions</li>
              <li>IT Consulting</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>A&amp;M FutureTech Solution Pvt Ltd</li>
              <li>
                <a href="mailto:info@amfuturetech.com" className="text-cyan-300">
                  info@amfuturetech.com
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3 text-white">
              {socials.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs font-bold"
                >
                  {platform.label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
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
