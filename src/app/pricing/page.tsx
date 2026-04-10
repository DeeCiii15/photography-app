import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import Link from 'next/link';
import { INVESTMENT_CATEGORIES } from '@/lib/pricingData';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <section className="scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow text-boho-sage">
              Investment · Clear &amp; kind
            </p>
            <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]">
              Numbers with{' '}
              <span className="italic font-normal text-coral">kindness</span>{' '}
              behind them
            </h1>
            <p className="mt-5 font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 sm:text-base md:leading-[1.78]">
              Starting places for weddings, elopements, couples, portraits, and
              events—then we tailor once I know your plans. Every rate below can
              be adjusted for travel, extra hours, or add-ons.
            </p>
          </div>
        </section>

        <section className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 md:gap-10">
            {INVESTMENT_CATEGORIES.map((cat, i) => {
              const galleryHref = `/portfolio?category=${encodeURIComponent(cat.portfolioCategory)}`;
              return (
                <div
                  key={`${cat.name}-${i}`}
                  className={`relative rounded-2xl border bg-[#faf8f4]/92 p-8 shadow-[0_12px_36px_rgba(61,52,44,0.06)] ring-1 ring-[#e8e3db]/90 backdrop-blur-sm dark:bg-boho-bark/48 dark:shadow-[0_12px_36px_rgba(0,0,0,0.2)] dark:ring-boho-stone/30 md:p-10 lg:p-12 ${
                    cat.featured
                      ? 'border-coral/35 shadow-soft-lg ring-coral/15 dark:border-coral/35 dark:ring-coral/20'
                      : 'border-[#e0d9ce] dark:border-boho-stone/40'
                  } ${i % 2 === 1 ? 'lg:ml-10' : i % 2 === 0 && i > 0 ? 'lg:mr-8' : ''}`}
                >
                  {cat.featured && (
                    <span className="absolute -top-3 left-4 rounded-full bg-coral px-4 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:left-10">
                      Most booked
                    </span>
                  )}
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl font-medium tracking-[0.04em] text-boho-sage sm:text-2xl md:text-[1.85rem]">
                        {cat.name}
                      </p>
                      <h2 className="mt-2 font-display text-3xl font-medium text-cream-dark dark:text-cream md:text-4xl">
                        {cat.tagline}
                      </h2>
                      <p className="mt-3 font-display text-2xl text-coral dark:text-[#d4a574] md:text-[1.75rem]">
                        {cat.startingAt}
                      </p>
                      <p className="mt-1 font-body text-sm font-medium text-cream-dark/70 dark:text-cream/65">
                        {cat.coverage}
                      </p>
                      <p className="mt-5 max-w-xl font-body text-base font-light leading-[1.78] text-cream-dark/82 dark:text-cream/78 md:text-lg">
                        {cat.description}
                      </p>
                      {cat.highlights && cat.highlights.length > 0 && (
                        <ul className="mt-6 space-y-2.5 font-body text-sm leading-relaxed text-cream-dark/80 dark:text-cream/76 md:text-base">
                          {cat.highlights.map((line) => (
                            <li key={line} className="flex gap-3">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral/75"
                                aria-hidden
                              />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
                      <Link
                        href="/contact"
                        className="font-display inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-coral px-8 py-3.5 text-center text-lg text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg dark:border-boho-stone/45 sm:w-auto"
                      >
                        Inquire
                      </Link>
                      <Link
                        href={galleryHref}
                        className="font-display inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-full border border-[#d4cdc0]/90 bg-white/80 px-8 py-3.5 text-center text-lg text-coral transition hover:border-coral/35 hover:bg-white dark:border-boho-stone/50 dark:bg-boho-bark/70 dark:text-[#d4a574] dark:hover:bg-boho-bark sm:w-auto"
                      >
                        See work
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f4f1eb] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-ink sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/90 p-8 shadow-[0_12px_36px_rgba(61,52,44,0.06)] ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark/45 dark:ring-boho-stone/25 md:p-12">
            <h2 className="font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
              What you can usually expect
            </h2>
            <p className="mt-3 max-w-2xl font-body text-sm font-light leading-relaxed text-cream-dark/75 dark:text-cream/70 md:text-base">
              Exact deliverables depend on your collection—this is the spirit of
              how I work across every session type.
            </p>
            <ul className="mt-8 grid gap-5 font-body text-cream-dark/85 dark:text-cream/82 sm:grid-cols-2">
              {[
                "My full attention while we're together",
                'Carefully edited high-resolution images',
                'A private online gallery to share with your people',
                'Delivery within a few weeks (rush options when you need them)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral/80"
                    aria-hidden
                  />
                  <span className="leading-[1.75]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
