# How to Add Your Own Images to Taylor Rose Reels

There are two ways to add your images to the website:

## Option 1: Admin Dashboard (Recommended for Portfolio Photos)

This is the easiest way to manage your portfolio gallery photos.

### Step 1: Set Up Supabase Storage (if not already done)

1. Go to your Supabase project dashboard
2. Navigate to **Storage**
3. If you don't see a bucket named `gallery-photos`, create it:
   - Click **New bucket**
   - Name: `gallery-photos`
   - Make it **Public** (toggle ON)
   - Click **Create bucket**

### Step 2: Upload Photos via Admin Dashboard

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to **http://localhost:3000/admin** and log in

3. Navigate to **Photos** in the sidebar (or go to `/admin/photos`)

4. Click **Upload Photos** button

5. Either:
   - **Drag and drop** your image files into the upload area, OR
   - **Click** the upload area to browse and select files

6. Supported formats: JPEG, PNG, WebP

7. After upload, you can:
   - **Edit** each photo: Click the edit icon to change the caption and category
   - **Delete** photos: Click the delete icon to remove them
   - **Organize**: Photos are automatically organized by category

8. Your uploaded photos will automatically appear on:
   - The Portfolio page (`/portfolio`)
   - Category-specific galleries when visitors select a category

### Tips for Best Results:
- **File size**: Keep images under 5MB for faster uploads
- **Resolution**: 2000-3000px width is ideal for web display
- **Categories**: Set the correct category (Weddings, Maternity, Engagement, Special Events) when editing
- **Captions**: Add descriptive captions to help with SEO and accessibility

---

## Option 2: Replace Homepage Images with Local Files

If you want to replace the placeholder images on the homepage (hero image, about section, portfolio category cards) with your own local files:

### Step 1: Create an Images Folder

1. Create a folder in your project: `public/images/`
2. Add your images there, for example:
   ```
   public/
     images/
       hero-wedding.jpg
       photographer-about.jpg
       portfolio-weddings.jpg
       portfolio-maternity.jpg
       portfolio-engagement.jpg
       portfolio-events.jpg
   ```

### Step 2: Update the Homepage

The homepage images are in `src/app/page.tsx`. You'll need to replace the Unsplash URLs with your local image paths.

**Example:**
- Change: `src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=1080&fit=crop&q=90"`
- To: `src="/images/hero-wedding.jpg"`

### Step 3: Optimize Your Images

For best performance:
- **Hero image**: 1920x1080px or larger
- **About section**: 800x1000px (portrait orientation)
- **Portfolio cards**: 800x1200px (portrait orientation)
- Use JPEG for photos, PNG for graphics with transparency
- Compress images before uploading (tools like TinyPNG or ImageOptim work well)

---

## Current Image Locations

Here are the images you can replace on the homepage:

1. **Hero Section** (line ~20 in `page.tsx`):
   - Current: Wedding photo from Unsplash
   - Replace with: Your best wedding/event photo

2. **About Section** (line ~94 in `page.tsx`):
   - Current: Female photographer photo
   - Replace with: Your professional photo or a photo of you working

3. **Portfolio Category Cards** (lines ~145, ~174, ~203, ~232 in `page.tsx`):
   - Four category images: Weddings, Maternity, Engagement, Special Events
   - Replace with: Your best photo from each category

---

## Quick Reference

### Admin Dashboard Upload:
- URL: `http://localhost:3000/admin/photos`
- Drag & drop or click to upload
- Edit categories and captions after upload

### Local File Replacement:
- Place files in `public/images/`
- Update image paths in `src/app/page.tsx`
- Use `/images/filename.jpg` format

### Image Requirements:
- **Format**: JPEG, PNG, or WebP
- **Max size**: 5MB per file (for uploads)
- **Recommended dimensions**: 
  - Hero: 1920x1080px
  - About: 800x1000px
  - Portfolio cards: 800x1200px

---

## Need Help?

If you run into issues:
1. Check that Supabase storage bucket `gallery-photos` exists and is public
2. Verify your `.env.local` has correct Supabase credentials
3. Make sure you're logged into the admin dashboard
4. Check browser console for any error messages

