import Link from 'next/link';

type PortfolioBackLinkProps = {
  href: string;
  label: string;
};

export default function PortfolioBackLink({
  href,
  label,
}: PortfolioBackLinkProps) {
  return (
    <Link
      href={href}
      className="font-display inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-[#d4cdc0]/80 bg-[#faf8f4]/90 px-7 py-3 text-xl text-coral shadow-sm backdrop-blur-[2px] transition hover:border-coral/30 hover:bg-white dark:border-boho-stone/50 dark:bg-boho-bark/85 dark:text-[#d4a574] sm:w-fit sm:justify-start sm:px-8 sm:text-2xl"
    >
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </Link>
  );
}
