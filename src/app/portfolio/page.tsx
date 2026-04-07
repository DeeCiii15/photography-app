'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import {
  PORTFOLIO_CATEGORIES_FOR_UI,
  PORTFOLIO_GALLERY_BY_CATEGORY,
} from '@/lib/portfolioData';

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const photos = selectedCategory
    ? (PORTFOLIO_GALLERY_BY_CATEGORY[selectedCategory] || [])
    : [];
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream-light dark:bg-gray-950">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-cream-dark dark:text-cream mb-4">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-cream-dark dark:text-cream max-w-2xl mx-auto">
              Explore our curated galleries by category. Select a category below to view our work.
            </p>
          </div>

          {/* Category Selection */}
          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {PORTFOLIO_CATEGORIES_FOR_UI.map((category) => (
                <Link
                  key={category.name}
                  href={`/portfolio?category=${encodeURIComponent(category.name)}`}
                  className="group relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-soft-lg hover:shadow-soft-lg transition-all duration-500 transform hover:scale-[1.02] ring-2 ring-dusty-rose/30 dark:ring-gray-700/20"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                      {category.name}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
                      {category.description}
                    </p>
                    <div className="flex items-center text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Gallery</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              {/* Back Button & Category Header */}
              <div className="mb-8 flex items-center justify-between">
                <button
                  onClick={() => router.push('/portfolio')}
                  className="flex items-center gap-2 text-cream-dark dark:text-coral hover:text-cream-dark dark:hover:text-rose-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Categories
                </button>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cream-dark dark:text-cream">
                  {selectedCategory}
                </h2>
                <div className="w-24"></div> {/* Spacer for centering */}
              </div>

              {/* Photo Gallery */}
              {photos.length === 0 ? (
                <div className="text-center py-24 bg-cream-light dark:bg-gray-900 rounded-3xl border-2 border-dusty-rose dark:border-gray-700 shadow-soft">
                  <p className="text-cream-dark dark:text-cream text-lg">No photos in this category yet</p>
                  <p className="text-coral dark:text-coral mt-2">Check back soon for new additions</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-[1.02] shadow-soft hover:shadow-soft-lg ring-1 ring-dusty-rose/20 dark:ring-gray-700/20"
                      onMouseEnter={() => setHoveredId(photo.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                          hoveredId === photo.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-sm font-medium uppercase tracking-wider mb-1">
                            {photo.category}
                          </p>
                          <p className="text-lg font-display">{photo.alt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-light dark:bg-gray-950">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral dark:border-rose-300"></div>
        </div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}

