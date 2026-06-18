'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TESTIMONIALS, TESTIMONIAL_DECK_STYLES } from '@/lib/testimonialsData';
import TestimonialLightbox from './TestimonialLightbox';

function TestimonialDeckChevron({ dir }: { dir: -1 | 1 }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir < 0 ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

type TestimonialsSectionProps = {
  id?: string;
  showContactCta?: boolean;
};

export default function TestimonialsSection({
  id = 'testimonials',
  showContactCta = true,
}: TestimonialsSectionProps) {
  const testimonialDeckRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollTestimonialDeck = useCallback((dir: -1 | 1) => {
    const el = testimonialDeckRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.72, 420) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = testimonialDeckRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= max - 1;
      if (e.deltaY > 0 && atEnd) return;
      if (e.deltaY < 0 && atStart) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[#e0d9ce] bg-[#f4f1eb] px-6 pt-20 dark:border-boho-stone/40 dark:bg-boho-ink sm:px-10 lg:px-16 lg:pt-28 ${
        showContactCta ? 'pb-0' : 'pb-20 lg:pb-28'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-boho-sage">Heard here first</p>
          <h2 className="mt-4 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem]">
            What they still{' '}
            <span className="italic text-coral">talk about</span>
          </h2>
          <p className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/65">
            A few favorites from brides, couples, & mamas who trusted me with
            their chapters. Tap a card to read the full review.
          </p>
        </div>
        <div
          className="relative mt-14 -mx-2 sm:-mx-4"
          role="region"
          aria-label="Client testimonials — scroll horizontally"
        >
          <div className="pointer-events-none absolute inset-y-8 left-0 z-10 w-10 bg-gradient-to-r from-[#f4f1eb] via-[#f4f1eb]/90 to-transparent dark:from-boho-ink dark:via-boho-ink/90 sm:w-14 md:w-16" />
          <div className="pointer-events-none absolute inset-y-8 right-0 z-10 w-10 bg-gradient-to-l from-[#f4f1eb] via-[#f4f1eb]/90 to-transparent dark:from-boho-ink dark:via-boho-ink/90 sm:w-14 md:w-16" />

          <button
            type="button"
            onClick={() => scrollTestimonialDeck(-1)}
            className="font-display absolute left-0 top-[55%] z-20 flex h-10 w-10 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-[#d4cdc0]/80 bg-[#faf8f4]/90 text-coral shadow-sm backdrop-blur-[2px] transition hover:border-coral/30 hover:bg-white/95 dark:border-boho-stone/50 dark:bg-boho-bark/85 dark:text-[#d4a574] sm:left-1 sm:h-11 sm:w-11"
            aria-label="Scroll testimonials back"
          >
            <TestimonialDeckChevron dir={-1} />
          </button>
          <button
            type="button"
            onClick={() => scrollTestimonialDeck(1)}
            className="font-display absolute right-0 top-[55%] z-20 flex h-10 w-10 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-[#d4cdc0]/80 bg-[#faf8f4]/90 text-coral shadow-sm backdrop-blur-[2px] transition hover:border-coral/30 hover:bg-white/95 dark:border-boho-stone/50 dark:bg-boho-bark/85 dark:text-[#d4a574] sm:right-1 sm:h-11 sm:w-11"
            aria-label="Scroll testimonials forward"
          >
            <TestimonialDeckChevron dir={1} />
          </button>

          <div
            ref={testimonialDeckRef}
            className="scrollbar-hide flex scroll-smooth snap-x snap-mandatory sm:snap-proximity gap-0 overflow-x-auto overflow-y-visible overscroll-x-contain px-12 pb-4 pt-6 [scroll-padding-inline:max(1rem,6vw)] [-webkit-overflow-scrolling:touch] [touch-action:pan-x_pan-y] sm:px-14 sm:pb-6 sm:pt-8 sm:[touch-action:manipulation] md:px-16 md:pb-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <button
                key={`${t.name}-${i}`}
                type="button"
                style={{ zIndex: i + 1 }}
                onClick={() => setActiveIndex(i)}
                className={`w-[min(82vw,19.5rem)] shrink-0 snap-center overflow-visible rounded-2xl bg-[#faf8f4]/92 p-6 text-left shadow-[0_12px_36px_rgba(61,52,44,0.08)] ring-1 ring-[#e8e3db]/90 transition-[transform,box-shadow] duration-500 ease-out will-change-transform hover:z-30 hover:scale-[1.02] hover:shadow-[0_18px_44px_rgba(61,52,44,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral dark:bg-boho-bark/48 dark:shadow-[0_12px_36px_rgba(0,0,0,0.22)] dark:ring-boho-stone/30 dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.28)] sm:w-[20.5rem] sm:p-7 md:w-[21rem] ${i > 0 ? '-ml-7 sm:-ml-9 md:-ml-11' : ''} ${TESTIMONIAL_DECK_STYLES[i % TESTIMONIAL_DECK_STYLES.length]}`}
                aria-label={`Read full review from ${t.name}`}
              >
                <p className="font-body line-clamp-[9] text-[0.9rem] font-light italic leading-relaxed text-cream-dark/90 dark:text-cream/88 sm:text-[0.9375rem]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-5 border-t border-dusty-rose/30 pt-4 dark:border-boho-stone/45">
                  <cite className="font-display not-italic text-base text-coral dark:text-[#d4a574] sm:text-lg">
                    {t.name}
                  </cite>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.14em] text-cream-dark/55 dark:text-cream/50 sm:text-xs">
                    {t.detail}
                  </p>
                </footer>
              </button>
            ))}
          </div>
        </div>

        {activeIndex !== null ? (
          <TestimonialLightbox
            testimonials={TESTIMONIALS}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        ) : null}

        {showContactCta && (
          <div className="mt-12 mb-12 flex w-full justify-center lg:mb-14">
            <Link
              href="/contact"
              className="font-display inline-flex min-h-12 min-w-[10.5rem] touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-white/70 px-10 py-4 text-center text-xl leading-none text-coral shadow-soft transition hover:border-coral/40 hover:bg-white sm:text-2xl dark:border-boho-stone/45 dark:bg-boho-bark/60 dark:text-coral dark:hover:bg-boho-bark"
            >
              Reach Out
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
