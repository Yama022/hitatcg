-- Passe les catégories d'un enum figé (carte / objet-3d) à une table gérable
-- depuis l'admin. À exécuter dans le SQL Editor, une seule fois.

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

alter table products add column if not exists category_id uuid references categories(id);

update products p
set category_id = c.id
from categories c
where c.slug = p.category and p.category_id is null;

alter table products alter column category_id set not null;
alter table products drop column if exists category;

create index if not exists products_category_id_idx on products (category_id);
