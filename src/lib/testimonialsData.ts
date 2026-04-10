export const TESTIMONIAL_DECK_STYLES = [
  'translate-y-0',
  'translate-y-2 sm:translate-y-3',
  '-translate-y-1 sm:-translate-y-2',
  'translate-y-3 sm:translate-y-4',
  '-translate-y-2 sm:-translate-y-1',
  'translate-y-1 sm:translate-y-2',
] as const;

export const TESTIMONIAL_PASTE_TILTS = [
  '-rotate-[2.5deg]',
  'rotate-[2deg]',
  '-rotate-[1.5deg]',
  'rotate-[2.75deg]',
  '-rotate-[2deg]',
  'rotate-[1.25deg]',
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  portrait: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'She made me feel like the most beautiful version of myself—not stiff, not posed. Just me, on the best day of my life.',
    name: 'Sarah M.',
    detail: 'Summer wedding · North Georgia',
    portrait: '/images/Old Picutres/profile_1.jpg',
  },
  {
    quote:
      'Taylor has a gift for the quiet moments. Our gallery still makes me cry in the best way.',
    name: 'Jordan & Alex',
    detail: 'Elopement · Blue Ridge',
    portrait: '/images/Old Picutres/profile_2.jpg',
  },
  {
    quote:
      'I was so nervous for portraits—she talked me through everything and we laughed the whole time. Worth every penny.',
    name: 'Emily R.',
    detail: 'Bridal session',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
  },
  {
    quote:
      'The photos feel exactly like our day—warm, a little imperfect in the best way, and so unmistakably us.',
    name: 'Morgan K.',
    detail: 'Vow renewal · backyard',
    portrait: '/images/Old Picutres/inspiration_1.jpg',
  },
  {
    quote:
      'She remembered the tiny things we’d mentioned months ago. More like a friend who happens to carry a camera.',
    name: 'The Parkers',
    detail: 'Family portraits',
    portrait: '/images/Old Picutres/profile_2.jpg',
  },
  {
    quote:
      'Her eye for light is unreal. We’ve printed half the gallery and they’re all over the house.',
    name: 'Chris L.',
    detail: 'Engagement · downtown',
    portrait: '/images/Old Picutres/profile_1.jpg',
  },
];
