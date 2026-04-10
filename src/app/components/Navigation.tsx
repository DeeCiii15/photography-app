'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const onHero = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  /** Lora, small caps label style (aligned with site eyebrows, slightly looser tracking for words) */
  const linkClass = onHero
    ? 'font-body rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/95 transition hover:bg-white/15 hover:text-white xl:px-3.5 xl:tracking-[0.2em]'
    : 'font-body rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral transition hover:bg-coral/12 hover:text-coral-dark dark:text-[#e8c4a8] dark:hover:bg-white/10 dark:hover:text-[#f2dcc4] xl:px-3.5 xl:tracking-[0.2em]';

  const mobileLinkClass =
    'touch-manipulation rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream-dark active:bg-boho-sage/15 dark:text-cream';

  const navSurface = onHero
    ? 'border-transparent bg-transparent'
    : 'border-b border-boho-sage/25 bg-[#faf8f4]/90 shadow-soft backdrop-blur-lg dark:border-boho-stone/40 dark:bg-boho-bark/90';

  const desktopPill = onHero
    ? 'border-white/30 bg-white/15 shadow-sm backdrop-blur-lg dark:border-white/20 dark:bg-black/25'
    : 'border-coral/25 bg-white/70 shadow-soft backdrop-blur-md dark:border-[#c9a574]/35 dark:bg-boho-bark/75';

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 overflow-x-hidden transition-all duration-300 ${navSurface}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="relative flex h-14 max-h-14 shrink-0 items-center justify-between gap-3 overflow-hidden md:h-16 md:max-h-16">
          <Link
            href="/"
            className="group flex min-w-0 max-w-[min(100%,14rem)] shrink-0 flex-col justify-center gap-0.5 sm:max-w-[16rem] md:max-w-[18rem]"
          >
            {onHero ? (
              <span className="font-script text-2xl leading-none text-white drop-shadow-md transition-opacity group-hover:opacity-90 md:text-[1.85rem]">
                Taylor Rose Reels
              </span>
            ) : !logoError ? (
              <div className="relative h-9 w-[7.25rem] max-w-[42vw] sm:h-10 sm:w-[8.25rem] md:h-11 md:w-[9.5rem]">
                <Image
                  src="/images/logo-v2.png"
                  alt="Taylor Rose Reels"
                  fill
                  className="object-contain object-left transition-opacity group-hover:opacity-85"
                  sizes="(max-width: 768px) 120px, 152px"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="font-script text-2xl text-coral transition-opacity group-hover:opacity-85 dark:text-[#e8c4a8] md:text-[1.85rem]">
                Taylor Rose Reels
              </span>
            )}
          </Link>

          <div className="absolute left-1/2 hidden max-w-[min(44rem,calc(100vw_-_9rem))] -translate-x-1/2 lg:flex lg:justify-center">
            <div
              className={`flex max-w-full flex-nowrap items-center justify-center gap-0 rounded-full border px-2 py-1 font-body ${desktopPill}`}
            >
              <Link href="/#about" className={linkClass}>
                About
              </Link>
              <Link href="/portfolio" className={linkClass}>
                Portfolio
              </Link>
              <Link href="/pricing" className={linkClass}>
                Pricing
              </Link>
              <Link href="/experience" className={linkClass}>
                Experience
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`touch-manipulation shrink-0 rounded-full p-3 transition hover:bg-coral/10 dark:hover:bg-white/10 lg:hidden ${onHero ? 'text-white hover:bg-white/15' : 'text-coral hover:bg-coral/10 dark:text-[#e8c4a8] dark:hover:bg-white/10'}`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className={`border-t pb-6 lg:hidden ${onHero ? 'border-white/20' : 'border-dusty-rose/25 dark:border-boho-stone/40'}`}
          >
            <div className="mt-4 flex flex-col gap-0.5 rounded-2xl border border-boho-sage/25 bg-white/95 p-3 font-body shadow-sm backdrop-blur-md dark:border-boho-stone/40 dark:bg-boho-bark/90">
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                About
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Portfolio
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Pricing
              </Link>
              <Link
                href="/experience"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Experience
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
