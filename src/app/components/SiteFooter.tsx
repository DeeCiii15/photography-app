'use client';

import { getSocialLinks } from '@/lib/siteSocial';
import { SocialNetworkIcon } from './SocialMediaIcons';

/** Centered brand footer — matches home page */
export default function SiteFooter() {
  const socialLinks = getSocialLinks();

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
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-boho-sage/30 bg-gradient-to-br from-[#faf8f4] to-[#ebe8df] text-coral shadow-[0_1px_0_rgba(255,255,253,0.8)_inset] transition hover:border-boho-sage/45 hover:bg-boho-sage/10 active:bg-boho-sage/15 dark:border-boho-stone/50 dark:from-boho-bark dark:to-boho-ink dark:text-[#e8b896] dark:hover:bg-white/10"
              >
                <SocialNetworkIcon
                  network={link.network}
                  className="h-[17px] w-[17px]"
                />
              </a>
            ))}
          </div>
        )}
        <p className="text-xs text-cream-dark/50 dark:text-cream/45">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
