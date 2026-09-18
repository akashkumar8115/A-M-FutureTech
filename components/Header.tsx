'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { SearchModal } from '@/components/SearchModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { siteConfig } from '@/lib/site-data';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container flex items-center justify-between py-3.5">
        <Link href="/" aria-label="A&M FutureTech home" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-4 text-[13px] font-medium xl:flex xl:gap-6 xl:text-sm">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-1 py-1.5 transition duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-cyan-300 after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <SearchModal />
          <ThemeToggle />
          <Link href="/#quote" className="secondary-btn !px-5 !py-3 !text-sm">
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <div className="flex items-center gap-2 md:hidden">
            <SearchModal />
            <ThemeToggle />
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((state) => !state)}
            className="icon-btn"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden overflow-y-auto border-t transition-all duration-300 ease-out xl:hidden ${mobileOpen ? 'pointer-events-auto max-h-[min(36rem,80vh)] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}>
        <nav className="container flex flex-col gap-2 py-4 text-sm">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 transition hover:bg-black/5 dark:hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#quote" onClick={() => setMobileOpen(false)} className="primary-btn mt-2 !w-full">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
