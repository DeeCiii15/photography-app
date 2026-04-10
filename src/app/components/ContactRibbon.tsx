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
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-boho-sage/30 bg-gradient-to-br from-[#faf8f4] to-[#ebe8df] text-coral shadow-[0_1px_0_rgba(255,255,253,0.8)_inset] dark:border-boho-stone/50 dark:from-boho-bark dark:to-boho-ink dark:text-[#e8b896] sm:h-7 sm:w-7">
      {children}
    </span>
  );
}

/** Fixed pill — stacks on very narrow viewports; sm+ matches original horizontal pill */
export default function ContactRibbon() {
  return (
    <div className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-3 right-3 z-50 sm:bottom-6 sm:left-auto sm:right-6">
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
      </div>
    </div>
  );
}
