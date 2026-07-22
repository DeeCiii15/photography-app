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
import { PRIMARY_CITY, PRIMARY_REGION, PRIMARY_STATE_ABBR } from './siteConfig';

export type { ServiceSlug };

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDef = {
  slug: ServiceSlug;
  /** Page H1 / display name, e.g. "Wedding Photography" */
  name: string;
  /** Shorter label for nav, e.g. "Weddings" */
  navLabel: string;
  /** Portfolio category name — must match portfolioData */
  portfolioCategory: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  body: string;
  faqs: ServiceFaq[];
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
    headline: 'The story of the day you’ll talk about',
    headlineAccent: 'forever',
    intro:
      'From getting ready through the last dance—I stay close for vows, portraits, & every little in-between moment so your gallery feels like the day actually felt.',
    body:
      'I work documentary-first: true-to-color, timeless images with room for laughter, tears, & the quiet glances you didn’t know anyone caught. Whether your celebration is in a barn in the Pee Dee or on the coast, I’ll meet you where you are & keep the pace unhurried.',
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
    metaTitle: `Wedding Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Documentary wedding photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—true-to-color galleries, honest emotion, & timeless coverage from vows to last dance.`,
  },
  {
    slug: 'engagement-photography',
    name: 'Engagement Photography',
    navLabel: 'Engagements',
    portfolioCategory: 'Couples / Engagement',
    eyebrow: 'Engagement photography',
    headline: 'Sweet on each other, on camera—wherever you feel',
    headlineAccent: 'most yourselves',
    intro:
      'Ocean waves, downtown strolls, or the porch where you said yes—I’ll meet you somewhere that feels like home & keep the session easy, unhurried, & full of laughter.',
    body:
      'Engagement sessions are a chance to slow down before the wedding whirlwind. I’ll guide you gently when you need it & step back when the moment is already happening. Most sessions run about an hour to ninety minutes at one location, with wardrobe & timing tips sent ahead of time.',
    faqs: [
      {
        question: 'Where should we take engagement photos?',
        answer:
          'Anywhere that means something to you—a favorite park, downtown street, the lake, or the coast. I’ll suggest spots around the Pee Dee if you’re unsure, & we can scout together for the best light.',
      },
      {
        question: 'What should we wear?',
        answer:
          'Comfortable clothes you feel good moving in. Coordinating—not matching—colors work beautifully. I’ll send a short style guide before we meet so you’re not guessing the morning of.',
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
    blogTags: ['engagement', 'couples'],
    blogCategories: [],
    ctaHeadline: 'Let’s plan your engagement session',
    ctaButton: 'Send an inquiry',
    metaTitle: `Engagement Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Relaxed engagement & couples photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—natural light, easy posing, & galleries that feel like you.`,
  },
  {
    slug: 'special-events-photography',
    name: 'Special Events Photography',
    navLabel: 'Special Events',
    portfolioCategory: 'Special Events',
    eyebrow: 'Special events photography',
    headline: 'Galas, milestones, & the moments that deserve to be',
    headlineAccent: 'remembered',
    intro:
      'Prom night, birthday celebrations, brand launches, & polished gatherings—I document the energy of the room with warmth & a steady hand.',
    body:
      'Every event has its own run-of-show. We’ll agree on coverage hours, key moments to hit, & delivery timeline before the day so you can focus on hosting—not worrying about the camera. Hourly & half-day options are available.',
    faqs: [
      {
        question: 'What kinds of events do you cover?',
        answer:
          'Proms, milestone birthdays, anniversaries, fundraisers, brand launches, & corporate gatherings. If it’s a celebration or polished occasion worth remembering, reach out—we’ll scope it together.',
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
    blogTags: ['events', 'special-events'],
    blogCategories: [],
    ctaHeadline: 'Planning something worth documenting?',
    ctaButton: 'Tell me about your event',
    metaTitle: `Special Event Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Event photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—proms, celebrations, brand moments, & milestones captured with polish & warmth.`,
  },
  {
    slug: 'family-portrait-photography',
    name: 'Family Portrait Photography',
    navLabel: 'Family',
    portfolioCategory: 'Family',
    eyebrow: 'Family portrait photography',
    headline: 'Your people, warm light, & love that doesn’t feel',
    headlineAccent: 'forced',
    intro:
      'Relaxed family sessions built around connection—not a stiff hour in a studio. We’ll pick a time of day that flatters everyone & let the kids be kids.',
    body:
      'As a mom myself, I know how to keep little ones engaged without making photos look posed. Whether it’s annual portraits on the porch or a milestone you want to remember, the goal is always the same: images that feel like your family on a good day.',
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
    blogTags: ['family'],
    blogCategories: [],
    ctaHeadline: 'Ready for new family portraits?',
    ctaButton: 'Book a session',
    metaTitle: `Family Portrait Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Natural family portrait photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—relaxed sessions, golden light, & galleries that feel authentic.`,
  },
  {
    slug: 'motherhood-photography',
    name: 'Motherhood Photography',
    navLabel: 'Motherhood',
    portfolioCategory: 'Motherhood',
    eyebrow: 'Motherhood photography',
    headline: 'That glow, the bump, & the wonder before & after baby',
    headlineAccent: 'arrives',
    intro:
      'Maternity, gender reveals, & the tender season of becoming a mama—documented gently, never rushed, with room for every feeling.',
    body:
      'These sessions are unhurried & intimate. Whether you’re celebrating a growing belly, revealing pink or blue, or wanting to remember this fleeting chapter, I’ll guide you softly & let the emotion lead.',
    faqs: [
      {
        question: 'When is the best time for maternity photos?',
        answer:
          'Most mamas book between 30–34 weeks when the bump is beautifully round but you’re still comfortable. We can always adjust based on how you’re feeling.',
      },
      {
        question: 'Can my partner or older children join?',
        answer:
          'Yes—some of the sweetest images include the people waiting to meet this baby. Let me know who’s coming & we’ll plan accordingly.',
      },
      {
        question: 'What should I wear for a maternity session?',
        answer:
          'Flowy dresses, soft neutrals, & anything that makes you feel beautiful. I have suggestions for local boutiques & can share a mood board before we meet.',
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
    metaTitle: `Motherhood & Maternity Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | Taylor Rose Reels`,
    metaDescription: `Maternity & motherhood photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—gentle sessions for bump, gender reveals, & the season before baby.`,
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
    metaDescription: `Portrait photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}—senior, bridal, professional, & personal sessions in natural light.`,
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
  const category = getCategoryByName(service.portfolioCategory);
  if (!category) return '/images/wedding_1.jpg';
  if (category.shoots.length > 0) {
    return shootCoverSrc(category.folder, category.shoots[0]!);
  }
  return category.coverSrc;
}
