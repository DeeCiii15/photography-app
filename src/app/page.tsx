'use client';

import Navigation from './components/Navigation';
import BookingForm from './components/BookingForm';
import { useCalendly } from './components/CalendlyEmbed';
import Image from 'next/image';
import Link from 'next/link';
import { PORTFOLIO_HOME_CARDS } from '@/lib/portfolioData';
import { socialLinks } from '@/lib/social';

export default function Home() {
  const { openCalendly } = useCalendly();

  return (
    <div className="min-h-screen bg-cream-light dark:bg-gray-950">
      <Navigation />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* High-res Background Images */}
        <div className="absolute inset-0">
        <Image
            src="/images/hero-wedding.jpg"
            alt="Wedding photography hero"
            fill
          priority
            className="object-cover"
            quality={90}
            sizes="100vw"
        />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-tight drop-shadow-2xl">
              Capturing
              <br />
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Moments
              </span>
          </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Through the lens of artistry, every frame tells a story.
              Welcome to a world where light meets emotion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a
                href="/portfolio"
                className="px-8 py-4 bg-coral text-white rounded-full font-medium hover:bg-coral-dark transition-all duration-300 transform hover:scale-105 shadow-soft-lg"
              >
                View Portfolio
              </a>
            <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  openCalendly();
                }}
                className="px-8 py-4 border-2 border-white/90 text-white rounded-full font-medium hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-soft-lg cursor-pointer"
            >
                Upcoming Events
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <svg
            className="w-6 h-6 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-cream-light to-cream dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-cream-dark dark:text-cream mb-4">
              About Me
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg ring-4 ring-dusty-rose/50 dark:ring-gray-700/30">
              <Image
                src="/images/about-photographer-v2.jpg"
                alt="Female photographer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={false}
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-cream-dark dark:text-cream leading-relaxed">
                Taylor Rose Reels is more than just capturing images—it&apos;s about preserving
                moments, telling stories, and evoking emotions. Each photograph is a
                window into a unique perspective, a frozen moment in time that speaks
                to the soul.
              </p>
              <p className="text-lg md:text-xl text-cream-dark dark:text-cream leading-relaxed">
                With a passion for visual storytelling and an eye for detail, we strive
                to create images that resonate, inspire, and leave a lasting impression.
                Every shot is crafted with intention, every frame composed with care.
              </p>
              <p className="text-lg md:text-xl text-cream-dark dark:text-cream leading-relaxed">
                Whether it&apos;s a wedding, engagement, maternity session, or special event,
                we approach each project with dedication and creativity to ensure your
                memories are beautifully preserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Hero Section */}
      <section
        id="portfolio"
        className="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-cream-dark dark:text-cream mb-4">
              Portfolio
            </h2>
            <p className="text-lg md:text-xl text-cream-dark dark:text-cream max-w-2xl mx-auto">
              Explore our work across different photography styles and events
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {PORTFOLIO_HOME_CARDS.map((card) => (
              <Link
                key={card.name}
                href={card.href}
                className="group relative h-[380px] md:h-[450px] rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500 transform hover:scale-[1.02] ring-2 ring-dusty-rose/30 dark:ring-gray-700/20"
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 pb-6">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 min-h-[2.5rem] md:min-h-[3rem] flex items-end">
                    {card.name}
                  </h3>
                  <p className="text-sm md:text-base text-white/90 mb-3 min-h-[1.5rem] md:min-h-[1.75rem]">
                    {card.tagline}
                  </p>
                  <div className="flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Gallery</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-gray-950"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-cream-dark dark:text-cream mb-8">
            Get in Touch
          </h2>
          <p className="text-lg text-cream-dark dark:text-cream mb-12">
            Interested in a photoshoot or collaboration? Let&apos;s create something beautiful together.
          </p>
          <BookingForm />
          <div className="mt-12 pt-8 border-t border-dusty-rose dark:border-gray-700">
            <p className="text-sm text-cream-dark dark:text-cream mb-4">Or reach us directly</p>
            <a
              href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
              className="cursor-pointer touch-manipulation text-coral dark:text-cream hover:text-coral-dark dark:hover:text-cream transition-colors"
            >
              hello@taylorrosereels.com
            </a>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="#"
                className="text-coral dark:text-cream hover:text-coral-dark dark:hover:text-cream transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-coral dark:text-cream hover:text-coral-dark dark:hover:text-cream transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 bg-coral dark:bg-gray-950 text-white dark:text-cream">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex justify-center items-center">
            <Image
              src="/images/logo-v2.png"
              alt="Taylor Rose Reels"
              width={400}
              height={80}
              className="h-16 md:h-20 w-auto object-contain object-center"
              style={{ maxHeight: '80px', width: 'auto', transform: 'scale(1.5)', transformOrigin: 'center center' }}
            />
          </div>
          <p className="text-white dark:text-cream">
            © {new Date().getFullYear()} Taylor Rose Reels. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Fixed Contact Ribbon - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 max-w-[min(100%,calc(100vw-2rem))] sm:bottom-6 sm:right-8 lg:right-12">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-4 py-3 sm:px-5 sm:py-3.5 shadow-soft-lg flex flex-wrap items-center justify-end gap-x-4 gap-y-3 ring-2 ring-dusty-rose/50 dark:ring-gray-700/30">
          <a
            href="tel:+1234567890"
            aria-label="Call (123) 456-7890"
            className="flex cursor-pointer touch-manipulation items-center gap-2.5 text-cream-dark font-medium hover:text-coral transition-colors text-base"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">(123) 456-7890</span>
            <span className="sm:hidden">Call</span>
          </a>
          <div className="h-6 w-px shrink-0 bg-dusty-rose dark:bg-gray-600" aria-hidden />
          <a
            href="mailto:hello@taylorrosereels.com?subject=Inquiry%20from%20Taylor%20Rose%20Reels"
            aria-label="Email hello@taylorrosereels.com"
            className="flex cursor-pointer touch-manipulation items-center gap-2.5 text-cream-dark font-medium hover:text-coral transition-colors text-base"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">hello@taylorrosereels.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <div className="w-full shrink-0 border-t border-dusty-rose/60 sm:hidden" aria-hidden />
          <div className="hidden h-6 w-px shrink-0 bg-dusty-rose dark:bg-gray-600 sm:block" aria-hidden />
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-end">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream-dark hover:text-coral transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-cream-dark hover:text-coral transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-cream-dark hover:text-coral transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
