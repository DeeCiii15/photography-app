'use client';

/** Soft vintage handset — thin stroke, warm line caps (matches boho / film site) */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.5 3.5h3.2c.6 0 1.1.4 1.3 1l1.1 3.4c.1.5 0 1-.3 1.4l-1.5 1.8a12.1 12.1 0 005.2 5.2l1.8-1.5c.4-.3.9-.4 1.4-.3l3.4 1.1c.6.2 1 .7 1 1.3v3.2c0 1.2-1 2.2-2.2 2.2-.2 0-.4 0-.6-.1-9.5-1.6-17.1-9.2-18.7-18.7-.1-.2-.1-.4-.1-.6 0-1.2 1-2.2 2.2-2.2Z"
        stroke="currentColor"
        strokeWidth={1.35}
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
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-boho-sage/30 bg-gradient-to-br from-[#faf8f4] to-[#ebe8df] text-coral shadow-[0_1px_0_rgba(255,255,253,0.8)_inset] dark:border-boho-stone/50 dark:from-boho-bark dark:to-boho-ink dark:text-[#e8b896]">
      {children}
    </span>
  );
}

/** Fixed pill — wide enough for full email; phone segment doesn’t steal width */
export default function ContactRibbon() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto flex w-max max-w-[calc(100vw-0.75rem)] items-center rounded-full border border-boho-sage/25 bg-white/55 py-1 pl-1 pr-1 shadow-sm backdrop-blur-md dark:border-boho-stone/45 dark:bg-boho-ink/50 sm:min-w-[min(100%,28.5rem)] sm:py-1.5 sm:pl-1.5 sm:pr-1.5">
        <a
          href="tel:+1234567890"
          aria-label="Call (123) 456-7890"
          className="flex shrink-0 items-center gap-1.5 rounded-full py-1 pl-1 pr-1.5 transition hover:bg-boho-sage/15 dark:hover:bg-white/10 sm:gap-2 sm:pl-1.5 sm:pr-2"
        >
          <IconMat>
            <PhoneIcon className="h-[15px] w-[15px]" />
          </IconMat>
          <span className="whitespace-nowrap font-body text-xs font-medium leading-tight text-cream-dark dark:text-cream">
            (123) 456-7890
          </span>
        </a>
        <span
          className="mx-0 h-4 w-px shrink-0 bg-dusty-rose/45 dark:bg-boho-stone/45"
          aria-hidden
        />
        <a
          href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
          aria-label="Email hello@taylorrosereels.com"
          className="flex min-w-0 items-center gap-1.5 rounded-full py-1 pl-1 pr-1.5 transition hover:bg-boho-sage/15 dark:hover:bg-white/10 sm:gap-2 sm:pl-1.5 sm:pr-2"
        >
          <IconMat>
            <MailIcon className="h-[15px] w-[15px]" />
          </IconMat>
          <span className="break-all font-body text-[11px] font-medium leading-snug text-coral dark:text-[#e8b896] sm:break-normal sm:text-xs sm:leading-tight">
            hello@taylorrosereels.com
          </span>
        </a>
      </div>
    </div>
  );
}
