import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import BookingForm from '../components/BookingForm';
import Image from 'next/image';
import { SITE_IMAGES } from '@/lib/siteImages';

export const metadata: Metadata = {
  title: 'Contact | Taylor Rose Reels',
  description:
    'Reach out about your wedding, portrait session, or celebration—Taylor reads every message.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <section className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="section-eyebrow text-boho-sage">Contact</p>
            <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem] md:leading-[1.12]">
              Tell me about your day
            </h1>
            <p className="mt-5 max-w-lg font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 md:text-base">
              Share a date, a venue, or a feeling—I read every message myself.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
              <div className="relative hidden aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[#e8e3db] dark:bg-boho-ink sm:max-w-md lg:col-span-5 lg:block lg:aspect-auto lg:max-w-none lg:min-h-0 lg:h-full lg:rounded-2xl">
                <Image
                  src={SITE_IMAGES.contactPhoto}
                  alt="Taylor — photographer"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>
              <div className="flex min-h-0 flex-col lg:col-span-7">
                <div className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-visible rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/92 p-6 shadow-[0_12px_36px_rgba(61,52,44,0.06)] ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark/48 dark:ring-boho-stone/25 sm:p-8 md:p-10">
                  <BookingForm className="mx-0 max-w-xl" />
                </div>
              </div>
            </div>

            <a
              href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
              className="font-display mt-10 inline-block text-xl text-coral transition hover:text-coral-dark md:text-[1.65rem]"
            >
              hello@taylorrosereels.com
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
