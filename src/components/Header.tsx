'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/colour-match', label: 'Colour Mixing' },
  { href: '/building-advisor', label: '✨ AI Colour Advisor', isSpecial: true },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: 'https://wa.me/2347066443082', label: 'Contact', isExternal: true },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-brand-primary-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20 gap-4">
          
          {/* Company Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 py-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-secondary-dark via-brand-secondary to-blue-400 flex items-center justify-center font-black text-white text-base shadow-md shadow-brand-secondary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-brand-secondary/40 shrink-0 border border-white/20">
              AP
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight whitespace-nowrap group-hover:text-brand-secondary-light transition-colors">
                AJIBAZ PAINT
              </span>
              <span className="text-brand-secondary text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase leading-none whitespace-nowrap mt-0.5">
                NIGERIA LIMITED
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.isSpecial) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-blue-600 text-white ring-1 ring-blue-300 shadow-md'
                        : 'bg-blue-500/15 text-blue-200 hover:text-white hover:bg-blue-500/25 border border-blue-400/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  className={`px-2.5 py-2 text-sm rounded-lg whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white font-bold ring-1 ring-white/30 shadow-sm backdrop-blur-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/quote"
              className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-brand-secondary to-blue-500 hover:from-blue-500 hover:to-brand-secondary text-white font-bold text-sm py-2 px-4 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Get a Quote
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-brand-primary-dark/98 border-t border-white/10 backdrop-blur-xl animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-brand-secondary to-blue-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg border border-white/20"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
