'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Photo = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

const FALLBACK_PHOTOS: Photo[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop', alt: 'Beautiful wedding ceremony', category: 'Weddings' },
  { id: '2', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop', alt: 'Wedding couple portrait', category: 'Weddings' },
  { id: '3', src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=1200&fit=crop', alt: 'Maternity photoshoot', category: 'Maternity' },
  { id: '4', src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=1200&fit=crop', alt: 'Maternity session', category: 'Maternity' },
  { id: '5', src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=1200&fit=crop', alt: 'Engagement proposal', category: 'Engagement' },
  { id: '6', src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=1200&fit=crop', alt: 'Engagement photos', category: 'Engagement' },
  { id: '7', src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=1200&fit=crop', alt: 'Special event celebration', category: 'Special Events' },
  { id: '8', src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1200&fit=crop', alt: 'Corporate event', category: 'Special Events' },
];

const CATEGORIES = ['All', 'Weddings', 'Maternity', 'Engagement', 'Special Events'];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('photos')
          .select('id, src, alt, category')
          .order('display_order', { ascending: true });
        if (data?.length) {
          setPhotos(data);
        } else {
          setPhotos(FALLBACK_PHOTOS);
        }
      } catch {
        setPhotos(FALLBACK_PHOTOS);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  const displayCategories = ['All', ...new Set(photos.map((p) => p.category).filter(Boolean))];
  const uniqueCategories = displayCategories.length > 1 ? displayCategories : CATEGORIES;

  return (
    <section id="portfolio" className="py-24 px-6 sm:px-8 lg:px-12 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Portfolio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore a curated collection of moments captured through the lens
          </p>
        </div>

        {uniqueCategories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg aspect-[4/5] md:aspect-auto cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </div>
    </section>
  );
}
