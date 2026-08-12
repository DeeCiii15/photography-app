import { PRIMARY_STATE, PRIMARY_STATE_ABBR } from './siteConfig';

/**
 * Wedding location hubs & map spokes for the Pee Dee map.
 * Set `status: 'live'` when a city page ships.
 * Map x/y are % within the map frame.
 *
 * Spokes (`mapOnly` + `linksTo`) appear on the map only and route to a hub page.
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
  /** Hub id — map pin uses that hub’s page when live */
  linksTo?: string;
  /** Show on the map but not in the sidebar list */
  mapOnly?: boolean;
};

export const WEDDING_LOCATIONS: WeddingLocation[] = [
  // —— Hub pages (sidebar + map) ——
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
    id: 'hartsville',
    city: 'Hartsville',
    path: '/hartsville-sc-wedding-photography',
    status: 'soon',
    x: 22,
    y: 28,
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
    id: 'myrtle-beach',
    city: 'Myrtle Beach',
    path: '/myrtle-beach-sc-wedding-photography',
    status: 'soon',
    x: 84,
    y: 58,
  },
  {
    id: 'sumter',
    city: 'Sumter',
    path: '/sumter-sc-wedding-photography',
    status: 'soon',
    x: 14,
    y: 52,
  },
  {
    id: 'charleston',
    city: 'Charleston',
    path: '/charleston-sc-wedding-photography',
    status: 'soon',
    x: 90,
    y: 86,
  },
  // —— Map spokes (no dedicated page yet) ——
  {
    id: 'cheraw',
    city: 'Cheraw',
    path: '/cheraw-sc-wedding-photography',
    status: 'soon',
    x: 16,
    y: 18,
    linksTo: 'hartsville',
    mapOnly: true,
  },
  {
    id: 'darlington',
    city: 'Darlington',
    path: '/darlington-sc-wedding-photography',
    status: 'soon',
    x: 30,
    y: 36,
    linksTo: 'hartsville',
    mapOnly: true,
  },
  {
    id: 'camden',
    city: 'Camden',
    path: '/camden-sc-wedding-photography',
    status: 'soon',
    x: 10,
    y: 48,
    linksTo: 'sumter',
    mapOnly: true,
  },
  {
    id: 'timmonsville',
    city: 'Timmonsville',
    path: '/timmonsville-sc-wedding-photography',
    status: 'soon',
    x: 38,
    y: 50,
    linksTo: 'florence',
    mapOnly: true,
  },
  {
    id: 'lake-city',
    city: 'Lake City',
    path: '/lake-city-sc-wedding-photography',
    status: 'soon',
    x: 42,
    y: 62,
    linksTo: 'florence',
    mapOnly: true,
  },
  {
    id: 'pamplico',
    city: 'Pamplico',
    path: '/pamplico-sc-wedding-photography',
    status: 'soon',
    x: 56,
    y: 56,
    linksTo: 'florence',
    mapOnly: true,
  },
  {
    id: 'latta',
    city: 'Latta',
    path: '/latta-sc-wedding-photography',
    status: 'soon',
    x: 64,
    y: 28,
    linksTo: 'marion',
    mapOnly: true,
  },
  {
    id: 'mullins',
    city: 'Mullins',
    path: '/mullins-sc-wedding-photography',
    status: 'soon',
    x: 80,
    y: 38,
    linksTo: 'marion',
    mapOnly: true,
  },
];

const locationById = new Map(WEDDING_LOCATIONS.map((location) => [location.id, location]));

/** Sidebar list — hub towns only, alphabetical with Florence first */
export function getWeddingLocationListEntries(): WeddingLocation[] {
  return [...WEDDING_LOCATIONS]
    .filter((location) => !location.mapOnly)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.city.localeCompare(b.city);
    });
}

/** Map spokes that route to this hub, for sidebar coverage labels */
export function getWeddingLocationSpokeCities(hubId: string): string[] {
  return WEDDING_LOCATIONS.filter(
    (location) => location.linksTo === hubId,
  )
    .map((location) => location.city)
    .sort((a, b) => a.localeCompare(b));
}

/** Resolved link target for a map pin or list row */
export function getWeddingLocationHref(location: WeddingLocation): string {
  if (location.linksTo) {
    const hub = locationById.get(location.linksTo);
    if (hub) return hub.path;
  }
  return location.path;
}

export function getWeddingLocationHub(
  location: WeddingLocation,
): WeddingLocation | undefined {
  if (!location.linksTo) return undefined;
  return locationById.get(location.linksTo);
}

/** Whether the pin or row should navigate (live hub, or spoke with a live hub) */
export function isWeddingLocationNavigable(location: WeddingLocation): boolean {
  if (location.linksTo) {
    const hub = locationById.get(location.linksTo);
    return hub?.status === 'live';
  }
  return location.status === 'live';
}

export function getWeddingLocationActionLabel(location: WeddingLocation): string {
  if (location.status === 'live') return 'View page →';
  const hub = getWeddingLocationHub(location);
  if (hub?.status === 'live') return `View ${hub.city} →`;
  return 'Coming soon';
}

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
  return locationById.get(id);
}

/**
 * Match a wedding shoot slug to a live location page
 * (e.g. florence-sc-wedding-glenview-farms → Florence).
 */
export function getLiveWeddingLocationForShoot(
  shootSlug: string,
): WeddingLocation | undefined {
  const live = [...getLiveWeddingLocations()].sort(
    (a, b) => b.id.length - a.id.length,
  );
  const direct = live.find(
    (location) =>
      shootSlug === location.id ||
      shootSlug.startsWith(`${location.id}-`),
  );
  if (direct) return direct;

  const spokes = [...WEDDING_LOCATIONS]
    .filter((location) => location.linksTo)
    .sort((a, b) => b.id.length - a.id.length);
  const spoke = spokes.find(
    (location) =>
      shootSlug === location.id ||
      shootSlug.startsWith(`${location.id}-`),
  );
  if (spoke?.linksTo) {
    const hub = locationById.get(spoke.linksTo);
    if (hub?.status === 'live') return hub;
  }

  return undefined;
}
