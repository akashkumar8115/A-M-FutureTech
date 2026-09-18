'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { SearchModal } from '@/components/SearchModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { mobileHomeLink, navItems, type NavItem } from '@/lib/navigation';

function isActive(pathname: string, href: string, children?: NavItem['children']) {
  if (href === '/') return pathname === '/';
  if (pathname === href || pathname.startsWith(`${href}/`)) return true;
  return children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)) ?? false;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const menuItems = [mobileHomeLink, ...navItems];

  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container flex items-center gap-3 py-2.5 lg:gap-4 lg:py-3">
        <Link href="/" aria-label="A&M FutureTech home" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <Logo size="md" priority />
        </Link>

        <nav className="desktop-nav ml-2 hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:gap-1.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <div key={item.label} className={`nav-item ${['Industries', 'Work', 'Contact'].includes(item.label) ? 'nav-item-end' : ''}`}>
              <Link
                href={item.href}
                className={`nav-link ${isActive(pathname, item.href, item.children) ? 'is-active' : ''}`}
              >
                {item.label}
                {item.children ? <ChevronDown size={14} className="nav-caret" /> : null}
              </Link>
              {item.children ? (
                <div className={`nav-panel ${item.mega ? 'nav-panel-mega' : ''}`}>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="nav-sublink">
                      <span>{child.label}</span>
                      {child.description ? <small>{child.description}</small> : null}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchModal />
          <ThemeToggle />
          <Link href="/get-quote" className="secondary-btn !hidden !min-h-10 !px-3 !py-2 !text-xs sm:!inline-flex lg:!px-4 lg:!text-sm">
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((state) => !state)}
            className="icon-btn lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav lg:hidden ${mobileOpen ? 'is-open' : ''}`}>
        <nav className="container flex flex-col gap-1 py-3 text-sm" aria-label="Mobile">
          {menuItems.map((item) => {
            const expanded = openGroup === item.label;
            if (!item.children) {
              return (
                <Link key={item.href} href={item.href} className="mobile-link">
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.label} className="mobile-group">
                <div className="flex items-center gap-1">
                  <Link href={item.href} className="mobile-link flex-1">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className="icon-btn !h-10 !w-10 shrink-0"
                    aria-expanded={expanded}
                    aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                    onClick={() => setOpenGroup(expanded ? null : item.label)}
                  >
                    <ChevronDown size={16} className={`transition ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {expanded ? (
                  <div className="mobile-sub">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="mobile-sublink">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <Link href="/get-quote" className="primary-btn mt-3 !w-full sm:!hidden">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
