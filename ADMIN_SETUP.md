# Taylor Rose Reels - Admin Dashboard Setup

This guide walks you through setting up the admin dashboard for managing photos and bookings.

## Prerequisites

- A [Supabase](https://supabase.com) account (free tier works great)

## Step 1: Create a Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Choose your organization, name your project (e.g., "taylor-rose-reels"), and set a database password
4. Wait for the project to be created

## Step 2: Run the Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click **Run**

This creates:
- `photos` table for your gallery
- `bookings` table for inquiries
- Storage bucket `gallery-photos` for image uploads
- Security policies

**Note:** If the storage bucket creation fails, create it manually:
- Go to **Storage** in the Supabase dashboard
- Click **New bucket**
- Name it `gallery-photos` and make it **Public**

## Step 3: Create an Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter an email and password for your admin account
4. Click **Create user**

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the project root with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
   ```

2. Get your Supabase credentials:
   - Go to **Project Settings** → **API** in Supabase
   - Copy the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Get your Calendly URL:
   - Sign up at [calendly.com](https://calendly.com) if you haven't already
   - Create your event types (photo shoots, consultations, etc.)
   - Copy your Calendly scheduling page URL (e.g., `https://calendly.com/your-username`)
   - Add it as `NEXT_PUBLIC_CALENDLY_URL` in `.env.local`

4. Update `.env.local` with your values

## Step 5: Start the App

```bash
npm run dev
```

Visit **http://localhost:3000/admin** and sign in with your admin credentials.

## Admin Features

### Photos (`/admin/photos`)
- **Upload**: Drag & drop or click to upload multiple photos
- **Edit**: Change captions and categories
- **Delete**: Remove photos from the gallery
- Photos automatically appear on your public gallery

### Bookings (`/admin/bookings`)
- View all booking inquiries from your website
- Filter by status: pending, confirmed, declined, completed
- Update status with one click
- Contact info (email, phone) is clickable for quick outreach

### Dashboard (`/admin`)
- Quick overview of photo count and booking stats
- Fast links to upload photos or manage bookings

## Security

- Admin routes are protected—only authenticated users can access
- The public site can view photos and submit bookings without logging in
- Keep your admin credentials secure and never commit `.env.local` to version control

