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
      slug: 'charleston-sc-motherhood-sullivans-island',
      title: 'Charleston Beach Motherhood',
      name: 'Kalayah and Chase at Sullivan\'s Island',
      venue: 'Sullivan\'s Island',
      description:
        'Maternity portraits on the Charleston coast—soft sand, golden light, & gentle documentation of life before & after baby arrives.',
    },
    {
      slug: 'sunset-beach-nc-motherhood',
      title: 'Carly and Drew at Sunset Beach',
      name: 'Carly and Drew',
      venue: 'Sunset Beach',
      description:
        'Beach maternity session on Sullivan\'s Island—ocean air, natural light, & calm portraits that honor the bump & anticipation.',
    },
    {
      slug: 'florence-sc-gender-reveal-anpov-studios',
      title: 'Peden and Quinton at AnPOV Studios',
      name: 'Peden and Quinton',
      venue: 'AnPOV Studios',
      description:
        'Intimate gender reveal photography in Florence, SC—joyful anticipation, soft natural light, & candid moments as you share the surprise with the people you love most.',
    },
  ],
  'Couples / Engagement': [
    {
      slug: 'charleston-sc-engagement-beach',
      title: 'Carrington and Jewitt at Charleston Beach',
      name: 'Carrington and Jewitt',
      venue: 'Charleston Beach',
      description:
        'Charleston beach engagement photos—waves, shoreline strolls, & relaxed portraits where you can be yourselves.',
    },
    {
      slug: 'florence-sc-engagement-downtown',
      title: 'Riley and Bradley in Downtown Florence',
      name: 'Riley and Bradley',
      venue: 'Downtown Florence',
      description:
        'Downtown Florence engagement session—city streets at golden hour, easy laughs, & romantic portraits in natural light.',
    },
    {
      slug: 'lake-city-sc-engagement-pee-dee-river',
      title: 'Hannah and Zac at Pee Dee River',
      name: 'Hannah and Zac',
      venue: 'Pee Dee River',
      description:
        'Engagement photos along the Pee Dee River near Lake City—soft light, open water, & unhurried couples portraits.',
    },
  ],
  'Special Events': [
    {
      slug: 'hartsville-sc-prom-kalmia-garden',
      title: 'Kings\'s Academy at Kalmia Garden',
      name: 'King\'s Academy',
      venue: 'Kalmia Garden',
      description:
        'Hartsville prom portraits—polished, fun, & full of the excitement of the night, captured with natural warmth.',
    },
    {
      slug: 'florence-sc-birthday-party-hayden-residence',
      title: 'Mary Tyler at Hayden Residence',
      name: 'Mary Tyler',
      venue: 'Hayden Residence',
      description:
        'Birthday party photography in Florence, SC—joyful details, candid smiles, & the little moments that make the celebration unforgettable.',
    },
    {
      slug: 'pamplico-sc-birthday-party-sawtooth-acres',
      title: 'Annie at Sawtooth Acres',
      name: 'Annie',
      venue: 'Sawtooth Acres',
      description:
        "Annie's birthday celebration at Sawtooth Acres in Pamplico, SC—joyful details, candid smiles, & the little moments that make the party feel like her.",
    },
    {
      slug: 'florence-sc-bridal-shower-the-rooster-one-thirty-six',
      title: 'Madeline at The Rooster One Thirty Six',
      name: 'Madeline',
      venue: 'The Rooster One Thirty Six',
      description:
        "Madeline's bridal shower at The Rooster One Thirty Six in Florence, SC—pretty details, warm laughter, & the sweet in-between moments with the people she loves most.",
    },
  ],
  Family: [
    {
      slug: 'sunset-beach-nc-family',
      title: 'The Hayden\'s at Sunset Beach',
      name: 'The Hayden\'s',
      venue: 'Sunset Beach',
      description:
        'Family portraits at Myrtle Beach—siblings, parents, & sandy toes in soft coastal light you\'ll want to frame for years.',
    },
    {
      slug: 'florence-sc-family',
      title: 'The Biddle\'s',
      name: 'The Biddle\'s',
      venue: 'Biddle Residence',
      description:
        'Family photography in Florence, SC—relaxed portraits with room to breathe, real laughs, & light that flatters your crew.',
    },
    {
      slug: 'marion-sc-family-francis-marion-university',
      title: 'The Bennet\'s at Francis Marion University',
      name: 'The Bennet\'s',
      venue: 'Francis Marion University',
      description:
        'Family session in Marion, SC—togetherness, natural light, & portraits that feel like your everyday love, not a stiff pose.',
    },
  ],
  Portraits: [
    {
      slug: 'hartsville-sc-senior-portraits-foxbrier',
      title: 'Grayson at Foxbrier',
      name: 'Grayson',
      venue: 'Foxbrier',
      description:
        'Senior portraits in Hartsville, SC—confident, relaxed, & true to you, with natural light & room to simply be yourself.',
    },
    {
      slug: 'camden-sc-bridal-portraits-the-terraces',
      title: 'Alli at The Terraces',
      name: 'Alli',
      venue: 'The Terraces',
      description:
        'Bridal portraits in Camden, SC—soft light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
    {
      slug: 'latta-sc-bridal-portraits-parker-pines',
      title: 'Ansley at Parker Pines',
      name: 'Ansley',
      venue: 'Parker Pines',
      description:
        'Bridal portraits in Latta, SC—soft natural light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
    {
      slug: 'florence-sc-professional-portraits-anpov-studios',
      title: 'Abby at AnPPOV Studios',
      name: 'Abby',
      venue: 'AnPOV Studios',
      description:
        'Professional portraits in Florence, SC—polished, approachable, & natural light for headshots, branding, & putting your best self forward.',
    },
  ],
};
