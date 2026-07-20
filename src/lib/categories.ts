import { createClient } from "@/lib/supabase/server";

export type Category = {
  id: string;
  slug: string;
  label: string;
};

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("label", { ascending: true });

  if (error) {
    console.error("getAllCategories", error);
    return [];
  }
  return data as Category[];
}
