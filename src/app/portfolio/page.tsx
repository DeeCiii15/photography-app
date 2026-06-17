'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import PortfolioHomeGallery from '../components/PortfolioHomeGallery';
import PortfolioPhotoGrid from '../components/PortfolioPhotoGrid';
import PortfolioShootGrid from '../components/PortfolioShootGrid';
import {
  getCategoryByName,
  getShootCards,
  getShootPhotos,
} from '@/lib/portfolioData';

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const selectedShoot = searchParams.get('shoot');

  const category = selectedCategory
    ? getCategoryByName(selectedCategory)
    : undefined;
  const shootCards = selectedCategory ? getShootCards(selectedCategory) : [];
  const photos =
    selectedCategory && selectedShoot
      ? getShootPhotos(selectedCategory, selectedShoot)
      : [];

  const backHref = selectedShoot && selectedCategory
    ? `/portfolio?category=${encodeURIComponent(selectedCategory)}`
    : '/portfolio';

  const backLabel = selectedShoot
    ? `Back to ${selectedCategory}`
    : 'Back to all galleries';

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
                  Click any card to wander deeper.
                </p>
              </div>
              <PortfolioHomeGallery variant="portfolio" />
            </div>
          </section>
        ) : (
          <section
            className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-20"
            aria-label={selectedShoot ? selectedCategory ?? 'Gallery' : selectedCategory}
          >
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
                <button
                  type="button"
                  onClick={() => router.push(backHref)}
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
                  {backLabel}
                </button>
                <div className="text-left sm:text-right">
                  {!selectedShoot ? (
                    <>
                      <p className="section-eyebrow text-boho-sage sm:text-right">
                        Gallery
                      </p>
                      <h1 className="mt-2 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem]">
                        {selectedCategory}
                      </h1>
                      {category?.description ? (
                        <p className="mt-3 max-w-md font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68 sm:ml-auto sm:text-right">
                          {category.description}
                        </p>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>

              {selectedShoot ? (
                <PortfolioPhotoGrid photos={photos} />
              ) : (
                <PortfolioShootGrid
                  shoots={shootCards}
                  categoryName={selectedCategory}
                />
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
