import { createClient } from "@/lib/supabase/server";
import type { ProductCategory } from "@/lib/product-categories";

export type { ProductCategory } from "@/lib/product-categories";
export { categoryLabels } from "@/lib/product-categories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  images: string[];
  whatnotLink: string | null;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  compare_at_price: number | null;
  stock: number;
  images: string[];
  whatnot_link: string | null;
};

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price !== null ? Number(row.compare_at_price) : null,
    stock: row.stock,
    images: row.images ?? [],
    whatnotLink: row.whatnot_link,
  };
}

export type ProductFilters = {
  category?: ProductCategory;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("category", filters.category);
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
  return (data as ProductRow[]).map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data as ProductRow);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return mapRow(data as ProductRow);
}
