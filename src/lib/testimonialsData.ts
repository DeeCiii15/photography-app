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
      'Taylor is exceptionally talented and beautifully captured our family pictures. Thank you Taylor for your dedication and passion for creating beautiful memories for us. My sweet family and I appreciate your beautiful fun spirit and making our photo shoot so much fun and effortless! Thank you!',
    name: 'Susan O.',
    detail: 'Family portraits · October 2025',
    portrait: '/images/Old Picutres/profile_1.jpg',
  },
  {
    quote:
      'Taylor was easy and fun to work with! She gets the shot and makes it stress free!',
    name: 'Brandy D.',
    detail: 'Client session · August 2025',
    portrait: '/images/Old Picutres/profile_2.jpg',
  },
  {
    quote:
      'Taylor did a fantastic job at working with my family of 5 and making all of us comfortable in front of the camera. The photographs turned out beautiful and I’d definitely recommend her to others!',
    name: 'Scarlett B.',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
  },
  {
    quote:
      'Taylor is so sweet and professional! She made our family photo session a breeze! She gave great direction and my kids loved her. We also received our pictures back quickly and they are all beautiful! We will definitely be booking with her again.',
    name: 'Tiffany R.',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/inspiration_1.jpg',
  },
  {
    quote:
      'Taylor has taken my boys pictures since my oldest was born in 2021. She’s always been patient with my kids and has been so easy to work with! Would 1000% recommend, I will prob never have anyone else take pictures for me besides her!',
    name: 'Courtney C.',
    detail: 'Family & kids · July 2025',
    portrait: '/images/Old Picutres/profile_2.jpg',
  },
  {
    quote:
      'I could not be more happy! I love your work and creative spirit! Thank you for bringing your vibe and personality to my wedding day—it truly made a difference.',
    name: 'Riley M.',
    detail: 'Bride · June 2025',
    portrait: '/images/Old Picutres/profile_1.jpg',
  },
];
