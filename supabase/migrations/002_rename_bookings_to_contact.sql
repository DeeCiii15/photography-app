-- Migration to rename bookings table to contact
-- This migration handles the rename if the bookings table already exists

-- Rename the table
alter table if exists public.bookings rename to contact;

-- Drop old policies if they exist (drop on old table name first, then new)
drop policy if exists "Anyone can submit a booking" on public.bookings;
drop policy if exists "Authenticated users can view and manage bookings" on public.bookings;
drop policy if exists "Anyone can submit a booking" on public.contact;
drop policy if exists "Authenticated users can view and manage bookings" on public.contact;
drop policy if exists "Anyone can submit a contact" on public.contact;
drop policy if exists "Authenticated users can view and manage contact" on public.contact;

-- Create new policies with updated names
create policy "Anyone can submit a contact"
  on public.contact for insert
  with check (true);

create policy "Authenticated users can view and manage contact"
  on public.contact for all
  using (auth.role() = 'authenticated');

