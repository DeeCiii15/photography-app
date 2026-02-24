# Images Folder

Place your static images here. The following images are used on the homepage:

## Required Images

0. **logo.png** (or .svg, .jpg)
   - Used for: Header navigation logo
   - Recommended size: 200-300px width, auto height
   - Format: PNG with transparency or SVG (best for scaling)
   - This replaces the "Taylor Rose Reels" text in the header

1. **hero-wedding.jpg** (or .png, .webp)
   - Used for: Homepage hero section background
   - Recommended size: 1920x1080px or larger
   - Format: JPEG, PNG, or WebP

2. **about-photographer-v2.jpg**
   - Used for: About section (portrait photo)
   - Recommended size: 800x1000px (portrait orientation)
   - Format: JPEG, PNG, or WebP

3. **portfolio-weddings.jpg**
   - Used for: Portfolio category card - Weddings
   - Recommended size: 800x1200px (portrait orientation)
   - Format: JPEG, PNG, or WebP

4. **portfolio-maternity.jpg**
   - Used for: Portfolio category card - Maternity
   - Recommended size: 800x1200px (portrait orientation)
   - Format: JPEG, PNG, or WebP

5. **portfolio-engagement.jpg**
   - Used for: Portfolio category card - Engagement
   - Recommended size: 800x1200px (portrait orientation)
   - Format: JPEG, PNG, or WebP

6. **portfolio-events.jpg**
   - Used for: Portfolio category card - Special Events
   - Recommended size: 800x1200px (portrait orientation)
   - Format: JPEG, PNG, or WebP

## Tips

- **File naming**: Use lowercase with hyphens (e.g., `hero-wedding.jpg`)
- **Optimization**: Compress images before adding them (use tools like TinyPNG or ImageOptim)
- **File size**: Keep images under 500KB for best performance
- **Formats**: 
  - JPEG for photos (best compression)
  - PNG for graphics with transparency
  - WebP for modern browsers (best quality/size ratio)

## Adding Your Images

Simply drag and drop your image files into this folder with the exact filenames listed above. The site will automatically use them!

## Note on Portfolio Gallery

The portfolio gallery page (`/portfolio`) is designed to pull photos from your Supabase database (uploaded via the admin dashboard). The images listed above are used for:
- Homepage hero and about sections
- Portfolio category selection cards

For individual portfolio photos, use the admin dashboard at `/admin/photos` to upload and manage them. Those photos are stored in Supabase Storage and will appear in the portfolio galleries.

