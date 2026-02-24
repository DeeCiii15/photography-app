'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Link from 'next/link';

type Photo = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

const CATEGORIES = [
  { 
    name: 'Weddings', 
    description: 'Beautiful wedding ceremonies and celebrations',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&q=90'
  },
  { 
    name: 'Maternity', 
    description: 'Celebrating the journey of motherhood',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=800&fit=crop&q=90'
  },
  { 
    name: 'Engagement', 
    description: 'Romantic engagement sessions',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=800&fit=crop&q=90'
  },
  { 
    name: 'Special Events', 
    description: 'Corporate events and special occasions',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop&q=90'
  },
];

const FALLBACK_PHOTOS: Record<string, Photo[]> = {
  'Weddings': [
    { id: 'w1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop', alt: 'Wedding ceremony', category: 'Weddings' },
    { id: 'w2', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop', alt: 'Wedding couple', category: 'Weddings' },
    { id: 'w3', src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop', alt: 'Wedding reception', category: 'Weddings' },
    { id: 'w4', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1200&fit=crop', alt: 'Bridal portrait', category: 'Weddings' },
  ],
  'Maternity': [
    { id: 'm1', src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=1200&fit=crop', alt: 'Maternity photoshoot', category: 'Maternity' },
    { id: 'm2', src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=1200&fit=crop', alt: 'Maternity session', category: 'Maternity' },
    { id: 'm3', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1200&fit=crop', alt: 'Expecting mother', category: 'Maternity' },
  ],
  'Engagement': [
    { id: 'e1', src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=1200&fit=crop', alt: 'Engagement proposal', category: 'Engagement' },
    { id: 'e2', src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=1200&fit=crop', alt: 'Engagement photos', category: 'Engagement' },
    { id: 'e3', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1200&fit=crop', alt: 'Couple engagement', category: 'Engagement' },
  ],
  'Special Events': [
    { id: 's1', src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=1200&fit=crop', alt: 'Special event celebration', category: 'Special Events' },
    { id: 's2', src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1200&fit=crop', alt: 'Corporate event', category: 'Special Events' },
    { id: 's3', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1200&fit=crop', alt: 'Event photography', category: 'Special Events' },
  ],
};

function PortfolioContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Read category from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchPhotos() {
      if (!selectedCategory) {
        setPhotos([]);
        return;
      }

      setLoading(true);
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('photos')
          .select('id, src, alt, category')
          .eq('category', selectedCategory)
          .order('display_order', { ascending: true });

        if (data?.length) {
          setPhotos(data);
        } else {
          // Use fallback photos if no data
          setPhotos(FALLBACK_PHOTOS[selectedCategory] || []);
        }
      } catch {
        // Use fallback photos on error
        setPhotos(FALLBACK_PHOTOS[selectedCategory] || []);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our curated galleries by category. Select a category below to view our work.
            </p>
          </div>

          {/* Category Selection */}
          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.name}
                  href={`/portfolio?category=${category.name}`}
                  className="group relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]"
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
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Categories
                </button>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  {selectedCategory}
                </h2>
                <div className="w-24"></div> {/* Spacer for centering */}
              </div>

              {/* Photo Gallery */}
              {loading ? (
                <div className="flex justify-center py-24">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : photos.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">No photos in this category yet</p>
                  <p className="text-gray-500 dark:text-gray-500 mt-2">Check back soon for new additions</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
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
      <div className="min-h-screen bg-white dark:bg-black">
        <Navigation />
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}

