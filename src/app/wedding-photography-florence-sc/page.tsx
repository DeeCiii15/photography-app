import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import FlorenceWeddingsJsonLd from '../components/FlorenceWeddingsJsonLd';
import { getShootCards, portfolioCategoryHref } from '@/lib/portfolioData';
import type { PortfolioShootCard } from '@/lib/portfolioData';
import {
  FLORENCE_WEDDINGS_PATH,
  FLORENCE_WEDDINGS_REF,
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

type VenueGallery = { caption: string; href: string; image: string };
type Venue = {
  name: string;
  location: string;
  blurb: string;
  href: string;
  galleries: VenueGallery[];
};

/** Lookup of every gallery I might link a venue to, keyed by shoot slug */
const GALLERY_CARDS_BY_SLUG = new Map<string, PortfolioShootCard>(
  [...getShootCards('Weddings'), ...getShootCards('Portraits')].map((card) => [
    card.slug,
    card,
  ]),
);

/** Resolve registered shoot slugs into polaroid data (cover image, title, href) */
function venueGalleries(...slugs: string[]): VenueGallery[] {
  return slugs
    .map((slug) => GALLERY_CARDS_BY_SLUG.get(slug))
    .filter((card): card is PortfolioShootCard => Boolean(card))
    .map((card) => ({
      caption: card.title,
      href: `${card.href}?from=${FLORENCE_WEDDINGS_REF}`,
      image: card.image,
    }));
}

/** Small alternating tilts so the polaroids feel hand-placed */
const POLAROID_TILTS = ['-rotate-[3deg]', 'rotate-[2.5deg]', '-rotate-[1.5deg]'];

/** Florence-area wedding venues I love, each linked to real galleries shot there */
const FLORENCE_VENUES: Venue[] = [
  {
    name: 'Glenview Farm Events',
    location: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'Gorgeous remodeled horse barns with natural lighting in the ceremony area & a covered pavilion for the reception hall. Indoor bathrooms, getting ready suites for bride & groom, & beautiful acreage to get plenty of timeless portraits & shots.',
    href: 'https://www.glenviewfarmevents.com/',
    galleries: venueGalleries('florence-sc-wedding'),
  },
  {
    name: 'Parker Pines',
    location: `Latta, ${PRIMARY_STATE_ABBR}`,
    blurb:
      "Parker Pines offers a variety of ceremony spaces to fit every bride's aesthetic—multiple outdoor spaces, an indoor chapel, & a large barn for getting ready & the reception. It also consists of multiple tiny homes to house the bridal party or out-of-town guests for the wedding weekend.",
    href: 'https://parkerpinesevents.com/',
    galleries: venueGalleries(
      'latta-sc-wedding-the-lees',
      'latta-sc-wedding-the-flowers',
      'latta-sc-bridal-portraits',
    ),
  },
  {
    name: 'The Cabin at Old Spur',
    location: `Timmonsville, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'Whether your day is sunny or covered by a blanket of snow, the Cabin at Old Spur is the perfect cozy location tucked back in the woods. A cabin for getting ready & housing the bridal party, skeet shooting for the boys, & the perfect covered pavilion in case of rain ensures a perfect experience for your wedding day.',
    href: 'https://www.thecabinatoldspur.com/',
    galleries: venueGalleries('timmonsville-sc-wedding'),
  },
  {
    name: 'Murphy Farm',
    location: `Darlington, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'Murphy Farm is a quiet venue tucked away on a back road in Darlington, South Carolina. With a covered barn for reception, a secondary barn for getting ready, & a wide open field, Murphy Farm offers the perfect place to get married. The pond located on the property is the ideal backdrop for those beautiful golden hour photos every bride dreams of.',
    href: 'https://www.murphyfarmllc.com/',
    galleries: venueGalleries('darlington-sc-wedding'),
  },
];

/**
 * Featured grid for the "closer look at some Florence weddings" section—
 * a curated mix pulled from the real galleries linked in the venues section
 * below (Florence, Timmonsville, Latta & Darlington weddings).
 */
const FLORENCE_WEDDING_GALLERY: { src: string; alt: string }[] = [
  {
    src: '/images/galleries/weddings/florence-sc-wedding/cover.jpg',
    alt: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} wedding photography by ${SITE_NAME}`,
  },
  {
    src: '/images/galleries/weddings/timmonsville-sc-wedding/cover.jpg',
    alt: `Timmonsville, ${PRIMARY_STATE_ABBR} wedding photography by ${SITE_NAME}`,
  },
  {
    src: '/images/galleries/weddings/latta-sc-wedding-the-lees/cover.jpg',
    alt: `Latta, ${PRIMARY_STATE_ABBR} wedding photography by ${SITE_NAME}`,
  },
  {
    src: '/images/galleries/weddings/darlington-sc-wedding/08.jpg',
    alt: `Darlington, ${PRIMARY_STATE_ABBR} wedding at Murphy Farm by ${SITE_NAME}`,
  },
  {
    src: '/images/galleries/weddings/latta-sc-wedding-the-flowers/cover.jpg',
    alt: `Latta, ${PRIMARY_STATE_ABBR} wedding photography by ${SITE_NAME}`,
  },
  {
    src: '/images/galleries/weddings/florence-sc-wedding/05.jpg',
    alt: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} wedding photography by ${SITE_NAME}`,
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
            src="/images/galleries/weddings/latta-sc-wedding-the-lees/04.jpg"
            alt={`Wedding photography in ${PRIMARY_CITY}, ${PRIMARY_STATE} by ${SITE_NAME}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
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
                Natural lighting, true-to-color, documentary style wedding
                photography for couples saying &ldquo;I do&rdquo; in &amp; around{' '}
                {PRIMARY_CITY}. Genuine moments, timeless galleries, &amp; a
                wedding day that is true to you.
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
          className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-24"
          aria-labelledby="why-florence-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {FLORENCE_WEDDING_GALLERY.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
                {FLORENCE_WEDDING_GALLERY.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-[2/3] overflow-hidden rounded-[2px] bg-[#e8e3db] shadow-[0_8px_24px_rgba(61,52,44,0.08)] ring-1 ring-[#e8e3db] dark:bg-boho-ink dark:ring-boho-stone/30"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center transition duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 50vw, 22vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d4cdc0] bg-[#faf8f4]/70 py-20 text-center dark:border-boho-stone/45 dark:bg-boho-bark/40 lg:col-span-6">
                <p className="font-body text-base font-light text-cream-dark/70 dark:text-cream/68">
                  A featured Florence wedding is on the way—check back soon.
                </p>
              </div>
            )}
            <div className="lg:col-span-6">
              <h2
                id="why-florence-heading"
                className="font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]"
              >
                Why I love being a part of your{' '}
                <span className="italic font-normal text-coral">
                  {PRIMARY_CITY} wedding
                </span>
              </h2>
              <p className="mt-6 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                {PRIMARY_CITY} is home. It&rsquo;s where my love for photography
                first began and where I&rsquo;ve spent years learning how to
                photograph love stories in every kind of light.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                We all know the {PRIMARY_REGION}&rsquo;s cotton candy sunsets, the
                back roads lined with grassy fields and wildflowers, and the
                family farms and hidden venues tucked into every corner of our
                community. I&rsquo;ve spent countless evenings chasing that light,
                learning how it moves across each venue and where it settles just
                before the sun disappears.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                When I&rsquo;m photographing your wedding, I&rsquo;m not searching
                for the perfect spot—I already know it. I know the pockets of
                golden light that seem to wrap around the two of you, the fields
                that come alive with dandelion tufts as you laugh your way through
                them, and the places where the sun slips perfectly between the
                trees for one last kiss before night falls.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                But what I love most isn&rsquo;t the scenery—it&rsquo;s the people.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                It&rsquo;s the parents who built their venue from the ground up,
                the aunt who poured her heart into every floral arrangement, the
                grandmothers who spent the week cooking family recipes, the
                friends and family who traveled from every corner of{' '}
                {PRIMARY_STATE} just to celebrate you.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                Those are the moments that make a wedding feel like home.
              </p>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                My job is to stay close enough to preserve those quiet, fleeting
                moments, yet far enough away to capture the bigger story unfolding
                around them. Because years from now, I don&rsquo;t just want to
                remember what your wedding looked like—I want you to remember
                exactly how it felt.
              </p>
            </div>
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
                few {PRIMARY_CITY}-area venues I always love returning to.
              </p>
            </div>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {FLORENCE_VENUES.map((venue) => (
                <li key={venue.name}>
                  <div className="flex h-full flex-col rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/95 p-7 shadow-[0_8px_28px_rgba(61,52,44,0.05)] ring-1 ring-[#e8e3db]/85 dark:border-boho-stone/40 dark:bg-boho-bark/55 dark:ring-boho-stone/25 sm:p-8">
                    <p className="section-eyebrow text-boho-sage">
                      {venue.location}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-[1.65rem]">
                      <a
                        href={venue.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/name inline-flex items-start gap-1.5 transition hover:text-coral"
                      >
                        {venue.name}
                        <svg
                          className="mt-1 h-3.5 w-3.5 shrink-0 opacity-50 transition group-hover/name:translate-x-0.5 group-hover/name:opacity-100"
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
                      </a>
                    </h3>
                    <p className="mt-3 font-body text-base font-light leading-[1.8] text-cream-dark/80 dark:text-cream/76">
                      {venue.blurb}
                    </p>
                    {venue.galleries.length > 0 && (
                      <div className="mt-auto border-t border-[#e8e3db] pt-6 dark:border-boho-stone/30">
                        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-dark/50 dark:text-cream/45">
                          Weddings I&rsquo;ve photographed here
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-5 sm:gap-x-4">
                          {venue.galleries.map((gallery, gi) => (
                            <Link
                              key={gallery.href}
                              href={gallery.href}
                              className={`group/polaroid block w-[6.5rem] shrink-0 transition duration-300 hover:z-10 hover:scale-[1.05] hover:rotate-0 sm:w-[7rem] ${
                                POLAROID_TILTS[gi % POLAROID_TILTS.length]
                              }`}
                            >
                              <div className="scrapbook-mat rounded-[2px] bg-[#faf8f4] p-1.5 pb-4 dark:bg-[#2a2622]">
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e3db] dark:bg-boho-ink">
                                  <Image
                                    src={gallery.image}
                                    alt={gallery.caption}
                                    fill
                                    className="object-cover object-center transition duration-500 group-hover/polaroid:scale-[1.05]"
                                    sizes="(max-width: 640px) 40vw, 220px"
                                    quality={90}
                                  />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
