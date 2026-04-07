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
          <div className="md:hidden border-t border-dusty-rose/60 dark:border-gray-600">
            <div className="flex flex-col divide-y divide-dusty-rose/35 font-display dark:divide-gray-700">
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-left text-base font-medium text-cream-dark active:bg-black/[0.03] dark:text-cream dark:active:bg-white/5"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-left text-base font-medium text-cream-dark active:bg-black/[0.03] dark:text-cream dark:active:bg-white/5"
              >
                Portfolio
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-left text-base font-medium text-cream-dark active:bg-black/[0.03] dark:text-cream dark:active:bg-white/5"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-left text-base font-medium text-cream-dark active:bg-black/[0.03] dark:text-cream dark:active:bg-white/5"
              >
                FAQ
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-left text-base font-medium text-cream-dark active:bg-black/[0.03] dark:text-cream dark:active:bg-white/5"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  openCalendly();
                  setMobileMenuOpen(false);
                }}
                className="block w-full cursor-pointer py-3.5 text-left text-base font-medium text-cream-dark active:bg-black/[0.03] dark:text-cream dark:active:bg-white/5"
              >
                Upcoming Events
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

