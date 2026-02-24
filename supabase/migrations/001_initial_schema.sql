-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Photos table for gallery management
create table public.photos (
  id uuid default uuid_generate_v4() primary key,
  src text not null,
  alt text not null default '',
  category text not null default 'Uncategorized',
  display_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact table for inquiry management
create table public.contact (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  event_date date,
  event_type text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.photos enable row level security;
alter table public.contact enable row level security;

-- Photos: Allow public read, authenticated users can do everything
create policy "Photos are viewable by everyone"
  on public.photos for select
  using (true);

create policy "Authenticated users can manage photos"
  on public.photos for all
  using (auth.role() = 'authenticated');

-- Contact: Public can insert (submit form), authenticated can read/update
create policy "Anyone can submit a contact"
  on public.contact for insert
  with check (true);

create policy "Authenticated users can view and manage contact"
  on public.contact for all
  using (auth.role() = 'authenticated');

-- Storage bucket for photo uploads
insert into storage.buckets (id, name, public)
values ('gallery-photos', 'gallery-photos', true)
on conflict (id) do nothing;

-- Storage policies: authenticated users can upload, everyone can view
create policy "Authenticated users can upload photos"
  on storage.objects for insert
  with check (
    bucket_id = 'gallery-photos' and
    auth.role() = 'authenticated'
  );

create policy "Anyone can view gallery photos"
  on storage.objects for select
  using (bucket_id = 'gallery-photos');

create policy "Authenticated users can delete photos"
  on storage.objects for delete
  using (
    bucket_id = 'gallery-photos' and
    auth.role() = 'authenticated'
  );

