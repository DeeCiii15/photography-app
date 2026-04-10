'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '@/lib/siteImages';

const INTERVAL_MS = 6500;
/** Short fade avoids two semi-opaque layers stacking (reads as soft / “blurry”). */
const FADE_MS = 450;

type HomeHeroSlideshowProps = {
  children: ReactNode;
};

export default function HomeHeroSlideshow({ children }: HomeHeroSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-svh w-full">
      <div className="absolute inset-0" aria-hidden>
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 ${
              idx === index ? 'z-[1]' : 'z-0'
            }`}
            style={{
              opacity: idx === index ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-out`,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* unoptimized: serve /public originals — avoids optimizer JPEG recompression softening detail */}
            <Image
              src={slide.src}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
              sizes="100vw"
              unoptimized
              priority={idx === 0}
              fetchPriority={idx === index ? 'high' : 'low'}
            />
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#2a231c]/65 via-[#2a231c]/10 to-[#2a231c]/25"
        aria-hidden
      />
      <div className="relative z-[3]">{children}</div>
    </section>
  );
}
