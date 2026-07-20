import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { CatalogueFilters } from "@/components/CatalogueFilters";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Catalogue — HitaTCG",
  description: "Cartes gradées et objets 3D One Piece disponibles à la vente chez HITATCG.",
};

export default async function CataloguePage(
  props: PageProps<"/catalogue">
) {
  const searchParams = await props.searchParams;

  const search = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const category =
    typeof searchParams.category === "string" && searchParams.category
      ? searchParams.category
      : undefined;
  const minPrice =
    typeof searchParams.minPrice === "string" && searchParams.minPrice
      ? Number(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string" && searchParams.maxPrice
      ? Number(searchParams.maxPrice)
      : undefined;

  const [products, categories] = await Promise.all([
    getAllProducts({ search, category, minPrice, maxPrice }),
    getAllCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Catalogue</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Cartes gradées et objets imprimés en 3D à l&apos;atelier. Stock mis à
        jour régulièrement — les pièces les plus rares partent vite en live.
      </p>

      <div className="mt-8">
        <CatalogueFilters categories={categories} />
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">
          Aucun produit ne correspond à ces filtres.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
