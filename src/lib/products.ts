import { createClient } from "@/lib/supabase/server";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  categorySlug: string;
  categoryLabel: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  images: string[];
  whatnotLink: string | null;
};

const PRODUCT_SELECT = "*, categories(id, slug, label)";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  stock: number;
  images: string[];
  whatnot_link: string | null;
  categories: { id: string; slug: string; label: string } | null;
};

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    categoryId: row.categories?.id ?? "",
    categorySlug: row.categories?.slug ?? "",
    categoryLabel: row.categories?.label ?? "Sans catégorie",
    price: Number(row.price),
    compareAtPrice: row.compare_at_price !== null ? Number(row.compare_at_price) : null,
    stock: row.stock,
    images: row.images ?? [],
    whatnotLink: row.whatnot_link,
  };
}

export type ProductFilters = {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await createClient();
  const select = filters.category
    ? "*, categories!inner(id, slug, label)"
    : PRODUCT_SELECT;

  let query = supabase.from("products").select(select).order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("categories.slug", filters.category);
  }
  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }
  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getAllProducts", error);
    return [];
  }
  return (data as unknown as ProductRow[]).map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data as unknown as ProductRow);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data as unknown as ProductRow);
}
