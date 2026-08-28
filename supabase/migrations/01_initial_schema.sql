-- Supabase initial schema for AJIBABS PAINT website
-- Enable extensions
create extension if not exists pgcrypto;
create extension if not exists uuid-ossp;

-- services table
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text,
  description text,
  image_urls text[],
  sort_order integer,
  created_at timestamp with time zone default now()
);

-- products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text, -- ''paint'' | ''accessory''
  description text,
  sizes text[],
  colours text[],
  price numeric,
  show_price boolean default false,
  image_urls text[],
  created_at timestamp with time zone default now()
);

-- projects (gallery) table
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text,
  category text, -- ''residential''|''commercial''|''interior''|''exterior''|''decorative''
  description text,
  services_provided text[],
  before_image_url text,
  after_image_url text,
  gallery_image_urls text[],
  created_at timestamp with time zone default now()
);

-- testimonials table
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  photo_url text,
  review_text text not null,
  project_type text,
  location text,
  is_published boolean default false,
  created_at timestamp with time zone default now()
);

-- leads table (unified)
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- ''quote'' | ''colour_mixing'' | ''product_enquiry''
  full_name text not null,
  phone text,
  whatsapp_number text,
  email text,
  location text,
  project_type text,
  is_residential boolean,
  is_interior boolean,
  is_new_paint boolean,
  estimated_size text,
  num_rooms integer,
  preferred_colour text,
  target_start_date date,
  budget_range text,
  description text,
  image_urls text[],
  -- colour‑mixing specific
  paint_type text,
  quantity_required text,
  colour_reference text,
  -- product‑enquiry specific
  product_id uuid references public.products(id),
  status text default ''new'', -- new|contacted|quote_sent|negotiation|won|lost|completed
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- blog_posts table
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  cover_image_url text,
  body_markdown text,
  is_published boolean default false,
  created_at timestamp with time zone default now()
);

-- site_settings table
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  phone text,
  whatsapp_number text,
  email text,
  address text,
  hours text,
  service_areas text[],
  social_links jsonb,
  brand_colours jsonb
);

-- Enable Row Level Security
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.leads enable row level security;

-- Public read‑only policies
create policy "public_read_services" on public.services for select using (true);
create policy "public_read_products" on public.products for select using (true);
create policy "public_read_projects" on public.projects for select using (true);
create policy "public_read_testimonials" on public.testimonials for select using (is_published);
create policy "public_read_blog_posts" on public.blog_posts for select using (is_published);
create policy "public_read_site_settings" on public.site_settings for select using (true);

-- Leads insert‑only policy for anonymous users
create policy "anonymous_insert_leads" on public.leads for insert with check (true);

-- Admin policies – assume auth.role() provides the logged‑in admin user role
create policy "admin_full_access" on public.services for all using (auth.role() = 'authenticated');
create policy "admin_full_access" on public.products for all using (auth.role() = 'authenticated');
create policy "admin_full_access" on public.projects for all using (auth.role() = 'authenticated');
create policy "admin_full_access" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "admin_full_access" on public.blog_posts for all using (auth.role() = 'authenticated');
create policy "admin_full_access" on public.site_settings for all using (auth.role() = 'authenticated');
create policy "admin_full_access" on public.leads for all using (auth.role() = 'authenticated');

-- Trigger to update updated_at on leads
create or replace function public.update_leads_timestamp()
returns trigger as $$
begin
   new.updated_at = now();
   return new;
end;
$$ language plpgsql;

create trigger trg_update_leads_timestamp
before update on public.leads
for each row execute procedure public.update_leads_timestamp();

-- End of schema
