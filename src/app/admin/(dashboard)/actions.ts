"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const STORAGE_BUCKET = "product-images";
const STORAGE_MARKER = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8 Mo

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

type UploadResult = {
  urls: string[];
  failures: string[];
};

async function uploadImages(images: File[]): Promise<UploadResult> {
  const supabase = await createClient();
  const urls: string[] = [];
  const failures: string[] = [];

  for (const file of images) {
    if (!file || file.size === 0) continue;

    if (!file.type.startsWith("image/")) {
      failures.push(`${file.name} (pas une image)`);
      continue;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      failures.push(`${file.name} (plus de 8 Mo)`);
      continue;
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { contentType: file.type });

    if (error) {
      console.error("uploadImages", error);
      failures.push(`${file.name} (échec de l'envoi)`);
      continue;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return { urls, failures };
}

async function deleteStorageImages(urls: string[]) {
  const paths = urls
    .filter((url) => url.includes(STORAGE_MARKER))
    .map((url) => url.split(STORAGE_MARKER)[1]);

  if (paths.length === 0) return;

  const supabase = await createClient();
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove(paths);
  if (error) {
    console.error("deleteStorageImages", error);
  }
}

function readProductForm(formData: FormData) {
  return {
    name: (formData.get("name") as string).trim(),
    description: ((formData.get("description") as string) ?? "").trim(),
    category_id: formData.get("category_id") as string,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
  };
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const label = (formData.get("label") as string).trim();
  const slug = slugify(label);

  if (!label || !slug) return;

  const { error } = await supabase.from("categories").insert({ slug, label });
  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/categories");
  revalidatePath("/catalogue");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    redirect(
      `/admin/categories?error=${encodeURIComponent("Catégorie utilisée par des produits, impossible de supprimer.")}`
    );
  }

  revalidatePath("/admin/categories");
  revalidatePath("/catalogue");
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const fields = readProductForm(formData);
  const newImages = formData.getAll("images") as File[];
  const { urls: images, failures } = await uploadImages(newImages);

  const slug = slugify(fields.name) || crypto.randomUUID();

  const { error } = await supabase.from("products").insert({
    ...fields,
    slug,
    images,
  });

  if (error) {
    await deleteStorageImages(images);
    redirect(`/admin/produits/nouveau?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/catalogue");
  revalidatePath("/admin/produits");

  if (failures.length > 0) {
    redirect(
      `/admin/produits?warning=${encodeURIComponent(`Produit créé, mais certaines photos n'ont pas pu être ajoutées : ${failures.join(", ")}`)}`
    );
  }

  redirect("/admin/produits");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = readProductForm(formData);
  const newImages = formData.getAll("images") as File[];
  const { urls: uploaded, failures } = await uploadImages(newImages);

  const keepExisting = formData.getAll("existingImages") as string[];

  const { data: existingProduct } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  const previousImages: string[] = existingProduct?.images ?? [];
  const droppedImages = previousImages.filter((url) => !keepExisting.includes(url));

  const images = [...keepExisting, ...uploaded];

  const { error } = await supabase
    .from("products")
    .update({ ...fields, images })
    .eq("id", id);

  if (error) {
    await deleteStorageImages(uploaded);
    redirect(`/admin/produits/${id}?error=${encodeURIComponent(error.message)}`);
  }

  if (droppedImages.length > 0) {
    await deleteStorageImages(droppedImages);
  }

  revalidatePath("/catalogue");
  revalidatePath("/admin/produits");

  if (failures.length > 0) {
    redirect(
      `/admin/produits?warning=${encodeURIComponent(`Produit enregistré, mais certaines photos n'ont pas pu être ajoutées : ${failures.join(", ")}`)}`
    );
  }

  redirect("/admin/produits");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (!error) {
    if (product?.images?.length) {
      await deleteStorageImages(product.images);
    }
    revalidatePath("/catalogue");
    revalidatePath("/admin/produits");
  }
}
