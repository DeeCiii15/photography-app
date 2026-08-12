/**
 * Wedding venue cards for location landing pages.
 *
 * `ARCHIVED_WEDDING_VENUE_CARDS` holds venues pulled off the Florence page
 * so they can be reused on future city landings (Latta, Darlington, etc.).
 */

import { getShootCards } from './portfolioData';
import type { PortfolioShootCard } from './portfolioData';
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from './siteConfig';

export type WeddingVenueGallery = {
  caption: string;
  href: string;
  image: string;
};

export type WeddingVenueCardDef = {
  id: string;
  name: string;
  location: string;
  /** One paragraph, or several for longer venue writeups */
  blurb: string | string[];
  href: string;
  gallerySlugs: string[];
};

const GALLERY_CARDS_BY_SLUG = new Map<string, PortfolioShootCard>(
  [...getShootCards('Weddings'), ...getShootCards('Portraits')].map((card) => [
    card.slug,
    card,
  ]),
);

/** Resolve shoot slugs into polaroids; `fromRef` is the `?from=` back-link flag. */
export function venueGalleries(
  fromRef: string,
  ...slugs: string[]
): WeddingVenueGallery[] {
  return slugs
    .map((slug) => GALLERY_CARDS_BY_SLUG.get(slug))
    .filter((card): card is PortfolioShootCard => Boolean(card))
    .map((card) => ({
      caption: card.title,
      href: `${card.href}?from=${fromRef}`,
      image: card.image,
    }));
}

const GLENVIEW_FARM: WeddingVenueCardDef = {
  id: 'glenview-farm-events',
  name: 'Glenview Farm Events',
  location: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  blurb:
    'Gorgeous remodeled horse barns with natural lighting in the ceremony area & a covered pavilion for the reception hall. Indoor bathrooms, getting ready suites for bride & groom, & beautiful acreage to get plenty of timeless portraits & shots.',
  href: 'https://www.glenviewfarmevents.com/',
  gallerySlugs: ['florence-sc-wedding-glenview-farms'],
};

const CABIN_AT_OLD_SPUR: WeddingVenueCardDef = {
  id: 'the-cabin-at-old-spur',
  name: 'The Cabin at Old Spur',
  location: `Timmonsville, ${PRIMARY_STATE_ABBR}`,
  blurb:
    'Whether your day is sunny or covered by a blanket of snow, the Cabin at Old Spur is the perfect cozy location tucked back in the woods. A cabin for getting ready & housing the bridal party, skeet shooting for the boys, & the perfect covered pavilion in case of rain ensures a perfect experience for your wedding day.',
  href: 'https://www.thecabinatoldspur.com/',
  gallerySlugs: ['timmonsville-sc-wedding-the-cabin-at-old-spur'],
};

const SAWTOOTH_ACRES: WeddingVenueCardDef = {
  id: 'sawtooth-acres',
  name: 'Sawtooth Acres',
  location: `Pamplico, ${PRIMARY_STATE_ABBR}`,
  blurb: [
    'Sawtooth Acres is a private family-owned wedding venue in Pamplico, South Carolina, tucked away in the woods just off Bowling Road. Surrounded by nature, this peaceful property offers an intimate setting for weddings & celebrations throughout the Pee Dee.',
    'For couples searching for Pee Dee wedding venues, a Florence, South Carolina wedding venue, or a South Carolina outdoor wedding venue, Sawtooth Acres offers a private, natural setting filled with rustic charm.',
  ],
  href: 'https://www.google.com/maps/search/?api=1&query=Sawtooth+Acres+Pamplico+SC',
  gallerySlugs: ['pamplico-sc-wedding-sawtooth-acres'],
};

const COLLINS_GROVE: WeddingVenueCardDef = {
  id: 'collins-grove',
  name: 'Collins Grove',
  location: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  blurb: [
    'Collins Grove is a charming vintage-inspired wedding venue in Florence, South Carolina tucked away just off North Williston Highway, surrounded by mature oak trees & timeless Southern charm. The estate offers a beautiful, versatile setting for weddings & celebrations throughout the Pee Dee.',
    'For couples searching for Florence, South Carolina wedding venues or Pee Dee wedding venues, Collins Grove offers an intimate setting filled with Southern charm, timeless character, & plenty of room to make your wedding day your own.',
  ],
  href: 'https://southerncelebrations.com/',
  gallerySlugs: [],
};

/** Shown on `/florence-sc-wedding-photography`. */
export const FLORENCE_WEDDING_VENUE_CARDS: WeddingVenueCardDef[] = [
  GLENVIEW_FARM,
  CABIN_AT_OLD_SPUR,
  SAWTOOTH_ACRES,
  COLLINS_GROVE,
];

/**
 * Venue cards removed from the Florence landing and stored for later city pages.
 * Parker Pines → Latta; Murphy Farm → Darlington.
 */
export const ARCHIVED_WEDDING_VENUE_CARDS: WeddingVenueCardDef[] = [
  {
    id: 'parker-pines',
    name: 'Parker Pines',
    location: `Latta, ${PRIMARY_STATE_ABBR}`,
    blurb:
      "Parker Pines offers a variety of ceremony spaces to fit every bride's aesthetic—multiple outdoor spaces, an indoor chapel, & a large barn for getting ready & the reception. It also consists of multiple tiny homes to house the bridal party or out-of-town guests for the wedding weekend.",
    href: 'https://parkerpinesevents.com/',
    gallerySlugs: [
      'latta-sc-wedding-parker-pines-lee',
      'latta-sc-wedding-parker-pines-flowers',
      'latta-sc-bridal-portraits',
    ],
  },
  {
    id: 'murphy-farm',
    name: 'Murphy Farm',
    location: `Darlington, ${PRIMARY_STATE_ABBR}`,
    blurb:
      'Murphy Farm is a quiet venue tucked away on a back road in Darlington, South Carolina. With a covered barn for reception, a secondary barn for getting ready, & a wide open field, Murphy Farm offers the perfect place to get married. The pond located on the property is the ideal backdrop for those beautiful golden hour photos every bride dreams of.',
    href: 'https://www.murphyfarmllc.com/',
    gallerySlugs: ['darlington-sc-wedding-murphy-farms'],
  },
];
