'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

type Photo = {
  id: string;
  src: string;
  alt: string;
  category: string;
  display_order: number;
  created_at: string;
};

const CATEGORIES = ['Weddings', 'Maternity', 'Engagement', 'Special Events', 'Uncategorized'];

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const supabase = createClient();

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('display_order', { ascending: true });
    setPhotos(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('gallery-photos')
          .upload(filePath, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery-photos')
          .getPublicUrl(filePath);

        const { error: insertError } = await supabase.from('photos').insert({
          src: publicUrl,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Weddings',
          display_order: photos.length + i,
        });

        if (insertError) throw insertError;
      }
      await fetchPhotos();
      setShowUpload(false);
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload photos');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleDelete = async (photo: Photo) => {
    if (!confirm('Delete this photo from the gallery?')) return;

    try {
      const path = photo.src.split('/gallery-photos/')[1]?.split('?')[0];
      if (path) {
        await supabase.storage.from('gallery-photos').remove([path]);
      }
      await supabase.from('photos').delete().eq('id', photo.id);
      await fetchPhotos();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete photo');
    }
  };

  const handleUpdate = async (updates: Partial<Photo>) => {
    if (!editingPhoto) return;

    try {
      await supabase
        .from('photos')
        .update({ alt: updates.alt, category: updates.category })
        .eq('id', editingPhoto.id);
      setEditingPhoto(null);
      await fetchPhotos();
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update photo');
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Photo Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and manage your gallery photos
          </p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showUpload ? 'Cancel' : 'Upload Photos'}
        </button>
      </div>

      {showUpload && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`mb-8 p-12 border-2 border-dashed rounded-xl text-center transition-colors ${
            dragActive
              ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {uploading ? 'Uploading...' : 'Drag & drop photos here or click to browse'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Supports JPEG, PNG, WebP
            </p>
          </label>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No photos yet</p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">Upload your first photo to get started</p>
          <button
            onClick={() => setShowUpload(true)}
            className="mt-4 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium"
          >
            Upload Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setEditingPhoto(photo)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(photo)}
                    className="p-2 bg-red-500/90 rounded-lg hover:bg-red-500 transition-colors text-white"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{photo.alt}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-4">
              Edit Photo
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                handleUpdate({
                  alt: (form.elements.namedItem('alt') as HTMLInputElement).value,
                  category: (form.elements.namedItem('category') as HTMLSelectElement).value,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Caption</label>
                <input
                  name="alt"
                  type="text"
                  defaultValue={editingPhoto.alt}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  defaultValue={editingPhoto.category}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

