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
          <div className="flex min-h-svh flex-col justify-end px-6 pb-16 pt-28 sm:px-10 sm:pb-20 md:pb-24 lg:px-16">
            <p className="type-eyebrow max-w-md text-white/88">
              Wedding &amp; portrait · Natural light · The American South
            </p>
            <p className="font-display mt-6 max-w-xl text-2xl leading-snug text-white/95 sm:text-3xl md:text-[2.15rem]">
              Soft light, honest color, frames that feel like memory.
            </p>
            <p className="mt-5 max-w-lg text-[0.95rem] font-light leading-[1.75] text-white/90 md:text-base">
              The same warmth as tall grass at golden hour—never loud, never
              forced.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="font-display inline-flex items-center justify-center border border-white/40 bg-white/95 px-8 py-3.5 text-xl text-[#3d342c] transition hover:bg-white md:text-[1.35rem] md:py-4 md:px-9"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="font-display inline-flex items-center justify-center border border-white/35 bg-transparent px-8 py-3.5 text-xl text-white transition hover:bg-white/10 md:text-[1.35rem] md:py-4 md:px-9"
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
            <div className="grid md:grid-cols-3">
              <div className="relative aspect-[3/4] md:aspect-[4/5] md:min-h-[min(85vh,900px)]">
                <Image
                  src={SITE_IMAGES.moodField}
                  alt="Inspiration one — portrait and light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[3/4] md:aspect-[4/5] md:min-h-[min(85vh,900px)]">
                <Image
                  src={SITE_IMAGES.moodArch}
                  alt="Inspiration two — color and mood"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[3/4] md:aspect-[4/5] md:min-h-[min(85vh,900px)]">
                <Image
                  src={SITE_IMAGES.moodFilm}
                  alt="Inspiration three — tone and texture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-6 py-10 text-center sm:py-12">
            <p className="section-eyebrow text-boho-sage">Welcome</p>
            <p className="font-display mt-4 text-xl leading-snug text-cream-dark dark:text-cream sm:text-2xl">
              So glad you wandered in.
            </p>
            <p className="mt-4 font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 sm:text-base">
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
          className="scroll-mt-24 px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md lg:mx-0 lg:max-w-none">
              <Image
                src={SITE_IMAGES.photographer}
                alt="Taylor — photographer"
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="section-eyebrow text-boho-sage">Behind the lens</p>
              <h2 className="mt-4 font-display text-[2.125rem] font-medium leading-snug text-cream-dark dark:text-cream sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
                Your story deserves{' '}
                <span className="italic font-normal text-coral">breathing room</span>
                —unguarded laughs, unscripted tears, and the in-between seconds
                nobody plans for.
              </h2>
              <div className="mt-8 space-y-5 font-body text-[0.95rem] font-light leading-[1.8] text-cream-dark/82 dark:text-cream/78">
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
                className="font-display mt-10 inline-block text-2xl text-coral transition hover:text-coral-dark md:text-[1.65rem]"
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

        <TestimonialsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
