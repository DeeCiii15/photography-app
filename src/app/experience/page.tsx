import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import TestimonialsSection from '../components/TestimonialsSection';
import ExperienceProcessPostIt from '../components/ExperienceProcessPostIt';
import Image from 'next/image';
import Link from 'next/link';
import { EXPERIENCE_FAQS, EXPERIENCE_PROCESS_STEPS } from '@/lib/experienceData';
import { SITE_IMAGES } from '@/lib/siteImages';

export const metadata: Metadata = {
  title: 'Experience | Taylor Rose Reels',
  description:
    'What to expect from inquiry to gallery—plus answers to common questions and words from past clients.',
};

function FaqChevron() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-coral transition-transform duration-200 group-open:rotate-180 dark:text-[#d4a574]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <section className="scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2px] bg-[#e8e3db] shadow-[0_12px_36px_rgba(61,52,44,0.1)] ring-1 ring-[#e8e3db] dark:bg-boho-bark dark:ring-boho-stone/35 lg:col-span-5 lg:mx-0 lg:max-w-none">
              <Image
                src={SITE_IMAGES.photographer}
                alt="Taylor — photographer"
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 90vw, 42vw"
                priority
              />
            </div>
            <div className="lg:col-span-7">
              <p className="section-eyebrow text-boho-sage">The experience</p>
              <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]">
                From first note to{' '}
                <span className="italic font-normal text-coral">final frame</span>
              </h1>
              <p className="mt-6 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                Here’s the general path most clients travel—unhurried, kind, and
                built around you. Every wedding and session is a little
                different, but the heart of it stays the same: you should always
                know what happens next.
              </p>
            </div>
          </div>
        </section>

        <section
          className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-24"
          aria-labelledby="process-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="section-eyebrow text-boho-sage">How we move</p>
            <h2
              id="process-heading"
              className="mt-4 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl"
            >
              What you can generally expect
            </h2>
            <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
              In my own words—the rhythm that keeps things calm on your side of
              the camera.
            </p>
            <ol className="mt-12 space-y-10">
              {EXPERIENCE_PROCESS_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/95 p-8 shadow-[0_8px_28px_rgba(61,52,44,0.05)] ring-1 ring-[#e8e3db]/85 dark:border-boho-stone/40 dark:bg-boho-bark/55 dark:ring-boho-stone/25 sm:p-10"
                >
                  <div
                    className={`flex flex-col gap-8 sm:items-start sm:gap-10 lg:flex-row lg:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-6">
                        <span
                          className="font-display text-4xl tabular-nums leading-none text-coral/45 dark:text-[#d4a574]/55 sm:w-14 sm:shrink-0 sm:text-5xl"
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-xl font-medium text-cream-dark dark:text-cream sm:text-2xl">
                            {step.title}
                          </h3>
                          <p className="mt-4 font-body text-base font-light leading-[1.85] text-cream-dark/85 dark:text-cream/82">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ExperienceProcessPostIt
                      src={step.postItSrc}
                      alt={step.postItAlt}
                      stepNumber={index + 1}
                      rotationIndex={index}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="scroll-mt-24 border-t border-[#e0d9ce] bg-[#f4f1eb] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-ink sm:px-10 lg:px-16 lg:py-24"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-3xl">
            <p className="section-eyebrow text-boho-sage">Questions</p>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl"
            >
              Straight answers
            </h2>
            <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
              Tap any row to read more—one topic at a time so the page stays easy
              on the eyes.
            </p>
            <div className="mt-12 space-y-3">
              {EXPERIENCE_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-[#e0d9ce] bg-[#faf8f4]/95 shadow-sm ring-1 ring-[#e8e3db]/80 transition-[box-shadow] open:shadow-[0_12px_32px_rgba(61,52,44,0.08)] dark:border-boho-stone/40 dark:bg-boho-bark/50 dark:ring-boho-stone/25 dark:open:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg leading-snug text-cream-dark marker:content-none sm:px-8 sm:py-6 sm:text-xl dark:text-cream [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 pr-2">{faq.question}</span>
                    <FaqChevron />
                  </summary>
                  <div className="border-t border-[#e0d9ce] px-6 pb-6 pt-5 font-body text-base font-light leading-[1.85] text-cream-dark/88 dark:border-boho-stone/35 dark:text-cream/84 sm:px-8 sm:pb-8 sm:pt-6">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection id="testimonials" showContactCta={false} />

        <section className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-14 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-base font-light text-cream-dark/78 dark:text-cream/72">
              Ready for your own chapter?
            </p>
            <Link
              href="/contact"
              className="font-display mt-6 inline-flex rounded-full border border-boho-sage/30 bg-coral px-10 py-3.5 text-lg text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg dark:border-boho-stone/45"
            >
              Write me a note
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
