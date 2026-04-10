'use client';

import { useEffect, useState } from 'react';
import { getSocialLinks } from '@/lib/siteSocial';
import { SocialHubIcon, SocialNetworkIcon } from './SocialMediaIcons';

/** Smartphone outline — reads clearly at small sizes (stroke matches mail icon) */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="6.75"
        y="3.25"
        width="10.5"
        height="17.5"
        rx="2.25"
        ry="2.25"
        stroke="currentColor"
        strokeWidth={1.35}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M9.25 5.85h5.5"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M10.25 18.35h3.5"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
    </svg>
  );
}

/**
 * Front-facing rose — wavy petal crown, round body, inner cup, spiral, stem + two leaves.
 */
function RoseLineIcon({ className }: { className?: string }) {
  const sw = 1.45;
  const swFine = 1.2;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 16.55v4.9"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M10.35 17.25c-2.6-1-3.95.15-4.1 1.45-.12 1 1.15 1.85 2.95 1.25"
        stroke="currentColor"
        strokeWidth={swFine}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M13.65 18.6c2.65 1.2 4.15.25 4.3-1 .14-1.05-1.25-1.95-3.15-1.3"
        stroke="currentColor"
        strokeWidth={swFine}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Wavy crown + wide base — reads clearly as a flower, not abstract lines */}
      <path
        d="M12 16.55 10.55 16.15C8.35 15.6 7 13.65 7 11.05 7 8.15 8.75 5.9 10.65 5.45 10.9 4.35 11.45 3.75 12.05 4.35 12.65 3.75 13.2 4.35 13.45 5.45 15.35 5.9 17 8.15 17 11.05 17 13.65 15.65 15.6 13.45 16.15L12 16.55z"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M9.1 10.05Q12 7.35 14.9 10.05"
        stroke="currentColor"
        strokeWidth={swFine}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.9}
      />
      <path
        d="M12.85 6.15c-.15-1-.95-1.6-1.75-1.25-.55.25-.75.95-.35 1.4.5.55 1.35.4 1.65-.25.2-.4.05-.9-.35-1.05"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Linen-fold envelope — gentle curves, same weight as phone */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 8.2 12 14l8-5.8"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5.2 6.5h13.6c.7 0 1.3.6 1.3 1.3v8.4c0 .7-.6 1.3-1.3 1.3H5.2c-.7 0-1.3-.6-1.3-1.3V7.8c0-.7.6-1.3 1.3-1.3Z"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M4 17.3 9.2 12"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
      <path
        d="M20 17.3 14.8 12"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
    </svg>
  );
}

function IconMat({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-boho-sage/30 bg-gradient-to-br from-[#faf8f4] to-[#ebe8df] text-coral shadow-[0_1px_0_rgba(255,255,253,0.8)_inset] dark:border-boho-stone/50 dark:from-boho-bark dark:to-boho-ink dark:text-[#e8b896] sm:h-7 sm:w-7">
      {children}
    </span>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function DesktopSocialRow() {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <>
      <span
        className="mx-2 hidden h-4 w-px shrink-0 bg-dusty-rose/45 dark:bg-boho-stone/45 sm:block"
        aria-hidden
      />
      <div className="flex shrink-0 items-center justify-center gap-1 sm:justify-start sm:gap-0 sm:pr-1">
        {links.map((link) => (
          <a
            key={link.network}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 transition hover:bg-boho-sage/15 active:bg-boho-sage/20 dark:hover:bg-white/10 sm:min-h-0 sm:min-w-0 sm:rounded-full sm:p-1"
          >
            <IconMat>
              <SocialNetworkIcon
                network={link.network}
                className="h-[15px] w-[15px]"
              />
            </IconMat>
          </a>
        ))}
      </div>
    </>
  );
}

/** sm+ — horizontal pill with phone, email, socials */
function DesktopRibbon() {
  return (
    <div className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-3 right-3 z-50 hidden sm:bottom-6 sm:left-auto sm:right-6 sm:block">
      <div className="pointer-events-auto mx-auto flex w-full max-w-full flex-col rounded-2xl border border-boho-sage/25 bg-white/70 py-2 pl-2 pr-2 shadow-sm backdrop-blur-md dark:border-boho-stone/45 dark:bg-boho-ink/55 sm:w-max sm:min-w-[min(100%,28.5rem)] sm:max-w-[calc(100vw-0.75rem)] sm:flex-row sm:items-center sm:rounded-full sm:border-boho-sage/25 sm:bg-white/55 sm:py-1.5 sm:pl-1.5 sm:pr-1.5 sm:dark:bg-boho-ink/50">
        <a
          href="tel:+1234567890"
          aria-label="Call (123) 456-7890"
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-2 py-2 transition hover:bg-boho-sage/15 active:bg-boho-sage/20 dark:hover:bg-white/10 sm:min-h-0 sm:justify-start sm:rounded-full sm:py-1 sm:pl-1 sm:pr-2"
        >
          <IconMat>
            <PhoneIcon className="h-[15px] w-[15px]" />
          </IconMat>
          <span className="whitespace-nowrap font-body text-sm font-medium leading-tight text-cream-dark dark:text-cream sm:text-xs">
            (123) 456-7890
          </span>
        </a>
        <span
          className="mx-2 hidden h-4 w-px shrink-0 bg-dusty-rose/45 dark:bg-boho-stone/45 sm:block"
          aria-hidden
        />
        <div
          className="h-px w-full bg-dusty-rose/35 dark:bg-boho-stone/40 sm:hidden"
          aria-hidden
        />
        <a
          href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
          aria-label="Email hello@taylorrosereels.com"
          className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2 transition hover:bg-boho-sage/15 active:bg-boho-sage/20 dark:hover:bg-white/10 sm:min-h-0 sm:justify-start sm:rounded-full sm:py-1 sm:pl-1 sm:pr-2"
        >
          <IconMat>
            <MailIcon className="h-[15px] w-[15px]" />
          </IconMat>
          <span className="min-w-0 break-all text-center font-body text-xs font-medium leading-snug text-coral dark:text-[#e8b896] sm:break-normal sm:text-left sm:text-xs sm:leading-tight">
            hello@taylorrosereels.com
          </span>
        </a>
        <DesktopSocialRow />
      </div>
    </div>
  );
}

const fabBubbleClass =
  'pointer-events-auto flex h-14 w-14 shrink-0 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-white/95 text-coral shadow-lg backdrop-blur-md transition-all duration-200 dark:border-boho-stone/50 dark:bg-boho-bark/90 dark:text-[#e8b896] active:scale-95';

/** Mobile: one FAB expands into social + contact; sheets unchanged */
function MobileContactRibbons() {
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const socialLinks = getSocialLinks();
  const hasSocials = socialLinks.length > 0;
  const sheetOpen = contactOpen || socialOpen;

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactOpen(false);
        setSocialOpen(false);
        setFabMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!fabMenuOpen || sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFabMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fabMenuOpen, sheetOpen]);

  const openContact = () => {
    setSocialOpen(false);
    setFabMenuOpen(false);
    setContactOpen(true);
  };

  const openSocial = () => {
    setContactOpen(false);
    setFabMenuOpen(false);
    setSocialOpen(true);
  };

  const closeFabMenu = () => setFabMenuOpen(false);

  return (
    <div className="sm:hidden">
      {/* Dim + tap outside to collapse speed-dial (sheets use their own scrims) */}
      <div
        className={`fixed inset-0 z-40 bg-[#2a231c]/40 transition-opacity duration-200 dark:bg-black/50 ${
          fabMenuOpen && !sheetOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!fabMenuOpen || sheetOpen}
        onClick={closeFabMenu}
      />

      {/* Branch layout: both satellites share bottom-right with main; translate = diagonal “twigs” */}
      <div
        className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-3 z-50 h-[min(9.25rem,calc(100dvh-6rem))] w-[min(8.75rem,calc(100vw-1.5rem))]"
        role="group"
        aria-label="Contact and social"
      >
        <div className="pointer-events-none relative h-full w-full">
          {fabMenuOpen && (
            <>
              {hasSocials && (
                <button
                  type="button"
                  onClick={openSocial}
                  aria-label="Open social links"
                  className={`absolute bottom-0 right-0 z-[5] origin-bottom-right -translate-x-[1.95rem] -translate-y-[4.65rem] ${fabBubbleClass}`}
                >
                  <SocialHubIcon className="h-6 w-6" />
                </button>
              )}
              <button
                type="button"
                onClick={openContact}
                aria-label="Open contact options"
                className={`absolute bottom-0 right-0 z-[5] origin-bottom-right ${hasSocials ? '-translate-x-[4.45rem] -translate-y-[1.2rem]' : '-translate-x-[3.85rem] -translate-y-[2.65rem]'} ${fabBubbleClass}`}
              >
                <PhoneIcon className="h-6 w-6" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setFabMenuOpen((o) => !o)}
            aria-expanded={fabMenuOpen}
            aria-haspopup="true"
            aria-label={fabMenuOpen ? 'Close quick actions' : 'Open quick actions'}
            className={`absolute bottom-0 right-0 z-10 ${fabBubbleClass}`}
          >
            {fabMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <RoseLineIcon className="h-9 w-9" />
            )}
          </button>
        </div>
      </div>

      {hasSocials && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-[#2a231c]/40 transition-opacity duration-300 dark:bg-black/50 ${
              socialOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!socialOpen}
            onClick={() => setSocialOpen(false)}
          />

          <div
            className={`fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-[#e0d9ce] bg-[#faf8f4]/98 shadow-[0_-8px_40px_rgba(61,52,44,0.15)] transition-transform duration-300 ease-out dark:border-boho-stone/40 dark:bg-boho-bark/98 ${
              socialOpen
                ? 'pointer-events-auto translate-y-0'
                : 'pointer-events-none translate-y-full'
            }`}
            style={{
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Social media"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#e0d9ce]/80 bg-[#faf8f4]/95 px-4 py-3 backdrop-blur-sm dark:border-boho-stone/35 dark:bg-boho-bark/95">
              <p className="font-display text-xl text-cream-dark dark:text-cream">
                Follow along
              </p>
              <button
                type="button"
                onClick={() => setSocialOpen(false)}
                className="touch-manipulation rounded-full p-2.5 text-coral transition hover:bg-boho-sage/15 dark:text-[#e8b896] dark:hover:bg-white/10"
                aria-label="Close social panel"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-3 py-4">
              {socialLinks.map((link) => (
                <a
                  key={link.network}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSocialOpen(false)}
                  className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-boho-sage/12 active:bg-boho-sage/18 dark:hover:bg-white/10"
                >
                  <IconMat>
                    <SocialNetworkIcon
                      network={link.network}
                      className="h-[15px] w-[15px]"
                    />
                  </IconMat>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-cream-dark/55 dark:text-cream/50">
                      {link.label}
                    </p>
                    <p className="truncate font-body text-base font-medium text-coral dark:text-[#e8b896]">
                      {link.href.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        className={`fixed inset-0 z-40 bg-[#2a231c]/40 transition-opacity duration-300 dark:bg-black/50 ${
          contactOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!contactOpen}
        onClick={() => setContactOpen(false)}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-[#e0d9ce] bg-[#faf8f4]/98 shadow-[0_-8px_40px_rgba(61,52,44,0.15)] transition-transform duration-300 ease-out dark:border-boho-stone/40 dark:bg-boho-bark/98 ${
          contactOpen
            ? 'pointer-events-auto translate-y-0'
            : 'pointer-events-none translate-y-full'
        }`}
        style={{
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Contact Taylor Rose Reels"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[#e0d9ce]/80 bg-[#faf8f4]/95 px-4 py-3 backdrop-blur-sm dark:border-boho-stone/35 dark:bg-boho-bark/95">
          <p className="font-display text-xl text-cream-dark dark:text-cream">
            Get in touch
          </p>
          <button
            type="button"
            onClick={() => setContactOpen(false)}
            className="touch-manipulation rounded-full p-2.5 text-coral transition hover:bg-boho-sage/15 dark:text-[#e8b896] dark:hover:bg-white/10"
            aria-label="Close contact panel"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-3 py-4">
          <a
            href="tel:+1234567890"
            onClick={() => setContactOpen(false)}
            className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-boho-sage/12 active:bg-boho-sage/18 dark:hover:bg-white/10"
          >
            <IconMat>
              <PhoneIcon className="h-[15px] w-[15px]" />
            </IconMat>
            <div className="min-w-0">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-cream-dark/55 dark:text-cream/50">
                Call
              </p>
              <p className="font-body text-base font-medium text-cream-dark dark:text-cream">
                (123) 456-7890
              </p>
            </div>
          </a>
          <a
            href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
            onClick={() => setContactOpen(false)}
            className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-boho-sage/12 active:bg-boho-sage/18 dark:hover:bg-white/10"
          >
            <IconMat>
              <MailIcon className="h-[15px] w-[15px]" />
            </IconMat>
            <div className="min-w-0">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-cream-dark/55 dark:text-cream/50">
                Email
              </p>
              <p className="break-all font-body text-base font-medium text-coral dark:text-[#e8b896]">
                hello@taylorrosereels.com
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactRibbon() {
  return (
    <>
      <DesktopRibbon />
      <MobileContactRibbons />
    </>
  );
}
