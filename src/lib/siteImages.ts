/**
 * Site imagery — built around your inspiration set (field, arch, moodboards, film).
 * Paths are under public/.
 */

/** Full-bleed hero rotation — files live in public/images/ (see filenames there) */
export const HERO_SLIDES = [
  {
    src: '/images/hero_1.jpg',
    objectPosition: 'center 25%',
  },
  {
    src: '/images/hero_3.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_2.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_4.jpg',
    objectPosition: 'center center',
  },
  {
    src: '/images/hero_5.jpg',
    objectPosition: 'center center',
  },

] as const;

export const SITE_IMAGES = {
  /** Legacy single-hero paths (triptych uses mood*) */
  heroField: '/images/inspiration_2.jpg',
  heroArch: '/images/inspiration_1.png',
  /** Home triptych — three inspiration frames */
  moodField: '/images/inspiration_1.png',
  moodArch: '/images/inspiration_2.jpg',
  moodFilm: '/images/inspiration_3.jpg',
  /** You behind the camera */
  photographer: '/images/Taylor_site.jpg',
  /** Contact page — Taylor_site_1 */
  contactPhoto: '/images/Taylor_site_1.jpg',
  contactSidebar: '/images/Old Picutres/inspiration_2.jpg',
} as const;
