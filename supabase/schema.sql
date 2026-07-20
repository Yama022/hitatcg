-- À exécuter dans Supabase → SQL Editor (nouveau projet uniquement).
-- Si tu as déjà exécuté une ancienne version de ce fichier, utilise
-- migration-categories.sql à la place pour passer à ce schéma.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;

create policy "Public can read categories"
  on categories for select
  to anon, authenticated
  using (true);

create policy "Authenticated can manage categories"
  on categories for all
  to authenticated
  using (true)
  with check (true);

insert into categories (slug, label) values
  ('carte', 'Carte gradée'),
  ('objet-3d', 'Impression 3D')
on conflict (slug) do nothing;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  category_id uuid not null references categories(id),
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  stock integer not null default 0,
  images text[] not null default '{}',
  whatnot_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_price_idx on products (price);

alter table products enable row level security;

create policy "Public can read products"
  on products for select
  to anon, authenticated
  using (true);

create policy "Authenticated can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Authenticated can update products"
  on products for update
  to authenticated
  using (true);

create policy "Authenticated can delete products"
  on products for delete
  to authenticated
  using (true);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- Storage : crée d'abord un bucket "product-images" (Storage → New bucket,
-- coche "Public bucket", ou exécute create-bucket.sql), puis ces policies.

create policy "Public read product images"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

create policy "Authenticated upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
