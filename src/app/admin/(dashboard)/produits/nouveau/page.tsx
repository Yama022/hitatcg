import type { Metadata } from "next";
import { ProductForm } from "../ProductForm";
import { createProduct } from "../../actions";

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

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Nouveau produit
      </h1>
      <div className="mt-8">
        <ProductForm action={createProduct} errorMessage={errorMessage} />
      </div>
    </div>
  );
}
