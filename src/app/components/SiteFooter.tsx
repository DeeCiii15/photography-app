'use client';

/** Centered brand footer — matches home page */
export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e0d9ce] px-6 py-12 dark:border-boho-stone/40 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center">
          <p className="font-script text-3xl text-coral dark:text-[#d4a574] md:text-4xl">
            Taylor Rose Reels
          </p>
          <p className="mt-3 max-w-md font-body text-xs font-light leading-relaxed text-cream-dark/65 dark:text-cream/60">
            Photography rooted in your inspiration.
          </p>
        </div>
        <p className="text-xs text-cream-dark/50 dark:text-cream/45">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
