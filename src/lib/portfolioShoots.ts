/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * title       — shown under the shoot polaroid + used in page title & image alt text
 * description — optional; used for SEO meta description & blurb on the shoot page
 * name        — optional; couple/client names (e.g. "The Lees", "Jessica & Gage") for
 *               personalized copy on weddings & engagements when known
 * venue       — optional; venue or location name (e.g. "Murphy Farm", "Sawtooth Acres")
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Display title, e.g. "South Carolina Wedding" */
  title: string;
  /** SEO & on-page blurb, e.g. "An intimate wedding in Florence, SC…" */
  description?: string;
  /**
   * Optional couple or client name for personalized copy
   * (e.g. "The Lees", "Jessica & Gage") — mainly weddings & engagements.
   */
  name?: string;
  /** Optional venue or place name (e.g. "Murphy Farm", "Sawtooth Acres") */
  venue?: string;
};

/**
 * Short polaroid caption — first names only when `name` is set
 * (e.g. "Carly & Drew Nash" → "Carly & Drew").
 */
export function shootGalleryLabel(shoot: PortfolioShootDef): string {
  const raw = shoot.name?.trim();
  if (!raw) return shoot.title;

  const normalized = raw.replace(/\s+and\s+/gi, ' & ');
  const parts = normalized.split(/\s*&\s*/).map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0]!.split(/\s+/)[0]!;
    const second = parts[1]!.split(/\s+/)[0]!;
    return `${first} & ${second}`;
  }

  return raw;
}

export const SHOOTS_BY_CATEGORY: Record<string, PortfolioShootDef[]> = {
  Weddings: [
    {
      slug: 'tennessee-wedding-emerald-ridge',
      title: 'Carly & Drew at Emerald Ridge',
      name: 'Carly & Drew Nash',
      venue: 'Emerald Ridge',
      description:
        "Carly & Drew Nash said I do at Emerald Ridge in Tennessee—honest light, real emotion, & the quiet in-between moments from vows through celebration.",
    },
    {
      slug: 'mount-pleasant-sc-wedding-dunes-west-golf-river-club',
      title: 'Tori & Michael at Dunes West Golf & River Club',
      name: 'Tori & Michael McKenzie',
      venue: 'Dunes West Golf & River Club',
      description:
        "Tori & Michael McKenzie celebrated at Dunes West Golf & River Club in Mount Pleasant, SC—soft coastal light, easy joy, & the in-between moments that made their day feel like them.",
    },
    {
      slug: 'patrick-sc-wedding-griggs-farm',
      title: 'Elena & Mike at Griggs Farm',
      name: 'Elena & Mike Dotson',
      venue: 'Griggs Farm',
      description:
        "Elena & Mike Dotson celebrated at Griggs Farm in Patrick, SC—natural light, genuine emotion, & the real moments from getting ready through the last dance.",
    },
    {
      slug: 'pamplico-sc-wedding-sawtooth-acres',
      title: 'Jessica & Gage at Sawtooth Acres',
      name: 'Jessica & Gage Norton',
      venue: 'Sawtooth Acres',
      description:
        "Jessica & Gage Norton’s vintage-meets-timeless day at Sawtooth Acres in Pamplico, SC—honest light, real emotion, & the quiet glances that make a wedding feel like home.",
    },
    {
      slug: 'florence-sc-wedding-glenview-farms',
      title: 'Madelyn & Max at Glenview Farms',
      name: 'Madelyn & Max Freeman',
      venue: 'Glenview Farms',
      description:
        "Madelyn & Max Freeman celebrated at Glenview Farms in Florence, SC—true-to-color light, barn warmth, & the honest in-between moments from getting ready through send-off.",
    },
    {
      slug: 'timmonsville-sc-wedding-the-cabin-at-old-spur',
      title: 'Baylee & Walker at The Cabin at Old Spur',
      name: 'Baylee & Walker Rogers',
      venue: 'The Cabin at Old Spur',
      description:
        "Baylee & Walker Rogers celebrated at The Cabin at Old Spur in Timmonsville, SC—cabin getting-ready jitters, tender family details, & soft light tucked back in the woods.",
    },
    {
      slug: 'latta-sc-wedding-parker-pines-lee',
      title: 'Talor & Houston at Parker Pines',
      name: 'Talor & Houston Lee',
      venue: 'Parker Pines',
      description:
        "Talor & Houston Lee’s modern white-barn wedding at Parker Pines in Latta, SC—natural light among the trees, honest emotion, & the real moments from getting ready through the last dance.",
    },
    {
      slug: 'latta-sc-wedding-parker-pines-flowers',
      title: 'Kendall & Dalton at Parker Pines',
      name: 'Kendall and Dalton Flowers',
      venue: 'Parker Pines',
      description:
        "Kendall & Dalton Flowers celebrated waterside vows at Parker Pines in Latta, SC—soft natural light by the pond, romantic details, & the quiet in-between moments from first look through celebration.",
    },
    {
      slug: 'darlington-sc-wedding-murphy-farms',
      title: 'Maddie & Dan at Murphy Farms',
      name: 'Maddie & Dan Galloway',
      venue: 'Murphy Farms',
      description:
        "Maddie & Dan Galloway’s cozy winter wedding at Murphy Farms in Darlington, SC—an open-field ceremony beside the pond, emerald bridesmaids, red & white florals, & golden-hour portraits by the water.",
    },
  ],
  Motherhood: [
    {
      slug: 'charleston-sc-motherhood',
      title: 'Charleston Beach Motherhood',
      name: '',
      venue: '',
      description:
        'Maternity portraits on the Charleston coast—soft sand, golden light, & gentle documentation of life before & after baby arrives.',
    },
    {
      slug: 'sullivans-island-motherhood',
      title: 'Sullivans Island Beach Motherhood',
      name: '',
      venue: '',
      description:
        'Beach maternity session on Sullivan\'s Island—ocean air, natural light, & calm portraits that honor the bump & anticipation.',
    },
    {
      slug: 'florence-sc-gender-reveal',
      title: 'Florence Intimate Gender Reveal',
      name: '',
      venue: '',
      description:
        'Intimate gender reveal photography in Florence, SC—joyful anticipation, soft natural light, & candid moments as you share the surprise with the people you love most.',
    },
  ],
  'Couples / Engagement': [
    {
      slug: 'charleston-sc-engagement',
      title: 'Charleston Beach Engagement',
      name: '',
      venue: '',
      description:
        'Charleston beach engagement photos—waves, shoreline strolls, & relaxed portraits where you can be yourselves.',
    },
    {
      slug: 'florence-sc-engagement',
      title: 'Downtown Florence Engagement',
      name: '',
      venue: '',
      description:
        'Downtown Florence engagement session—city streets at golden hour, easy laughs, & romantic portraits in natural light.',
    },
    {
      slug: 'lake-city-sc-engagement',
      title: 'Pee Dee River Engagement',
      name: '',
      venue: '',
      description:
        'Engagement photos along the Pee Dee River near Lake City—soft light, open water, & unhurried couples portraits.',
    },
  ],
  'Special Events': [
    {
      slug: 'hartsville-sc-prom',
      title: 'Prom Portraits',
      name: '',
      venue: '',
      description:
        'Hartsville prom portraits—polished, fun, & full of the excitement of the night, captured with natural warmth.',
    },
    {
      slug: 'florence-sc-birthday-party',
      title: 'Florence Birthday Party',
      name: '',
      venue: '',
      description:
        'Birthday party photography in Florence, SC—joyful details, candid smiles, & the little moments that make the celebration unforgettable.',
    },
  ],
  Family: [
    {
      slug: 'myrtle-beach-family',
      title: 'Myrtle Beach Family Shoot',
      name: '',
      venue: '',
      description:
        'Family portraits at Myrtle Beach—siblings, parents, & sandy toes in soft coastal light you\'ll want to frame for years.',
    },
    {
      slug: 'florence-sc-family',
      title: 'Florence Family Shoot',
      name: '',
      venue: '',
      description:
        'Family photography in Florence, SC—relaxed portraits with room to breathe, real laughs, & light that flatters your crew.',
    },
    {
      slug: 'marion-sc-family',
      title: 'Marion Family Shoot',
      name: '',
      venue: '',
      description:
        'Family session in Marion, SC—togetherness, natural light, & portraits that feel like your everyday love, not a stiff pose.',
    },
  ],
  Portraits: [
    {
      slug: 'hartsville-sc-senior-portraits',
      title: 'Hatsville Senior Portraits',
      name: '',
      venue: '',
      description:
        'Senior portraits in Hartsville, SC—confident, relaxed, & true to you, with natural light & room to simply be yourself.',
    },
    {
      slug: 'camden-sc-bridal-portraits',
      title: 'Camden Bridal Portraits',
      name: '',
      venue: '',
      description:
        'Bridal portraits in Camden, SC—soft light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
    {
      slug: 'latta-sc-bridal-portraits',
      title: 'Latta Bridal Portraits',
      name: '',
      venue: '',
      description:
        'Bridal portraits in Latta, SC—soft natural light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
    {
      slug: 'florence-sc-professional-portraits',
      title: 'Florence Professional Portraits',
      name: '',
      venue: '',
      description:
        'Professional portraits in Florence, SC—polished, approachable, & natural light for headshots, branding, & putting your best self forward.',
    },
  ],
};
