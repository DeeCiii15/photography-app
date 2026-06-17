'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PortfolioPhoto } from '@/lib/portfolioData';
import {
  getMasonryTiltPosition,
  getScrapbookStyle,
  polaroidImageFrameClass,
} from '@/lib/scrapbookGalleryStyles';
import PortfolioPolaroidLightbox from './PortfolioPolaroidLightbox';

type PortfolioPhotoGridProps = {
  photos: PortfolioPhoto[];
};

export default function PortfolioPhotoGrid({ photos }: PortfolioPhotoGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/92 py-24 text-center shadow-[0_12px_36px_rgba(61,52,44,0.06)] ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark/48 dark:ring-boho-stone/25">
        <p className="text-lg text-cream-dark dark:text-cream">
          I&apos;m still curating this little gallery
        </p>
        <p className="mt-3 text-cream-dark/70 dark:text-cream/70">
          Check back soon—I&apos;m always adding new favorites.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-x-6 gap-y-4 overflow-x-clip sm:columns-2 md:columns-3 md:gap-x-8">
        {photos.map((photo, i) => {
          const { side, row } = getMasonryTiltPosition(i, photos.length, 3);
          const s = getScrapbookStyle(side, row);
          return (
            <div
              key={photo.id}
              className={`group mb-10 w-full max-w-full break-inside-avoid px-1 sm:px-2 ${s.rotate} ${s.push}`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="block w-full cursor-zoom-in text-left transition duration-300 hover:z-10 hover:scale-[1.02] hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
                aria-label={`View larger: ${photo.alt}`}
              >
                <div
                  className={`scrapbook-mat flex w-full max-w-full flex-col overflow-hidden rounded-[2px] bg-[#faf8f4] p-2 ${s.lip} dark:bg-[#2a2622]`}
                >
                  <div className={polaroidImageFrameClass(i)}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {activeIndex !== null ? (
        <PortfolioPolaroidLightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </>
  );
}
