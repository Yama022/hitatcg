import type { Metadata } from "next";
import { ProductForm } from "../ProductForm";
import { createProduct } from "../../actions";
import { getAllCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Nouveau produit — Admin HitaTCG",
  robots: { index: false, follow: false },
};

export default async function NewProductPage(
  props: PageProps<"/admin/produits/nouveau">
) {
  const searchParams = await props.searchParams;
  const errorMessage =
    typeof searchParams.error === "string" ? searchParams.error : null;

  const categories = await getAllCategories();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Nouveau produit
      </h1>
      {categories.length === 0 ? (
        <p className="mt-6 text-sm text-ink-soft">
          Crée d&apos;abord une catégorie dans{" "}
          <a href="/admin/categories" className="text-sakura-deep hover:underline">
            Gérer les catégories
          </a>
          .
        </p>
      ) : (
        <div className="mt-8">
          <ProductForm action={createProduct} categories={categories} errorMessage={errorMessage} />
        </div>
      )}
    </div>
  );
}
