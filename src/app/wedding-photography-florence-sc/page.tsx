import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import FlorenceWeddingsJsonLd from '../components/FlorenceWeddingsJsonLd';
import { portfolioCategoryHref } from '@/lib/portfolioData';
import {
  FLORENCE_WEDDINGS_PATH,
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from '@/lib/siteConfig';

const PAGE_TITLE = `Wedding Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE} | ${SITE_NAME}`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: `Natural-light, true-to-color wedding photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. A ${PRIMARY_REGION} wedding photographer capturing honest, timeless galleries at Florence's favorite venues—see real weddings & check your date.`,
  alternates: { canonical: FLORENCE_WEDDINGS_PATH },
  openGraph: {
    title: PAGE_TITLE,
    description: `Honest, timeless wedding photography for couples in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & across the ${PRIMARY_REGION}.`,
    url: FLORENCE_WEDDINGS_PATH,
  },
};

const WEDDINGS_HREF = portfolioCategoryHref('weddings');

/** Florence-area wedding venues worth linking out to */
const FLORENCE_VENUES = [
  {
    name: 'Glenview Farm Events',
    location: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'A rustic 159-acre farm with remodeled horse barns and twinkle-lit oaks, minutes from downtown Florence.',
    href: 'https://www.glenviewfarmevents.com/',
  },
  {
    name: 'The Country Club of South Carolina',
    location: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'Lakeside ceremonies and a covered veranda for elegant indoor-and-outdoor celebrations.',
    href: 'https://www.countryclubsc.com/events/weddings',
  },
  {
    name: 'The Cabin at Old Spur',
    location: `Timmonsville, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'A serene pond framed by 70 wooded acres—made for laid-back, all-weekend weddings.',
    href: 'https://www.thecabinatoldspur.com/',
  },
  {
    name: 'Darlington Country Club',
    location: `Darlington, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'A historic ballroom on the banks of Black Creek, a short drive north of Florence.',
    href: 'https://darlingtoncountryclub.com/weddings-events/',
  },
] as const;

/**
 * Focused gallery for one specific Florence-area wedding.
 * Swap these for your chosen photos: drop the images in
 * public/images/... and update each { src, alt } below (any count works).
 * Starter set uses the Pamplico, SC (Florence County) wedding.
 */
const FLORENCE_WEDDING_GALLERY: { src: string; alt: string }[] = [
  {
    src: '/images/galleries/weddings/pamplico-sc-wedding/01.jpg',
    alt: `Florence-area wedding photography by ${SITE_NAME} — 1`,
  },
  {
    src: '/images/galleries/weddings/pamplico-sc-wedding/08.jpg',
    alt: `Florence-area wedding photography by ${SITE_NAME} — 2`,
  },
  {
    src: '/images/galleries/weddings/pamplico-sc-wedding/14.jpg',
    alt: `Florence-area wedding photography by ${SITE_NAME} — 3`,
  },
  {
    src: '/images/galleries/weddings/pamplico-sc-wedding/23.jpg',
    alt: `Florence-area wedding photography by ${SITE_NAME} — 4`,
  },
  {
    src: '/images/galleries/weddings/pamplico-sc-wedding/30.jpg',
    alt: `Florence-area wedding photography by ${SITE_NAME} — 5`,
  },
  {
    src: '/images/galleries/weddings/pamplico-sc-wedding/41.jpg',
    alt: `Florence-area wedding photography by ${SITE_NAME} — 6`,
  },
];

export default function FlorenceWeddingsPage() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <FlorenceWeddingsJsonLd />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative isolate flex min-h-svh items-end overflow-hidden">
          <Image
            src="/images/hero_1.jpg"
            alt={`Wedding photography in ${PRIMARY_CITY}, ${PRIMARY_STATE} by ${SITE_NAME}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40"
            aria-hidden
          />
          <div className="relative z-10 w-full px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
            <div className="mx-auto max-w-6xl">
              <p className="type-eyebrow text-white/88">
                {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} wedding photography
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.1] text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl">
                Wedding Photography in{' '}
                <span className="italic font-normal text-[#f0c9b4]">
                  {PRIMARY_CITY}, {PRIMARY_STATE}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl font-body text-base font-light leading-[1.8] text-white/90 sm:text-lg">
                Natural-light, true-to-color wedding photography for couples
                saying &ldquo;I do&rdquo; in and around {PRIMARY_CITY}. Honest
                moments, timeless galleries, and a wedding day that still feels
                like you.
              </p>
              <div className="mt-8 flex w-full max-w-md flex-row flex-wrap gap-2 sm:mt-10 sm:max-w-none sm:gap-3 md:flex-row">
                <Link
                  href="/contact"
                  className="font-body inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center border border-white/40 bg-white/95 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3d342c] transition hover:bg-white sm:min-h-11 sm:w-auto sm:flex-none sm:px-6 sm:py-3 md:tracking-[0.2em]"
                >
                  Check your date
                </Link>
                <Link
                  href={WEDDINGS_HREF}
                  className="font-body inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center border border-white/35 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 sm:min-h-11 sm:w-auto sm:flex-none sm:px-6 sm:py-3 md:tracking-[0.2em]"
                >
                  View wedding galleries
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Florence */}
        <section
          className="scroll-mt-24 border-t border-[#e0d9ce] px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24"
          aria-labelledby="why-florence-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2px] bg-[#e8e3db] shadow-[0_12px_36px_rgba(61,52,44,0.1)] ring-1 ring-[#e8e3db] dark:bg-boho-bark dark:ring-boho-stone/35 lg:col-span-5 lg:mx-0 lg:max-w-none">
              <Image
                src="/images/galleries/weddings/pamplico-sc-wedding/cover.jpg"
                alt={`Bride and groom by the water at a ${PRIMARY_REGION} wedding near ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="section-eyebrow text-boho-sage">Why Florence</p>
              <h2
                id="why-florence-heading"
                className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]"
              >
                Why I love photographing{' '}
                <span className="italic font-normal text-coral">
                  Florence weddings
                </span>
              </h2>
              <p className="mt-6 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                {PRIMARY_CITY} is home. There&rsquo;s a particular kind of golden
                light that settles over the {PRIMARY_REGION} in the late
                afternoon—over the farm fields, the mossy oaks, and the quiet
                lakes just outside town—and I&rsquo;ve spent years learning how
                to chase it. Photographing weddings here means I already know the
                back roads, the venues, and the way the sun falls at six
                o&rsquo;clock in October.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                More than that, I love the people. {PRIMARY_CITY} weddings are
                full of hometown warmth—the aunts who&rsquo;ve cooked all week,
                the daddy-daughter dances, the friends who drove in from every
                corner of {PRIMARY_STATE}. My job is to stay close and quiet
                enough to catch all of it: the real, in-between moments
                you&rsquo;ll want to relive for the rest of your life.
              </p>
              <Link
                href="/contact"
                className="font-display mt-8 inline-flex min-h-12 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-coral px-9 py-3 text-xl text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg sm:text-2xl dark:border-boho-stone/45"
              >
                Tell me about your day
              </Link>
            </div>
          </div>
        </section>

        {/* Focused gallery — one specific Florence-area wedding */}
        <section
          className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-24"
          aria-labelledby="florence-wedding-heading"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="florence-wedding-heading"
                className="font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem]"
              >
                A closer look at one{' '}
                <span className="italic text-coral">{PRIMARY_CITY} wedding</span>
              </h2>
              <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
                A handful of favorite frames from a recent wedding day in the{' '}
                {PRIMARY_CITY} area.
              </p>
            </div>

            {FLORENCE_WEDDING_GALLERY.length > 0 ? (
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
                {FLORENCE_WEDDING_GALLERY.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#e8e3db] shadow-[0_8px_24px_rgba(61,52,44,0.08)] ring-1 ring-[#e8e3db] dark:bg-boho-ink dark:ring-boho-stone/30"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center transition duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-dashed border-[#d4cdc0] bg-[#faf8f4]/70 py-20 text-center dark:border-boho-stone/45 dark:bg-boho-bark/40">
                <p className="font-body text-base font-light text-cream-dark/70 dark:text-cream/68">
                  A featured Florence wedding is on the way—check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Venues I love */}
        <section
          className="scroll-mt-24 border-t border-[#e0d9ce] px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24"
          aria-labelledby="venues-heading"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="venues-heading"
                className="font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem]"
              >
                {PRIMARY_CITY} wedding venues I love
              </h2>
              <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
                Every couple&rsquo;s day looks a little different, but these are a
                few {PRIMARY_CITY}-area venues I always love returning to. Click
                through to see what each one offers.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {FLORENCE_VENUES.map((venue) => (
                <li key={venue.href}>
                  <a
                    href={venue.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/95 p-7 shadow-[0_8px_28px_rgba(61,52,44,0.05)] ring-1 ring-[#e8e3db]/85 transition hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-[0_14px_36px_rgba(61,52,44,0.1)] dark:border-boho-stone/40 dark:bg-boho-bark/55 dark:ring-boho-stone/25 sm:p-8"
                  >
                    <p className="section-eyebrow text-boho-sage">
                      {venue.location}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-medium text-cream-dark transition group-hover:text-coral dark:text-cream md:text-[1.65rem]">
                      {venue.name}
                    </h3>
                    <p className="mt-3 font-body text-base font-light leading-[1.8] text-cream-dark/80 dark:text-cream/76">
                      {venue.blurb}
                    </p>
                    <span className="font-body mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                      Visit venue
                      <svg
                        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path
                          d="M7 17L17 7M9 7h8v8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
              Getting married somewhere else in the {PRIMARY_REGION}? I travel
              all over—{' '}
              <Link
                href="/contact"
                className="text-coral underline decoration-boho-sage/40 underline-offset-4 transition hover:text-coral-dark"
              >
                tell me about your venue
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-14 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
              Let&rsquo;s talk about your {PRIMARY_CITY} area wedding
            </h2>
            <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/78 dark:text-cream/72">
              Share your date &amp; venue, and I&rsquo;ll be in touch with
              availability and next steps.
            </p>
            <Link
              href="/contact"
              className="font-display mt-7 inline-flex min-h-12 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-coral px-10 py-3.5 text-xl text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg sm:text-2xl dark:border-boho-stone/45"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
