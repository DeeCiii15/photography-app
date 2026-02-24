# How to Upload Photos to Portfolio Albums

This guide explains how to upload photos to Supabase so they appear in your portfolio galleries.

## Step-by-Step Instructions

### 1. Access the Admin Dashboard

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Go to **http://localhost:3000/admin** in your browser

3. Log in with your Supabase admin credentials (the email/password you created in Supabase)

### 2. Navigate to Photos Section

1. In the admin dashboard sidebar, click **Photos** (or go directly to `/admin/photos`)

2. You'll see the Photo Gallery management page

### 3. Upload Photos

1. Click the **"Upload Photos"** button at the top right

2. You'll see an upload area with two options:
   - **Drag & Drop**: Drag image files from your computer directly into the upload area
   - **Click to Browse**: Click the upload area to open a file browser and select images

3. **Supported formats**: JPEG, PNG, WebP

4. You can upload **multiple photos at once** - just select multiple files or drag multiple files

5. The upload will start automatically and show "Uploading..." status

### 4. Organize Your Photos

After uploading, photos are automatically assigned to the "Weddings" category by default. To organize them:

1. **Hover over a photo** in the gallery grid
2. Click the **Edit icon** (pencil icon)
3. In the edit modal:
   - **Caption**: Add a descriptive caption for the photo
   - **Category**: Select the correct category:
     - Weddings
     - Maternity
     - Engagement
     - Special Events
     - Professional
     - Portraits
     - Uncategorized
4. Click **Save**

### 5. View Your Photos

Once uploaded and categorized:
- Photos automatically appear on your **Portfolio page** (`/portfolio`)
- When visitors click a category (e.g., "Weddings"), they'll see all photos in that category
- Photos are displayed in a beautiful grid layout

## Tips for Best Results

### Image Preparation
- **File size**: Keep images under 5MB for faster uploads
- **Resolution**: 2000-3000px width is ideal for web display
- **Format**: JPEG is best for photos (smallest file size)
- **Optimization**: Compress images before uploading using tools like:
  - [TinyPNG](https://tinypng.com)
  - [ImageOptim](https://imageoptim.com)
  - [Squoosh](https://squoosh.app)

### Organization
- **Categories**: Make sure to assign each photo to the correct category so they appear in the right portfolio gallery
- **Captions**: Add descriptive captions - they help with SEO and accessibility
- **Order**: Photos are displayed in upload order. You can re-upload in the desired order if needed.

### Troubleshooting

**Photos not appearing?**
- Check that the photo has a category assigned (not "Uncategorized" unless that's intentional)
- Verify the Supabase storage bucket `gallery-photos` exists and is public
- Check browser console for any error messages

**Upload fails?**
- Verify your Supabase credentials in `.env.local` are correct
- Check that you're logged into the admin dashboard
- Ensure the `gallery-photos` storage bucket exists in Supabase
- Check file size (should be under 5MB)

**Can't see the upload button?**
- Make sure you're logged in to the admin dashboard
- Check that you're on the `/admin/photos` page
- Refresh the page if needed

## Quick Reference

- **Admin URL**: `http://localhost:3000/admin/photos`
- **Upload**: Click "Upload Photos" → Drag & drop or browse
- **Edit**: Hover photo → Click edit icon → Change category/caption → Save
- **Delete**: Hover photo → Click delete icon → Confirm

## Where Photos Appear

- **Portfolio Page** (`/portfolio`): All photos organized by category
- **Category Galleries**: When visitors click a category card, they see all photos in that category
- **Homepage**: Category cards show stock images (these are separate from uploaded photos)

