"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProductCategory } from "@/lib/products";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadImages(images: File[]): Promise<string[]> {
  const supabase = await createClient();
  const urls: string[] = [];

  for (const file of images) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { contentType: file.type });

    if (error) {
      console.error("uploadImages", error);
      continue;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

function readProductForm(formData: FormData) {
  return {
    name: (formData.get("name") as string).trim(),
    description: (formData.get("description") as string ?? "").trim(),
    category: formData.get("category") as ProductCategory,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
  };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const fields = readProductForm(formData);
  const newImages = formData.getAll("images") as File[];
  const images = await uploadImages(newImages);

  const slug = slugify(fields.name) || crypto.randomUUID();

  const { error } = await supabase.from("products").insert({
    ...fields,
    slug,
    images,
  });

  if (error) {
    redirect(`/admin/produits/nouveau?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/catalogue");
  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readProductForm(formData);
  const newImages = formData.getAll("images") as File[];
  const uploaded = await uploadImages(newImages);

  const keepExisting = formData.getAll("existingImages") as string[];
  const images = [...keepExisting, ...uploaded];

  const { error } = await supabase
    .from("products")
    .update({ ...fields, images })
    .eq("id", id);

  if (error) {
    redirect(`/admin/produits/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/catalogue");
  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (!error) {
    revalidatePath("/catalogue");
    revalidatePath("/admin/produits");
  }
}
