'use client';

import Navigation from './components/Navigation';
import SiteFooter from './components/SiteFooter';
import TestimonialsSection from './components/TestimonialsSection';
import HomeHeroSlideshow from './components/HomeHeroSlideshow';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';
import { SCRAPBOOK_STYLES } from '@/lib/scrapbookGalleryStyles';
import { SITE_IMAGES } from '@/lib/siteImages';

/**
 * Home: editorial sequence around your inspiration imagery.
 * Type stays small and quiet; photos carry the site.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />

      <main id="home">
        {/* Full-viewport hero — rotating inspiration set */}
        <HomeHeroSlideshow>
          <div className="flex min-h-svh flex-col items-center justify-end px-6 pb-16 pt-28 text-center sm:items-start sm:px-10 sm:pb-20 sm:text-left md:pb-24 lg:px-16">
            <p className="type-eyebrow mx-auto max-w-md text-white/88 sm:mx-0">
              Wedding &amp; portrait · Natural light · The American South
            </p>
            <p className="font-display mx-auto mt-6 max-w-xl text-2xl leading-snug text-white/95 sm:mx-0 sm:text-3xl md:text-[2.15rem]">
              Soft light, honest color, frames that feel like memory.
            </p>
            <div className="mx-auto mt-6 flex w-full max-w-md flex-row flex-wrap justify-center gap-2 sm:mt-10 sm:mx-0 sm:max-w-none sm:justify-start sm:gap-3 md:flex-row">
              <Link
                href="/portfolio"
                className="font-body inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center border border-white/40 bg-white/95 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3d342c] transition hover:bg-white sm:min-h-11 sm:w-auto sm:flex-none sm:px-6 sm:py-3 md:tracking-[0.2em]"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="font-body inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center border border-white/35 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 sm:min-h-11 sm:w-auto sm:flex-none sm:px-6 sm:py-3 md:tracking-[0.2em]"
              >
                Inquire
              </Link>
            </div>
          </div>
        </HomeHeroSlideshow>

        {/* Breathing room between full-bleed hero and triptych */}
        <div
          className="relative z-10 border-t border-[#cfc4b2]/60 bg-[#ede8df] py-10 dark:border-boho-stone/50 dark:bg-[#1a1816] md:py-14"
          aria-hidden
        >
          <div className="mx-auto max-w-md border-t border-dashed border-[#b5a892]/70 dark:border-boho-stone/40" />
        </div>

        {/* Moodboards = the palette & range you shoot */}
        <section
          className="border-y border-[#e0d9ce] bg-[#ebe6dc] shadow-[inset_0_1px_0_rgba(255,255,253,0.5)] dark:border-boho-stone/40 dark:bg-boho-bark"
          aria-label="Inspiration: three frames"
        >
          <div className="mx-auto max-w-[2000px]">
            <div className="grid grid-cols-3 gap-1.5 px-3 pb-4 pt-3 sm:pb-4 md:gap-2 md:px-4 md:pb-16 md:pt-4 lg:gap-3 lg:px-6 lg:pb-20">
              <div className="relative z-[1] -translate-y-1 rotate-[1.5deg] sm:-translate-y-2 sm:rotate-[2deg] md:aspect-[4/5] md:h-auto md:min-h-[min(85vh,900px)] md:-translate-y-4 md:rotate-[-2.5deg] md:rounded-sm">
                <div className="mood-board-bob relative h-[4.75rem] overflow-hidden rounded-md shadow-[0_6px_20px_rgba(61,52,44,0.12)] sm:h-28 md:h-full md:min-h-[min(85vh,900px)] md:rounded-none">
                  <Image
                    src={SITE_IMAGES.moodField}
                    alt="Inspiration one — portrait and light"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 34vw, 33vw"
                  />
                </div>
              </div>
              <div className="relative z-[2] translate-y-2 rotate-[1.5deg] sm:translate-y-3 sm:rotate-[2deg] md:aspect-[4/5] md:h-auto md:min-h-[min(85vh,900px)] md:translate-y-6 md:rotate-[2deg] md:rounded-sm">
                <div className="mood-board-bob mood-board-bob--b relative h-[4.75rem] overflow-hidden rounded-md shadow-[0_8px_24px_rgba(61,52,44,0.14)] sm:h-28 md:h-full md:min-h-[min(85vh,900px)] md:rounded-none">
                  <Image
                    src={SITE_IMAGES.moodArch}
                    alt="Inspiration two — color and mood"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 34vw, 33vw"
                  />
                </div>
              </div>
              <div className="relative z-[1] -translate-y-0.5 rotate-[1deg] sm:-translate-y-1 sm:rotate-[1deg] md:aspect-[4/5] md:h-auto md:min-h-[min(85vh,900px)] md:-translate-y-2 md:rotate-[1.5deg] md:rounded-sm">
                <div className="mood-board-bob mood-board-bob--c relative h-[4.75rem] overflow-hidden rounded-md shadow-[0_6px_20px_rgba(61,52,44,0.12)] sm:h-28 md:h-full md:min-h-[min(85vh,900px)] md:rounded-none">
                  <Image
                    src={SITE_IMAGES.moodFilm}
                    alt="Inspiration three — tone and texture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 34vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-5 py-6 text-center sm:px-6 sm:py-10 md:py-12">
            <p className="section-eyebrow text-boho-sage">Welcome</p>
            <p className="font-display mt-3 text-lg leading-snug text-cream-dark dark:text-cream sm:mt-4 sm:text-2xl">
              So glad you wandered in.
            </p>
            <p className="mt-3 font-body text-xs font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 sm:mt-4 sm:text-sm sm:text-base">
              This little corner of the internet is a slow scroll through the
              kind of light I love—golden fields, quiet ceremony corners, and
              film-soft black and white. Stay as long as you like; when
              you&apos;re ready, we&apos;ll dream up a session that feels like
              you, not a pose list.
            </p>
          </div>
        </section>

        {/* 4 — Photographer (Taylor_site) */}
        <section
          id="about"
          className="scroll-mt-24 px-4 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:items-center sm:gap-10 lg:gap-20">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md min-w-0 sm:mx-0 sm:max-w-lg lg:max-w-none">
              <Image
                src={SITE_IMAGES.photographer}
                alt="Taylor — photographer"
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
            <div className="min-w-0">
              <p className="section-eyebrow text-boho-sage">Behind the lens</p>
              <h2 className="mt-2 font-display text-[1.35rem] font-medium leading-snug text-cream-dark dark:text-cream sm:mt-4 sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
                Your story deserves{' '}
                <span className="italic font-normal text-coral">breathing room</span>
                —unguarded laughs, unscripted tears, and the in-between seconds
                nobody plans for.
              </h2>
              <div className="mt-4 space-y-3 font-body text-[0.8rem] font-light leading-[1.75] text-cream-dark/82 dark:text-cream/78 sm:mt-8 sm:space-y-5 sm:text-[0.95rem] sm:leading-[1.8]">
                <p>
                  I&apos;m drawn to slow mornings, porch light, and the way your
                  people lean in when they think no one&apos;s looking. Tell me
                  what matters to you—music, place, texture, mood—and I&apos;ll
                  chase that thread from first look to last dance.
                </p>
                <p>
                  No stiff posing playbook: just gentle direction, a calm
                  presence in the chaos, and images you can step back into when
                  you want to remember how it all felt.
                </p>
              </div>
              <Link
                href="/pricing"
                className="font-display mt-6 inline-block touch-manipulation text-base text-coral transition hover:text-coral-dark sm:mt-10 sm:text-2xl md:text-[1.65rem]"
              >
                Collections &amp; investment →
              </Link>
            </div>
          </div>
        </section>

        {/* 5 — More work (portfolio categories) */}
        <section
          id="portfolio"
          className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-20 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-xl lg:mb-16">
              <p className="section-eyebrow text-boho-sage">Galleries</p>
              <h2 className="mt-3 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
                More stories, same light
              </h2>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68">
                Tucked and tilted like a tabletop album—click any card to wander
                deeper.
              </p>
            </div>
            <div className="columns-2 gap-x-2 gap-y-1 sm:gap-x-8 sm:gap-y-2 lg:columns-3 lg:gap-x-10">
              {PORTFOLIO_HOME_CARDS.map((card, i) => {
                const s = SCRAPBOOK_STYLES[i % SCRAPBOOK_STYLES.length];
                return (
                  <Link
                    key={card.name}
                    href={card.href}
                    className={`group mb-4 block break-inside-avoid transition duration-300 hover:z-10 hover:scale-[1.02] hover:rotate-0 sm:mb-10 ${s.rotate} ${s.push}`}
                  >
                    <div
                      className={`scrapbook-mat rounded-[2px] bg-[#faf8f4] p-2 dark:bg-[#2a2622] ${s.lip}`}
                    >
                      <div
                        className={`relative overflow-hidden bg-[#e8e3db] dark:bg-boho-ink ${
                          i % 3 === 0
                            ? 'aspect-[5/4] min-h-[92px] sm:min-h-[200px]'
                            : i % 3 === 1
                              ? 'aspect-[4/5] min-h-[100px] sm:min-h-[220px]'
                              : 'aspect-[3/4] min-h-[88px] sm:min-h-[190px]'
                        }`}
                      >
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="mt-1.5 px-0.5 text-center sm:mt-3 sm:px-1">
                        <h3 className="font-display text-[0.7rem] leading-tight text-cream-dark dark:text-cream sm:text-xl">
                          {card.name}
                        </h3>
                        <p className="mt-0.5 font-body text-[0.55rem] italic leading-snug text-cream-dark/60 dark:text-cream/55 sm:text-xs">
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

        <TestimonialsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
