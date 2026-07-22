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

export type ServiceSlug =
  | 'wedding-photography'
  | 'engagement-photography'
  | 'special-events-photography'
  | 'family-portrait-photography'
  | 'motherhood-photography'
  | 'portrait-photography';

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  portrait: string;
  /** Which service pages should show this review */
  services: ServiceSlug[];
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'Taylor is incredible to work with! She took our engagement photos, my bridal portraits, and our wedding photos. She made us feel so comfortable and made it feel like we were shooting with a friend. She took the best candids! There isn\'t a single photo that I don\'t love!',
    name: 'Riley Major',
    detail: 'Bridal & Wedding · 2025',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: [
      'wedding-photography',
      'engagement-photography',
      'portrait-photography',
    ],
  },
  {
    quote:
      'Taylor is truly amazing! She is personable, professional, and incredibly talented. From the very beginning, communication was easy and seamless. I shared my vision with her, and she not only understood it but exceeded every expectation I had. The entire photoshoot was fun, relaxed, and enjoyable, which made the experience even more special. Most importantly, the photos turned out absolutely beautiful. Taylor has a genuine gift for photography, and it shines through in both her work and the way she makes her clients feel comfortable. I couldn\'t be happier with our experience and highly recommend her to anyone looking for stunning photos and an exceptional photographer!',
    name: 'Kalayah Dowell',
    detail: 'Engagement pictures · 2025',
    portrait: '/images/Old Picutres/inspiration_3.jpg',
    services: ['engagement-photography'],
  },
  {
    quote:
      'Taylor has watched my daughter grow up through taking photos for our family. She has this gift that somehow manages to get my daughter to smile instead of just doing a silly face. I\'ve had photos done by other photographers but none compare to the ones I\'ve had done by Taylor. She has truly taken my favorite photos of my little family and she makes it fun! As a mom herself, she knows how to keep the kids attention without making the photos look forced. I highly recommend her.',
    name: 'Makala Mckenzie',
    detail: 'Family portraits · 2026',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'I have used Taylor for as long as I\'ve known her for my photos (we have some not so professional ones from when we were in high school). She\'s always had a heart to capture the moments that are so special. Very professional and very easy to work with!',
    name: 'Taylor Rowe',
    detail: 'Engagement pictures · 2026',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['engagement-photography'],
  },
  {
    quote:
      'Taylor is exceptionally talented and beautifully captured our family pictures. Thank you Taylor for your dedication and passion for creating beautiful memories for us. My sweet family and I appreciate your beautiful fun spirit and making our photo shoot so much fun and effortless! Thank you!',
    name: 'Susan Overstreet',
    detail: 'Family portraits · October 2025',
    portrait: '/images/Old Picutres/profile_1.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor was easy and fun to work with! She gets the shot and makes it stress free!',
    name: 'Brandy Duffy',
    detail: 'Client session · August 2025',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['portrait-photography', 'special-events-photography'],
  },
  {
    quote:
      'Taylor did a fantastic job at working with my family of 5 and making all of us comfortable in front of the camera. The photographs turned out beautiful and I\'d definitely recommend her to others!',
    name: 'Scarlett Brown',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/inspiration_2.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor is so sweet and professional! She made our family photo session a breeze! She gave great direction and my kids loved her. We also received our pictures back quickly and they are all beautiful! We will definitely be booking with her again.',
    name: 'Tiffany Renfroe',
    detail: 'Family portraits · August 2025',
    portrait: '/images/Old Picutres/inspiration_1.jpg',
    services: ['family-portrait-photography'],
  },
  {
    quote:
      'Taylor has taken my boys pictures since my oldest was born in 2021. She\'s always been patient with my kids and has been so easy to work with! Would 1000% recommend, I will prob never have anyone else take pictures for me besides her!',
    name: 'Courtney Carter',
    detail: 'Family & kids · July 2025',
    portrait: '/images/Old Picutres/profile_2.jpg',
    services: ['family-portrait-photography'],
  },
];

export function getTestimonialsForService(
  service: ServiceSlug,
): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) =>
    testimonial.services.includes(service),
  );
}
