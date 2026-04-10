/**
 * Investment page — starting prices by session type.
 * Edit `startingAt` and copy anytime; amounts are placeholders until you set your real rates.
 */

export type InvestmentCategory = {
  /** Portfolio ?category= value (must match portfolioData category names) */
  portfolioCategory: string;
  name: string;
  tagline: string;
  startingAt: string;
  /** Short line under the price */
  coverage: string;
  description: string;
  /** Optional highlights */
  highlights?: string[];
  featured?: boolean;
};

export const INVESTMENT_CATEGORIES: InvestmentCategory[] = [
  {
    portfolioCategory: 'Weddings',
    name: 'Wedding',
    tagline: 'The whole celebration, start to finish',
    startingAt: 'Starting at $4,200',
    coverage: 'Typically 8–10 hours · customizable',
    description:
      'Getting ready through send-off—I stay close for vows, portraits, and the dance floor so the story of your day stays complete.',
    highlights: [
      'Timeline planning consult',
      'Edited high-resolution gallery',
      'Print rights for personal use',
    ],
    featured: true,
  },
  {
    portfolioCategory: 'Weddings',
    name: 'Elopement',
    tagline: 'Intimate vows, big heart',
    startingAt: 'Starting at $1,800',
    coverage: 'Half-day or micro-wedding · travel quoted separately',
    description:
      'For courthouse steps, mountaintop “I do”s, or a handful of witnesses—unhurried coverage focused on the two of you.',
    highlights: [
      'Flexible hours for small ceremonies',
      'Online gallery with download',
      'Add-ons for celebration dinners or portraits',
    ],
  },
  {
    portfolioCategory: 'Engagement',
    name: 'Engagement',
    tagline: 'Sweet on each other, on camera',
    startingAt: 'Starting at $450',
    coverage: 'About 1–1.5 hours · one location',
    description:
      'Front-porch light, downtown strolls, or the place you said yes—easy posing and lots of laughter.',
    highlights: [
      'Wardrobe & location tips beforehand',
      'Gallery ready in a few weeks',
      'Often bundled with wedding collections',
    ],
  },
  {
    portfolioCategory: 'Portraits',
    name: 'Portrait',
    tagline: 'You, your people, soft light',
    startingAt: 'Starting at $350',
    coverage: 'Family, maternity, senior, or solo · session-based',
    description:
      'Relaxed sessions built around connection—never a stiff studio hour. We’ll pick a time of day that flatters everyone.',
    highlights: [
      'Style guidance before we meet',
      'Private gallery to share',
      'Option to add extended time or locations',
    ],
  },
  {
    portfolioCategory: 'Special Events',
    name: 'Special event',
    tagline: 'Galas, milestones & brand moments',
    startingAt: 'Starting at $600',
    coverage: 'Hourly or half-day · scoped to your run-of-show',
    description:
      'Fundraisers, anniversaries, openings, or polished imagery for your business—documented with warmth and a steady hand.',
    highlights: [
      'Coverage tailored to your schedule',
      'Delivery timeline agreed in advance',
      'Licensing for web & print as needed',
    ],
  },
];
