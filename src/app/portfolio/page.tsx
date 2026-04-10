'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import {
  PORTFOLIO_GALLERY_BY_CATEGORY,
  PORTFOLIO_HOME_CARDS,
} from '@/lib/portfolioData';
import { SCRAPBOOK_STYLES } from '@/lib/scrapbookGalleryStyles';

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const photos = selectedCategory
    ? (PORTFOLIO_GALLERY_BY_CATEGORY[selectedCategory] || [])
    : [];

  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />
      <HomeStylePageIntro />

      <main id="portfolio-main">
        {!selectedCategory ? (
          <section
            className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-20 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-24"
            aria-label="Portfolio galleries"
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 max-w-xl lg:mb-16">
                <p className="section-eyebrow text-boho-sage">Galleries</p>
                <h1 className="mt-3 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
                  More stories, same light
                </h1>
                <p className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68">
                  Tucked and tilted like a tabletop album—click any card to wander
                  deeper.
                </p>
              </div>
              <div className="columns-1 gap-x-8 gap-y-2 sm:columns-2 lg:columns-3 lg:gap-x-10">
                {PORTFOLIO_HOME_CARDS.map((card, i) => {
                  const s = SCRAPBOOK_STYLES[i % SCRAPBOOK_STYLES.length];
                  return (
                    <Link
                      key={card.name}
                      href={card.href}
                      className={`group mb-10 block break-inside-avoid transition duration-300 hover:z-10 hover:scale-[1.02] hover:rotate-0 ${s.rotate} ${s.push}`}
                    >
                      <div
                        className={`scrapbook-mat rounded-[2px] bg-[#faf8f4] p-2 ${s.lip} dark:bg-[#2a2622]`}
                      >
                        <div
                          className={`relative overflow-hidden bg-[#e8e3db] dark:bg-boho-ink ${
                            i % 3 === 0
                              ? 'aspect-[5/4] min-h-[200px]'
                              : i % 3 === 1
                                ? 'aspect-[4/5] min-h-[220px]'
                                : 'aspect-[3/4] min-h-[190px]'
                          }`}
                        >
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="mt-3 px-1 text-center">
                          <h3 className="font-display text-xl text-cream-dark dark:text-cream">
                            {card.name}
                          </h3>
                          <p className="mt-0.5 font-body text-xs italic text-cream-dark/60 dark:text-cream/55">
                            {card.tagline}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          <section
            className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-20"
            aria-label={selectedCategory}
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
                <button
                  type="button"
                  onClick={() => router.push('/portfolio')}
                  className="font-display inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-[#d4cdc0]/80 bg-[#faf8f4]/90 px-5 py-2.5 text-lg text-coral shadow-sm backdrop-blur-[2px] transition hover:border-coral/30 hover:bg-white dark:border-boho-stone/50 dark:bg-boho-bark/85 dark:text-[#d4a574] sm:w-fit sm:justify-start sm:py-3 sm:text-xl"
                >
                  <svg
                    className="h-4 w-4 shrink-0"
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
                  Back to all galleries
                </button>
                <div className="text-left sm:text-right">
                  <p className="section-eyebrow text-boho-sage sm:text-right">
                    You&apos;re peeking at
                  </p>
                  <h1 className="mt-2 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem]">
                    {selectedCategory}
                  </h1>
                </div>
              </div>

              {photos.length === 0 ? (
                <div className="rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/92 py-24 text-center shadow-[0_12px_36px_rgba(61,52,44,0.06)] ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark/48 dark:ring-boho-stone/25">
                  <p className="text-lg text-cream-dark dark:text-cream">
                    I&apos;m still curating this little gallery
                  </p>
                  <p className="mt-3 text-cream-dark/70 dark:text-cream/70">
                    Check back soon—I&apos;m always adding new favorites.
                  </p>
                </div>
              ) : (
                <div className="columns-1 gap-x-8 gap-y-2 sm:columns-2 lg:columns-3 lg:gap-x-10">
                  {photos.map((photo, i) => {
                    const s = SCRAPBOOK_STYLES[i % SCRAPBOOK_STYLES.length];
                    return (
                      <div
                        key={photo.id}
                        className={`group mb-10 break-inside-avoid ${s.rotate} ${s.push}`}
                      >
                        <div
                          className={`scrapbook-mat rounded-[2px] bg-[#faf8f4] p-2 ${s.lip} dark:bg-[#2a2622]`}
                        >
                          <div
                            className={`relative overflow-hidden bg-[#e8e3db] dark:bg-boho-ink ${
                              i % 3 === 0
                                ? 'aspect-[5/4] min-h-[200px]'
                                : i % 3 === 1
                                  ? 'aspect-[4/5] min-h-[220px]'
                                  : 'aspect-[3/4] min-h-[190px]'
                            }`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              className="object-cover transition duration-500 group-hover:scale-[1.04]"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="mt-3 px-1 text-center">
                            <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-coral">
                              {photo.category}
                            </p>
                            <p className="mt-1 font-display text-lg leading-snug text-cream-dark dark:text-cream">
                              {photo.alt}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
          <Navigation />
          <HomeStylePageIntro />
          <div className="flex items-center justify-center border-t border-[#e0d9ce] bg-[#f9f7f2] py-24 dark:border-boho-stone/40 dark:bg-boho-bark">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#e0d9ce] border-b-coral dark:border-boho-stone dark:border-b-coral/85" />
          </div>
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
