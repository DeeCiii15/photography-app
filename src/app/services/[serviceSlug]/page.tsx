import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import SiteFooter from '../../components/SiteFooter';
import HomeStylePageIntro from '../../components/HomeStylePageIntro';
import TestimonialsSection from '../../components/TestimonialsSection';
import BlogPostCard from '../../components/BlogPostCard';
import ServiceFaqSection from '../../components/ServiceFaqSection';
import ServiceFaqJsonLd from '../../components/ServiceFaqJsonLd';
import ServiceGallerySection from '../../components/ServiceGallerySection';
import ServiceVenueSuggestions from '../../components/ServiceVenueSuggestions';
import WeddingLocationsMap from '../../components/WeddingLocationsMap';
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getServiceHeroImage,
  getServicePortfolioHref,
  getServiceShootCards,
  getServiceTestimonials,
  serviceHref,
} from '@/lib/servicesData';
import { getServiceBlogPosts } from '@/lib/servicesServer';

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: serviceHref(service.slug) },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: serviceHref(service.slug),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const shoots = getServiceShootCards(service);
  const blogPosts = getServiceBlogPosts(service);
  const testimonials = getServiceTestimonials(service);
  const heroImage = getServiceHeroImage(service);
  const portfolioHref = getServicePortfolioHref(service);
  const aboutTopic = service.copyTopic ?? service.navLabel.toLowerCase();

  return (
    <div className="min-h-screen bg-[#f4f1eb] dark:bg-boho-ink">
      <ServiceFaqJsonLd faqs={service.faqs} />
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <section className="scroll-mt-24 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2px] bg-[#e8e3db] shadow-[0_12px_36px_rgba(61,52,44,0.1)] ring-1 ring-[#e8e3db] dark:bg-boho-bark dark:ring-boho-stone/35 lg:col-span-5 lg:mx-0 lg:max-w-none">
              <Image
                src={heroImage}
                alt={`${service.name} by Taylor Rose Reels`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 42vw"
                priority
              />
            </div>
            <div className="lg:col-span-7">
              {service.serviceNameAsH1 ? (
                <>
                  <h1 className="section-eyebrow text-boho-sage">
                    {service.name}
                  </h1>
                  <p className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]">
                    {service.headline}{' '}
                    <span className="italic font-normal text-coral">
                      {service.headlineAccent}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  {service.eyebrow ? (
                    <p className="section-eyebrow text-boho-sage">
                      {service.eyebrow}
                    </p>
                  ) : null}
                  <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]">
                    {service.headline}{' '}
                    <span className="italic font-normal text-coral">
                      {service.headlineAccent}
                    </span>
                  </h1>
                </>
              )}
              {service.introLead ? (
                <p className="mt-6 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                  {service.introLead}
                </p>
              ) : null}
              <p
                className={`max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg ${
                  service.introLead ? 'mt-4' : 'mt-6'
                }`}
              >
                {service.intro}
              </p>
              <p className="mt-4 max-w-2xl font-body text-base font-light leading-[1.85] text-cream-dark/82 dark:text-cream/78 sm:text-lg">
                {service.body}
              </p>
              <Link
                href="/contact"
                className="font-display mt-8 inline-flex min-h-14 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-coral px-11 py-4 text-2xl text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg dark:border-boho-stone/45 sm:text-3xl"
              >
                {service.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        <ServiceGallerySection
          serviceName={service.name}
          portfolioHref={portfolioHref}
          shoots={shoots}
        />

        {service.venueSuggestions ? (
          <ServiceVenueSuggestions
            suggestions={service.venueSuggestions}
            surface="base"
          />
        ) : null}

        {service.slug === 'wedding-photography' && <WeddingLocationsMap />}

        {blogPosts.length > 0 && (
          <section
            className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-16 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-24"
            aria-labelledby="service-blog-heading"
          >
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-2xl text-center">
                <p className="section-eyebrow text-boho-sage">From the journal</p>
                <h2
                  id="service-blog-heading"
                  className="mt-4 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl"
                >
                  {service.slug === 'wedding-photography'
                    ? 'Wedding related reading'
                    : `${service.navLabel} related reading`}
                </h2>
                <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
                  Stories & tips connected to {service.navLabel.toLowerCase()}.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {blogPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        <ServiceFaqSection
          faqs={service.faqs}
          heading={`Straight answers about ${aboutTopic}`}
          surface={
            service.venueSuggestions || blogPosts.length > 0 ? 'soft' : 'base'
          }
        />

        <TestimonialsSection
          testimonials={testimonials}
          showContactCta={false}
          surface="base"
          eyebrow="Client words"
          heading={
            <>
              What they say about{' '}
              <span className="italic text-coral">{aboutTopic}</span>
            </>
          }
          description="Reviews from clients who trusted me with this kind of session. Tap a card to read the full review."
        />

        <section className="border-t border-[#e0d9ce] bg-[#f9f7f2] px-6 py-14 dark:border-boho-stone/40 dark:bg-boho-bark sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-base font-light text-cream-dark/78 dark:text-cream/72">
              {service.ctaHeadline}
            </p>
            <Link
              href="/contact"
              className="font-display mt-6 inline-flex min-h-14 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-coral px-11 py-4 text-2xl text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg sm:text-3xl dark:border-boho-stone/45"
            >
              {service.ctaButton}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
