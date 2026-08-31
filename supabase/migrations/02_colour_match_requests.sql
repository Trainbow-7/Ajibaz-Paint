-- Supabase Migration: colour_match_requests table
-- Records AI Colour Mixing & Universal Tinting calculations for quality monitoring and calibration

create table if not exists public.colour_match_requests (
  id uuid primary key default gen_random_uuid(),
  target_hex text not null,
  target_lab jsonb not null,
  achieved_hex text not null,
  achieved_lab jsonb not null,
  base_name text not null,
  base_code text not null,
  delta_e numeric not null,
  delta_e_76 numeric,
  match_quality text not null,
  volume_litres numeric not null,
  total_colorant_ml numeric not null,
  total_colorant_grams numeric not null,
  formula jsonb not null,
  user_ip text,
  user_agent text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.colour_match_requests enable row level security;

-- Allow anonymous inserts so frontend requests can log calculations
create policy "Allow anonymous inserts to colour_match_requests"
  on public.colour_match_requests
  for insert
  to anon
  with check (true);

-- Allow authenticated users / staff to read calculation logs
create policy "Allow staff to view colour_match_requests"
  on public.colour_match_requests
  for select
  to authenticated
  using (true);

-- Create index on created_at for fast query performance
create index if not exists idx_colour_match_requests_created_at on public.colour_match_requests (created_at desc);
create index if not exists idx_colour_match_requests_match_quality on public.colour_match_requests (match_quality);
