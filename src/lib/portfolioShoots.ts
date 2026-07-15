/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * title       — shown under the shoot polaroid + used in page title & image alt text
 * description — optional; used for SEO meta description & blurb on the shoot page
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Display title, e.g. "South Carolina Wedding" */
  title: string;
  /** SEO & on-page blurb, e.g. "An intimate wedding in Florence, SC…" */
  description?: string;
};

export const SHOOTS_BY_CATEGORY: Record<string, PortfolioShootDef[]> = {
  Weddings: [
    {
      slug: 'tennessee-wedding',
      title: 'Tennessee Wedding',
      description:
        'Wedding photography in Tennessee—honest light, real emotion, & the quiet in-between moments from vows through celebration.',
    },
    {
      slug: 'mount-pleasant-sc-wedding',
      title: 'Mount Pleasant Wedding',
      description:
        'Wedding photography in Mount Pleasant, SC—honest light, real emotion, & the quiet in-between moments from vows through celebration.',
    },
    {
      slug: 'patrick-sc-wedding',
      title: 'Patrick Wedding',
      description:
        'Wedding photography in Patrick, SC—natural light, genuine emotion, & the real moments from getting ready through your last dance.',
    }, {
      slug: 'pamplico-sc-wedding',
      title: 'Pamplico Wedding',
      description:
        'Wedding photography in Pamplico, SC—honest light, real emotion, & the quiet in-between moments from vows through celebration.',
    },
    {
      slug: 'florence-sc-wedding',
      title: 'Florence Wedding',
      description:
        'Wedding photography in Florence, SC—natural light, true-to-color, & the honest in-between moments from getting ready through your last dance.',
    },
    {
      slug: 'timmonsville-sc-wedding',
      title: 'Timmonsville Wedding',
      description:
        'Wedding photography in Timmonsville, SC—a rustic cabin celebration full of natural light, first-look jitters, & the tender family details that make the day.',
    },
    {
      slug: 'latta-sc-wedding-the-lees',
      title: 'Latta Wedding — The Lees',
      description:
        'Wedding photography in Latta, SC—a modern white-barn celebration tucked into the trees, with natural light, honest emotion, & the real moments from getting ready through the last dance.',
    },
    {
      slug: 'latta-sc-wedding-the-flowers',
      title: 'Latta Wedding — The Flowers',
      description:
        'Wedding photography in Latta, SC—romantic waterside vows by the pond, soft natural light, & the quiet in-between moments from first look through celebration.',
    },
    {
      slug: 'darlington-sc-wedding',
      title: 'Darlington Wedding',
      description:
        'Wedding photography in Darlington, SC—a cozy winter celebration at Murphy Farm with an open-field ceremony beside the pond, emerald bridesmaids, red & white florals, & golden-hour portraits by the water from vows through the last dance.',
    }
  ],
  Motherhood: [
    {
      slug: 'charleston-sc-motherhood',
      title: 'Charleston Beach Motherhood',
      description:
        'Maternity portraits on the Charleston coast—soft sand, golden light, & gentle documentation of life before & after baby arrives.',
    },
    {
      slug: 'sullivans-island-motherhood',
      title: 'Sullivans Island Beach Motherhood',
      description:
        'Beach maternity session on Sullivan\'s Island—ocean air, natural light, & calm portraits that honor the bump & anticipation.',
    },
    {
      slug: 'florence-sc-gender-reveal',
      title: 'Florence Intimate Gender Reveal',
      description:
        'Intimate gender reveal photography in Florence, SC—joyful anticipation, soft natural light, & candid moments as you share the surprise with the people you love most.',
    }
  ],
  'Couples / Engagement': [
    {
      slug: 'charleston-sc-engagement',
      title: 'Charleston Beach Engagement',
      description:
        'Charleston beach engagement photos—waves, shoreline strolls, & relaxed portraits where you can be yourselves.',
    },
    {
      slug: 'florence-sc-engagement',
      title: 'Downtown Florence Engagement',
      description:
        'Downtown Florence engagement session—city streets at golden hour, easy laughs, & romantic portraits in natural light.',
    },
    {
      slug: 'lake-city-sc-engagement',
      title: 'Pee Dee River Engagement',
      description:
        'Engagement photos along the Pee Dee River near Lake City—soft light, open water, & unhurried couples portraits.',
    },
  ],
  'Special Events': [{
    slug: 'hartsville-sc-prom',
    title: 'Prom Portraits',
    description:
      'Hartsville prom portraits—polished, fun, & full of the excitement of the night, captured with natural warmth.',
  },
  {
    slug: 'florence-sc-birthday-party',
    title: 'Florence Birthday Party',
    description:
      'Birthday party photography in Florence, SC—joyful details, candid smiles, & the little moments that make the celebration unforgettable.',
  }],
  Family: [
    {
      slug: 'myrtle-beach-family',
      title: 'Myrtle Beach Family Shoot',
      description:
        'Family portraits at Myrtle Beach—siblings, parents, & sandy toes in soft coastal light you\'ll want to frame for years.',
    },
    {
      slug: 'florence-sc-family',
      title: 'Florence Family Shoot',
      description:
        'Family photography in Florence, SC—relaxed portraits with room to breathe, real laughs, & light that flatters your crew.',
    },
    {
      slug: 'marion-sc-family',
      title: 'Marion Family Shoot',
      description:
        'Family session in Marion, SC—togetherness, natural light, & portraits that feel like your everyday love, not a stiff pose.',
    },
  ],
  Portraits: [
    {
      slug: 'hartsville-sc-senior-portraits',
      title: 'Hatsville Senior Portraits',
      description:
        'Senior portraits in Hartsville, SC—confident, relaxed, & true to you, with natural light & room to simply be yourself.',
    },
    {
      slug: 'camden-sc-bridal-portraits',
      title: 'Camden Bridal Portraits',
      description:
        'Bridal portraits in Camden, SC—soft light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
    {
      slug: 'latta-sc-bridal-portraits',
      title: 'Latta Bridal Portraits',
      description:
        'Bridal portraits in Latta, SC—soft natural light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
    {
      slug: 'florence-sc-professional-portraits',
      title: 'Florence Professional Portraits',
      description:
        'Professional portraits in Florence, SC—polished, approachable, & natural light for headshots, branding, & putting your best self forward.',
    },
  ],
};
