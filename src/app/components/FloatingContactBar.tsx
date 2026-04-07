'use client';

import { socialLinks } from '@/lib/social';

const iconWrapMobile =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-light ring-1 ring-dusty-rose/45 text-coral transition-colors hover:bg-coral/15 hover:ring-coral/40 active:scale-95 dark:bg-gray-800 dark:ring-gray-600 dark:text-cream dark:hover:bg-gray-700';

const iconWrapDesktop = 'text-cream-dark transition-colors hover:text-coral dark:text-cream';

function SocialIcons({ mobile }: { mobile: boolean }) {
  const wrap = mobile ? iconWrapMobile : iconWrapDesktop;
  const size = mobile ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={wrap}
      >
        <svg className={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={wrap}
      >
        <svg className={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a
        href={socialLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className={wrap}
      >
        <svg className={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </>
  );
}

export default function FloatingContactBar() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-8 lg:right-12">
      {/* Mobile: compact contact pill + separate social chip */}
      <div className="flex w-[min(100vw-2rem,20rem)] flex-col gap-2 sm:hidden">
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-dusty-rose/50 bg-white/95 px-4 py-2.5 shadow-soft-lg ring-1 ring-dusty-rose/20 backdrop-blur-md dark:border-gray-600 dark:bg-gray-900/95 dark:ring-gray-700/30">
          <a
            href="tel:+1234567890"
            aria-label="Call (123) 456-7890"
            className="flex min-h-[44px] min-w-[44px] cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-xl bg-cream-light/80 px-3 text-sm font-semibold text-cream-dark transition-colors hover:bg-coral/15 dark:bg-gray-800 dark:text-cream"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call</span>
          </a>
          <div className="h-8 w-px bg-dusty-rose/50 dark:bg-gray-600" aria-hidden />
          <a
            href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
            aria-label="Email hello@taylorrosereels.com"
            className="flex min-h-[44px] min-w-[44px] cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-xl bg-cream-light/80 px-3 text-sm font-semibold text-cream-dark transition-colors hover:bg-coral/15 dark:bg-gray-800 dark:text-cream"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email</span>
          </a>
        </div>
        <div
          className="flex items-center justify-center gap-2 rounded-2xl border border-dusty-rose/50 bg-white/95 px-3 py-2 shadow-soft ring-1 ring-dusty-rose/20 backdrop-blur-md dark:border-gray-600 dark:bg-gray-900/95 dark:ring-gray-700/30"
          role="group"
          aria-label="Social media"
        >
          <SocialIcons mobile />
        </div>
      </div>

      {/* Desktop / sm+: single row */}
      <div className="hidden max-w-[min(100%,calc(100vw-2rem))] sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-4 sm:rounded-full sm:border sm:border-dusty-rose/50 sm:bg-white/95 sm:px-5 sm:py-3 sm:shadow-soft-lg sm:ring-1 sm:ring-dusty-rose/30 sm:backdrop-blur-md dark:sm:border-gray-700 dark:sm:bg-gray-900/95 dark:sm:ring-gray-700/30">
        <a
          href="tel:+1234567890"
          aria-label="Call (123) 456-7890"
          className="flex cursor-pointer touch-manipulation items-center gap-2.5 text-cream-dark font-medium hover:text-coral transition-colors dark:text-cream"
        >
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>(123) 456-7890</span>
        </a>
        <div className="h-6 w-px shrink-0 bg-dusty-rose dark:bg-gray-600" aria-hidden />
        <a
          href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
          aria-label="Email hello@taylorrosereels.com"
          className="flex cursor-pointer touch-manipulation items-center gap-2.5 text-cream-dark font-medium hover:text-coral transition-colors dark:text-cream"
        >
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>hello@taylorrosereels.com</span>
        </a>
        <div className="h-6 w-px shrink-0 bg-dusty-rose dark:bg-gray-600" aria-hidden />
        <div className="flex items-center gap-4">
          <SocialIcons mobile={false} />
        </div>
      </div>
    </div>
  );
}
