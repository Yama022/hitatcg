-- Crée le bucket Storage pour les photos produits (équivalent à le faire via Storage → New bucket).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
