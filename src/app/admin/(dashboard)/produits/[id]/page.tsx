import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { ProductForm } from "../ProductForm";
import { updateProduct } from "../../actions";

export const metadata: Metadata = {
  title: "Éditer produit — Admin HitaTCG",
  robots: { index: false, follow: false },
};

export default async function EditProductPage(
  props: PageProps<"/admin/produits/[id]">
) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const errorMessage =
    typeof searchParams.error === "string" ? searchParams.error : null;

  const [product, categories] = await Promise.all([
    getProductById(id),
    getAllCategories(),
  ]);
  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Éditer {product.name}
      </h1>
      <div className="mt-8">
        <ProductForm
          action={updateWithId}
          product={product}
          categories={categories}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
