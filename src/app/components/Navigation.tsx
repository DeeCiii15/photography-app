'use client';

import { useState, useEffect } from 'react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-soft dark:bg-gray-900/98'
          : 'bg-white/95 backdrop-blur-md shadow-soft dark:bg-gray-900/95'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center h-24 md:h-28 relative">
          <a
            href="/"
            className="group relative flex items-center"
          >
            {/* Logo - falls back to text if image doesn't exist */}
            {!logoError ? (
              <div className={`relative h-16 md:h-20 lg:h-24 w-auto flex items-center overflow-visible ${scrolled ? 'bg-cream-light/98 dark:bg-gray-900/98' : 'bg-cream-light/95 dark:bg-gray-900/95'} rounded-lg px-2`}>
                <Image
                  src="/images/logo-v2.png"
                  alt="Taylor Rose Reels"
                  width={1200}
                  height={96}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain object-center transition-opacity group-hover:opacity-80"
                  priority
                  style={{ maxHeight: '96px', width: 'auto', transform: 'scale(1.75)', transformOrigin: 'center center' }}
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="text-2xl font-display font-bold text-cream-dark dark:text-cream group-hover:text-coral dark:group-hover:text-cream transition-colors">
                Taylor Rose Reels
              </span>
            )}
          </a>
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 font-display">
            <a
              href="/#home"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Home
            </a>
            <a
              href="/#about"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              About
            </a>
            <a
              href="/portfolio"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Portfolio
            </a>
            <a
              href="/pricing"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Pricing
            </a>
            <a
              href="/faq"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              FAQ
            </a>
            <a
              href="/#contact"
              className="text-lg font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors py-2"
            >
              Contact
            </a>
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cream-dark dark:text-cream ml-auto"
            aria-label="Toggle menu"
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
          <div className="md:hidden py-4 border-t border-dusty-rose dark:border-gray-700 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              <a
                href="/#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors"
              >
                Home
              </a>
              <a
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors"
              >
                About
              </a>
              <a
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors"
              >
                Portfolio
              </a>
              <a
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors"
              >
                Pricing
              </a>
              <a
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors"
              >
                FAQ
              </a>
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors"
              >
                Contact
              </a>
              <span className="text-sm text-cream-dark/50 dark:text-cream/50">|</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  openCalendly();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-cream-dark dark:text-cream hover:text-coral dark:hover:text-cream transition-colors cursor-pointer"
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

