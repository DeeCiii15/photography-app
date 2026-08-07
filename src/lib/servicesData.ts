import {
  getCategoryByName,
  getShootCards,
  portfolioCategoryHref,
  shootCoverSrc,
  type PortfolioShootCard,
} from './portfolioData';
import {
  getTestimonialsForService,
  type ServiceSlug,
  type Testimonial,
} from './testimonialsData';
import { PRIMARY_CITY, PRIMARY_REGION, PRIMARY_STATE, PRIMARY_STATE_ABBR } from './siteConfig';

export type { ServiceSlug };

export type ServiceFaq = {
  question: string;
  answer: string;
  /** Optional link rendered after the answer text */
  link?: { href: string; label: string };
  /** Text after an optional link (so the sentence can continue) */
  answerAfter?: string;
};

export type ServiceVenueLocation = {
  /** Short display name */
  name: string;
  /** Quieter city/region line */
  detail?: string;
  /** Google Maps search query — omit for non-mappable items like “YOUR wedding venue” */
  mapsQuery?: string;
};

export type ServiceVenueCategory = {
  name: string;
  locations: ServiceVenueLocation[];
};

export type ServiceVenueSuggestions = {
  /** Section H2 — defaults to engagement venues heading when omitted */
  heading?: string;
  intro: string;
  categories: ServiceVenueCategory[];
};

export type ServiceDef = {
  slug: ServiceSlug;
  /** Page H1 / display name, e.g. "Wedding Photography" */
  name: string;
  /** Shorter label for nav, e.g. "Weddings" */
  navLabel: string;
  /**
   * Phrase used in “Straight answers about…” / “What they say about…”
   * Defaults to lowercased `navLabel` when omitted.
   */
  copyTopic?: string;
  /** Portfolio category name — must match portfolioData */
  portfolioCategory: string;
  /** Small label above the display line; omit when `serviceNameAsH1` is set */
  eyebrow?: string;
  /**
   * When true, `name` is the page H1 (eyebrow styling) and `headline` +
   * `headlineAccent` render as the large display line without being an H1.
   */
  serviceNameAsH1?: boolean;
  headline: string;
  headlineAccent: string;
  intro: string;
  /** Optional lead paragraph shown before intro */
  introLead?: string;
  body: string;
  faqs: ServiceFaq[];
  /** Optional hero image override for the service page header */
  heroImage?: string;
  /** Optional suggested session locations (e.g. engagement venues) */
  venueSuggestions?: ServiceVenueSuggestions;
  /** Slugified blog tags that relate to this service */
  blogTags: string[];
  /** Slugified blog categories that relate to this service */
  blogCategories: string[];
  ctaHeadline: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
};

export const SERVICE_DEFS: ServiceDef[] = [
  {
    slug: 'wedding-photography',
    name: 'Wedding Photography',
    navLabel: 'Weddings',
    portfolioCategory: 'Weddings',
    eyebrow: 'Wedding photography',
    headline: 'Telling the story of your day through images you will cherish',
    headlineAccent: 'forever',
    intro:
      'From getting ready to final dance and send off, I stay there every step of the way, keeping distance during the big moments and getting close during the intimate ones. You will receive a digital gallery that feels just as real as every moment you lived on your special day.',
    body:
      'Combining documentary style with perfect posing, your images will feel timeless while also capturing the essence of your day. True to color, vibrant and warm every moment, big and small. Whether we are staying close to home in the Pee Dee or you’re getting married elsewhere, I come to you near or far.',
    faqs: [
      {
        question: 'How far ahead should I reach out?',
        answer:
          "Weddings & busy seasons fill up fast—I love at least a few months' notice when we can swing it. That said, if your heart is set on something sooner, still write me. If I can make it work, I will.",
      },
      {
        question: "What's included when we work together?",
        answer:
          'You get my time, my care, & a full set of edited images in a private online gallery you can share with your mama, your best friend, & anyone else who’s been cheering you on.',
      },
      {
        question: 'Will you travel for my day?',
        answer:
          "Oh, honey, yes—I'm based in Florence & photograph across the Pee Dee, from Hartsville & Darlington to Marion, Dillon, & beyond. Travel outside the region is quoted kindly based on mileage or lodging, & we'll talk through all of that before you ever sign anything.",
      },
      {
        question: 'When will my gallery be ready?',
        answer:
          'Standard sessions have a 2–3 week turnaround, while other special events like weddings have an 8–10 week turnaround.',
      },
      {
        question: 'Do you offer payment plans?',
        answer:
          'I do. A retainer holds your date, & the rest can be split into installments so you can breathe easy while you plan the rest of your celebration.',
      },
      {
        question: 'Can I share a shot list or Pinterest board?',
        answer:
          'Please do! I want to know what makes your heart race. We’ll blend your must-haves with the candid, in-between frames I’m always watching for.',
      },
      {
        question: 'What if it rains or the weather turns?',
        answer:
          'We pivot with grace—porches, cozy interiors, clear umbrellas, or a new date if that feels right. Some of my softest portraits happened on misty afternoons.',
      },
    ],
    blogTags: ['weddings'],
    blogCategories: ['weddings', 'wedding-planning'],
    ctaHeadline: 'Ready to talk about your wedding day?',
    ctaButton: 'Check your date',
    metaTitle: `Wedding Photography | Taylor Rose Reels`,
    metaDescription: `Documentary wedding photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—true-to-color galleries, honest emotion, & timeless coverage from vows to last dance.`,
  },
  {
    slug: 'engagement-photography',
    name: 'Engagement Photography',
    navLabel: 'Engagements',
    portfolioCategory: 'Couples / Engagement',
    serviceNameAsH1: true,
    headline: 'Sweet on each other, on camera—wherever you feel',
    headlineAccent: 'most yourselves',
    introLead:
      'Moments together before the wedding whirlwind. Let’s create the start of your love story somewhere that feels like you.',
    intro:
      'The Myrtle Beach ocean air, the strolls in downtown Florence, or the back-road fields on Oates Highway—it doesn’t have to be the perfect location, just perfect to you.',
    body:
      'As your engagement photographer, I come ready to prompt and direct you for documentary-style engagement photos that are authentic & capture a moment in time you’ll look back on years from now. Most sessions run about 30 minutes to 90 minutes at one location, with wardrobe & timing tips provided ahead of time.',
    heroImage:
      '/images/galleries/couples-engagement/florence-sc-engagement/cover.jpg',
    faqs: [
      {
        question: 'Where should we take engagement photos?',
        answer:
          'Anywhere that means something to you—a favorite park, downtown street, the lake, or the coast. For ideas, start with my ',
        link: {
          href: '#suggested-venues',
          label: 'Suggested engagement venues',
        },
        answerAfter:
          ' above—beach, urban, & additional spots I’ve loved. We can also scout together for the best light.',
      },
      {
        question: 'What should we wear?',
        answer:
          'I’ll provide a style guide & tips if requested—but most importantly, wear whatever feels comfortable to you.',
      },
      {
        question: 'Can we include our dog?',
        answer:
          'Please do! Pets make sessions more fun & more “you.” Just let me know ahead of time so we pick a location that’s pet-friendly.',
      },
      {
        question: 'Is an engagement session included with wedding coverage?',
        answer:
          'Many wedding collections include or discount an engagement session. Ask when you inquire—I’m happy to bundle them so you get comfortable before the big day.',
      },
    ],
    venueSuggestions: {
      heading: `Suggested engagement venues in and around ${PRIMARY_CITY}`,
      intro:
        'Here are some locations I’ve found are great for engagement sessions. Tap a category to browse, & open a place in Maps when you want to scout it.',
      categories: [
        {
          name: 'Beach locations',
          locations: [
            {
              name: 'Huntington Beach State Park',
              detail: 'Myrtle Beach area, South Carolina',
              mapsQuery: 'Huntington Beach State Park Murrells Inlet SC',
            },
            {
              name: 'Sullivan’s Island',
              detail: 'South Carolina',
              mapsQuery: 'Sullivan’s Island South Carolina',
            },
            {
              name: 'Sunset Beach Town Park',
              detail: 'Sunset Beach, North Carolina',
              mapsQuery: 'Sunset Beach Town Park Sunset Beach NC',
            },
            {
              name: 'Fort Sumter',
              detail: 'Charleston Harbor, South Carolina',
              mapsQuery: 'Fort Sumter National Historical Park Charleston SC',
            },
            {
              name: 'Fort Moultrie',
              detail: 'Sullivan’s Island, South Carolina',
              mapsQuery:
                'Fort Moultrie National Historical Park Sullivan’s Island SC',
            },
          ],
        },
        {
          name: 'Urban locations',
          locations: [
            {
              name: 'Downtown Charleston',
              detail: 'South Carolina',
              mapsQuery: 'Downtown Charleston South Carolina',
            },
            {
              name: 'Downtown Florence',
              detail: 'South Carolina',
              mapsQuery: 'Downtown Florence South Carolina',
            },
            {
              name: 'Florence County Library',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Florence County Library Florence SC',
            },
            {
              name: 'Hague-Porter Park',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Hague-Porter Park Florence SC',
            },
          ],
        },
        {
          name: 'Additional locations',
          locations: [
            {
              name: 'YOUR wedding venue',
              detail: 'Wherever you’re saying I do',
            },
            {
              name: 'The Terraces',
              detail: 'Camden, South Carolina',
              mapsQuery: 'The Terraces Camden SC',
            },
            {
              name: 'Moore’s Farms',
              detail: 'Lake City, South Carolina',
              mapsQuery: 'Moore’s Farms Lake City SC',
            },
            {
              name: 'Timrod Park',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Timrod Park Florence SC',
            },
            {
              name: 'FMU',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Francis Marion University Florence SC',
            },
            {
              name: 'Collins Grove',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Collins Grove Florence SC',
            },
            {
              name: 'Forest Lake Greenhouse',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Forest Lake Greenhouse Florence SC',
            },
          ],
        },
      ],
    },
    blogTags: ['engagement', 'couples'],
    blogCategories: [],
    ctaHeadline: 'Let’s plan your engagement session',
    ctaButton: 'Send an inquiry',
    metaTitle: `Engagement Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Engagement & couples photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—natural light, easy posing, & galleries that feel like you.`,
  },
  {
    slug: 'special-events-photography',
    name: 'Special Events Photography',
    navLabel: 'Special Events',
    portfolioCategory: 'Special Events',
    serviceNameAsH1: true,
    headline: 'Galas, milestones, & the moments that deserve to be',
    headlineAccent: 'remembered',
    heroImage:
      '/images/galleries/special-events/hartsville-sc-prom/12.jpg',
    introLead:
      'Your special events and sweet milestones deserve to be remembered.',
    intro:
      'Prom night photos in Kalmia Gardens, birthday celebrations at El Venue in downtown Florence, your wedding rehearsal at your childhood home in Hartsville—no matter the event, I’d love to be your photographer and help make it special.',
    body:
      'Remembering the energy in the room of your little one’s third birthday party or the slowness at your wedding rehearsal the night before your big day—I’ll sit back and photograph every detail from beginning to end. We’ll agree on timeline and key moments to hit so that you receive a gallery that feels curated to your special event.',
    faqs: [
      {
        question: 'What kinds of events do you cover?',
        answer:
          'Proms, milestone birthdays, anniversaries, fundraisers, brand launches, & corporate gatherings. If it’s a celebration or polished occasion worth remembering, reach out—we’ll scope it together.',
      },
      {
        question: 'What should we wear?',
        answer:
          'I’ll provide a style guide & tips if requested—but most importantly, wear whatever feels comfortable to you.',
      },
      {
        question: 'How do you quote special events?',
        answer:
          'Most events are scoped hourly or as a half-day block, depending on the schedule. I’ll quote based on your run-of-show, number of locations, & delivery needs.',
      },
      {
        question: 'How quickly will photos be ready?',
        answer:
          'Turnaround is agreed in advance—often 2–4 weeks for events, with rush options when you need images sooner for social or press.',
      },
    ],
    venueSuggestions: {
      heading: 'Wherever feels meaningful',
      intro:
        'For your special events, I recommend the location should be wherever feels meaningful to you and your milestone. However, if you need suggestions, just ask—I’m happy to give direction.',
      categories: [],
    },
    blogTags: ['events', 'special-events'],
    blogCategories: [],
    ctaHeadline: 'Planning something worth documenting?',
    ctaButton: 'Tell me about your event',
    metaTitle: `Special Event Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Event photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—proms, celebrations, brand moments, & milestones captured with polish & warmth.`,
  },
  {
    slug: 'family-portrait-photography',
    name: 'Family Portrait Photography',
    navLabel: 'Family',
    copyTopic: 'family portraits',
    portfolioCategory: 'Family',
    serviceNameAsH1: true,
    headline: 'Your people and warm light that captures the coziness of your',
    headlineAccent: 'sweet family',
    intro:
      'I love shooting relaxed family sessions in and around Florence and the Pee Dee area. My sessions are structured around connection and not a stiff hour in a studio. We’ll pick a time that works for your family and let everyone relax and be themselves.',
    body:
      'As a mom of three little ones, I know the importance of capturing these fleeting years, but as a photographer, I also know how to keep the babies engaged and happy. Whether it’s annual family portraits at Collins Grove or a special milestone captured at Timrod Park, I specialize in remembering the essence of your family, exactly how you will remember these days 20 years from now.',
    faqs: [
      {
        question: 'How long is a typical family session?',
        answer:
          'Most family sessions run 45 minutes to an hour—long enough for variety, short enough that everyone stays happy. Extended time or a second location can be added if you’d like more options.',
      },
      {
        question: 'What if my kids don’t sit still?',
        answer:
          'That’s perfectly fine—some of my favorite frames come from movement, giggles, & the in-between. I’ll follow their energy instead of fighting it.',
      },
      {
        question: 'Where do family sessions take place?',
        answer:
          'Outdoors in golden light is my favorite—parks, fields, beaches, or your own yard. I’ll help you pick a spot that suits your family’s style & the season.',
      },
      {
        question: 'What should we wear?',
        answer:
          'Coordinating neutrals & soft tones photograph beautifully. Avoid loud logos & matchy-matchy outfits. I send a quick guide before your session so everyone feels prepared.',
      },
    ],
    venueSuggestions: {
      heading: `Suggested family portrait locations in and around ${PRIMARY_CITY}`,
      intro:
        'Here are some places I’ve loved for family sessions. Tap a category to browse, & open a spot in Maps when you want to scout it—or we can shoot right at home if that feels most authentic.',
      categories: [
        {
          name: 'Favorite family spots',
          locations: [
            {
              name: 'Kalmia Gardens',
              detail: 'Hartsville, South Carolina',
              mapsQuery: 'Kalmia Gardens Hartsville SC',
            },
            {
              name: 'Timrod Park',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Timrod Park Florence SC',
            },
            {
              name: 'FMU',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Francis Marion University Florence SC',
            },
            {
              name: 'Moore’s Farms',
              detail: 'Lake City, South Carolina',
              mapsQuery: 'Moore’s Farms Lake City SC',
            },
            {
              name: 'Collins Grove',
              detail: 'Florence, South Carolina',
              mapsQuery: 'Collins Grove Florence SC',
            },
            {
              name: 'Right at home',
              detail: 'Wherever feels most authentic to your family',
            },
          ],
        },
      ],
    },
    blogTags: ['family'],
    blogCategories: [],
    ctaHeadline: 'Ready for new family portraits?',
    ctaButton: 'Book a session',
    metaTitle: `Family Portrait Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Family portrait photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—relaxed sessions, golden light, & galleries that feel authentic.`,
  },
  {
    slug: 'motherhood-photography',
    name: 'Maternity and Newborn Photography',
    navLabel: 'Motherhood',
    copyTopic: 'maternity and newborn photography',
    portfolioCategory: 'Motherhood',
    serviceNameAsH1: true,
    headline: 'The pregnancy glow, the growing bump, and the wonder before and after baby',
    headlineAccent: 'arrives',
    intro:
      'Maternity sessions, gender reveals, newborn sessions, or updated family portraits with your new arrival—the whole season of motherhood deserves to be timelessly captured.',
    body:
      'These sessions are unhurried, intimate, and you can even ask me about my motherhood package.',
    faqs: [
      {
        question: 'When is the best time for maternity photos?',
        answer:
          'Most mamas book between 30–34 weeks when the bump is beautifully round but you’re still comfortable. We can always adjust based on how you’re feeling.',
      },
      {
        question: 'Can my spouse or older children join?',
        answer:
          'Yes—some of the sweetest images include the people waiting to meet this baby. Let me know who’s coming & we’ll plan accordingly.',
      },
      {
        question: 'What should I wear for my maternity session?',
        answer:
          'I’ll provide a style guide & tips if requested—but most importantly, wear whatever feels comfortable to you.',
      },
      {
        question: 'Do you offer gender reveal coverage?',
        answer:
          'I do—whether it’s an intimate moment with close family or a bigger celebration. We’ll talk through the reveal plan so I’m in the right place at the right time.',
      },
    ],
    blogTags: ['motherhood', 'maternity'],
    blogCategories: [],
    ctaHeadline: 'Want to remember this season?',
    ctaButton: 'Reach out',
    metaTitle: `Maternity and Newborn Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE} | Taylor Rose Reels`,
    metaDescription: `Maternity & newborn photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—gentle sessions for bump, gender reveals, & the season before baby.`,
  },
  {
    slug: 'portrait-photography',
    name: 'Portrait Photography',
    navLabel: 'Portraits',
    portfolioCategory: 'Portraits',
    eyebrow: 'Portrait photography',
    headline: 'Just you—soft light & room to breathe—portraits that feel like a',
    headlineAccent: 'compliment',
    intro:
      'Senior portraits, bridal portraits, professional headshots, & solo sessions—unhurried time in flattering light so you leave feeling seen, not staged.',
    body:
      'Portraits shouldn’t feel like a performance. I’ll help with posing when you want direction & give you space when the light is doing the work. Most sessions are about an hour at one location, with guidance on wardrobe & timing sent ahead.',
    faqs: [
      {
        question: 'What types of portrait sessions do you offer?',
        answer:
          'Senior portraits, bridal portraits, professional headshots, & personal branding images. If you’re not sure which category fits, just describe what you need—I’ll help you plan it.',
      },
      {
        question: 'How should I prepare for a portrait session?',
        answer:
          'Wear something that makes you feel confident, get a good night’s sleep, & trust that I’ll guide you through the rest. I send location & timing tips before we meet.',
      },
      {
        question: 'Can I use these photos for work or social media?',
        answer:
          'Yes—galleries include print rights for personal use, & commercial licensing can be arranged for professional headshots or branding work.',
      },
      {
        question: 'Do you offer mini sessions?',
        answer:
          'Seasonal mini sessions are announced on social media when available. For custom portrait time, a full session gives us the most flexibility & variety.',
      },
    ],
    blogTags: ['portraits', 'senior-portraits', 'bridal'],
    blogCategories: [],
    ctaHeadline: 'Ready for portraits that feel like you?',
    ctaButton: 'Get in touch',
    metaTitle: `Portrait Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Portrait photographer in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—senior, bridal, professional, & personal sessions in natural light.`,
  },
];

export function serviceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

export const FOOTER_SERVICE_LINKS = SERVICE_DEFS.map((service) => ({
  label: service.navLabel,
  href: serviceHref(service.slug),
}));

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return SERVICE_DEFS.find((service) => service.slug === slug);
}

export function getServiceByPortfolioCategory(
  categoryName: string,
): ServiceDef | undefined {
  return SERVICE_DEFS.find(
    (service) => service.portfolioCategory === categoryName,
  );
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return SERVICE_DEFS.map((service) => service.slug);
}

export function getServiceShootCards(service: ServiceDef): PortfolioShootCard[] {
  return getShootCards(service.portfolioCategory);
}

export function getServicePortfolioHref(service: ServiceDef): string {
  const category = getCategoryByName(service.portfolioCategory);
  return category ? portfolioCategoryHref(category.folder) : '/portfolio';
}

export function getServiceTestimonials(service: ServiceDef): Testimonial[] {
  return getTestimonialsForService(service.slug);
}

export function getServiceHeroImage(service: ServiceDef): string {
  if (service.heroImage) return service.heroImage;
  const category = getCategoryByName(service.portfolioCategory);
  if (!category) return '/images/wedding_1.jpg';
  if (category.shoots.length > 0) {
    return shootCoverSrc(category.folder, category.shoots[0]!);
  }
  return category.coverSrc;
}
