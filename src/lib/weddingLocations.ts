import { PRIMARY_STATE, PRIMARY_STATE_ABBR } from './siteConfig';

/**
 * Wedding location landing pages for the Pee Dee map.
 * Set `status: 'live'` when a city page ships.
 * Map x/y are % within the county map (Florence County ≈ center, olive highlight).
 */
export type WeddingLocationStatus = 'live' | 'soon';

export type WeddingLocation = {
  id: string;
  city: string;
  path: string;
  status: WeddingLocationStatus;
  x: number;
  y: number;
  featured?: boolean;
};

export const WEDDING_LOCATIONS: WeddingLocation[] = [
  {
    id: 'hartsville',
    city: 'Hartsville',
    path: '/hartsville-sc-wedding-photography',
    status: 'soon',
    x: 22,
    y: 28,
  },
  {
    id: 'darlington',
    city: 'Darlington',
    path: '/darlington-sc-wedding-photography',
    status: 'soon',
    x: 30,
    y: 36,
  },
  {
    id: 'camden',
    city: 'Camden',
    path: '/camden-sc-wedding-photography',
    status: 'soon',
    x: 10,
    y: 48,
  },
  {
    id: 'latta',
    city: 'Latta',
    path: '/latta-sc-wedding-photography',
    status: 'soon',
    x: 64,
    y: 28,
  },
  {
    id: 'florence',
    city: 'Florence',
    path: '/florence-sc-wedding-photography',
    status: 'live',
    x: 48,
    y: 42,
    featured: true,
  },
  {
    id: 'marion',
    city: 'Marion',
    path: '/marion-sc-wedding-photography',
    status: 'soon',
    x: 72,
    y: 44,
  },
  {
    id: 'mullins',
    city: 'Mullins',
    path: '/mullins-sc-wedding-photography',
    status: 'soon',
    x: 80,
    y: 38,
  },
  {
    id: 'pamplico',
    city: 'Pamplico',
    path: '/pamplico-sc-wedding-photography',
    status: 'soon',
    x: 56,
    y: 56,
  },
  {
    id: 'lake-city',
    city: 'Lake City',
    path: '/lake-city-sc-wedding-photography',
    status: 'soon',
    x: 42,
    y: 62,
  },
];

export function weddingLocationTitle(city: string, short = false): string {
  const place = short
    ? `${city}, ${PRIMARY_STATE_ABBR}`
    : `${city}, ${PRIMARY_STATE}`;
  return `${place} Wedding Photography`;
}

export function getLiveWeddingLocations(): WeddingLocation[] {
  return WEDDING_LOCATIONS.filter((location) => location.status === 'live');
}

export function getWeddingLocationById(
  id: string,
): WeddingLocation | undefined {
  return WEDDING_LOCATIONS.find((location) => location.id === id);
}

/**
 * Match a wedding shoot slug to a live location page
 * (e.g. florence-sc-wedding-glenview-farms → Florence,
 * latta-sc-wedding-parker-pines-lee → Latta).
 * Longer ids win so `lake-city` matches before a hypothetical `lake`.
 */
export function getLiveWeddingLocationForShoot(
  shootSlug: string,
): WeddingLocation | undefined {
  const live = [...getLiveWeddingLocations()].sort(
    (a, b) => b.id.length - a.id.length,
  );
  return live.find(
    (location) =>
      shootSlug === location.id ||
      shootSlug.startsWith(`${location.id}-`),
  );
}
