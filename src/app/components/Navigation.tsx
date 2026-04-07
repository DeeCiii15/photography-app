'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCalendly } from './CalendlyEmbed';
import Image from 'next/image';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCalendly } = useCalendly();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 overflow-x-hidden transition-all duration-300 ${
        scrolled
          ? 'bg-cream-light shadow-soft dark:bg-gray-900'
          : 'bg-cream-light shadow-soft dark:bg-gray-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-3 h-20 md:h-28 relative">
          <Link
            href="/"
            className="group relative flex min-w-0 max-w-[min(100%,14rem)] md:max-w-none shrink items-center"
          >
            {/* Logo - falls back to text if image doesn't exist */}
            {!logoError ? (
              <div className="relative flex h-14 w-auto items-center md:h-20 lg:h-24">
                <Image
                  src="/images/logo-v2.png"
                  alt="Taylor Rose Reels"
                  width={1200}
                  height={96}
                  className="h-14 w-auto max-h-14 origin-left scale-[1.35] object-contain object-left transition-opacity group-hover:opacity-80 md:h-20 md:max-h-none md:origin-center md:scale-[1.75] lg:h-24 md:object-center"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="text-2xl font-display font-bold text-cream-dark dark:text-cream group-hover:text-coral dark:group-hover:text-cream transition-colors">
                Taylor Rose Reels
              </span>
            )}
          </Link>
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 font-display">
            <Link
              href="/#about"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Portfolio
            </Link>
            <Link
              href="/pricing"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              FAQ
            </Link>
            <Link
              href="/#contact"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Contact
            </Link>
            <span className="text-lg text-cream-dark/50 dark:text-cream/50">|</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openCalendly();
              }}
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2 whitespace-nowrap cursor-pointer"
            >
              Upcoming Events
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden shrink-0 -mr-1 rounded-lg p-2 text-cream-dark hover:bg-black/[0.04] dark:text-cream dark:hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dusty-rose/40 bg-cream-light/50 px-3 pb-5 pt-3 dark:border-gray-600 dark:bg-gray-950/40">
            <div className="overflow-hidden rounded-2xl border border-dusty-rose/40 bg-white/95 shadow-soft-lg ring-1 ring-black/[0.04] backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900/95 dark:ring-white/5">
              <nav className="font-display p-2" aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  <li>
                    <Link
                      href="/#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-medium text-cream-dark transition-colors hover:bg-coral/10 active:bg-coral/15 dark:text-cream dark:hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/12 text-coral dark:bg-white/10 dark:text-cream">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-medium text-cream-dark transition-colors hover:bg-coral/10 active:bg-coral/15 dark:text-cream dark:hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/12 text-coral dark:bg-white/10 dark:text-cream">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-medium text-cream-dark transition-colors hover:bg-coral/10 active:bg-coral/15 dark:text-cream dark:hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/12 text-coral dark:bg-white/10 dark:text-cream">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-medium text-cream-dark transition-colors hover:bg-coral/10 active:bg-coral/15 dark:text-cream dark:hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/12 text-coral dark:bg-white/10 dark:text-cream">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-medium text-cream-dark transition-colors hover:bg-coral/10 active:bg-coral/15 dark:text-cream dark:hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/12 text-coral dark:bg-white/10 dark:text-cream">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="mt-2 border-t border-dusty-rose/30 p-2 pt-3 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      openCalendly();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-coral-dark px-4 py-3.5 text-base font-semibold text-white shadow-md transition-transform active:scale-[0.98]"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upcoming Events
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

