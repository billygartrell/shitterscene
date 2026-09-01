create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  email text,
  auth_provider text not null default 'supabase',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.toilets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  ranked_by text not null default 'Anonymous',
  bar_name text not null,
  location text not null,
  state text,
  latitude double precision,
  longitude double precision,
  rating integer not null check (rating between 1 and 5),
  free_access text not null default 'unsure' check (free_access in ('yes', 'no', 'unsure')),
  review text not null,
  photo_data_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.toilets enable row level security;

drop policy if exists "Profiles are visible to everyone" on public.profiles;
create policy "Profiles are visible to everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Toilet reports are visible to everyone" on public.toilets;
create policy "Toilet reports are visible to everyone"
  on public.toilets for select
  using (true);

drop policy if exists "Logged in users can create toilet reports" on public.toilets;
create policy "Logged in users can create toilet reports"
  on public.toilets for insert
  with check (auth.uid() = user_id);

create index if not exists toilets_created_at_idx on public.toilets (created_at desc);
create index if not exists toilets_location_idx on public.toilets (latitude, longitude);
