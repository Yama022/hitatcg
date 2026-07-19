import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalogue — HITATCG",
  description: "Cartes gradées et objets 3D One Piece disponibles à la vente chez HITATCG.",
};

export default function CataloguePage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Catalogue</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Cartes gradées et objets imprimés en 3D à l&apos;atelier. Stock mis à
        jour régulièrement — les pièces les plus rares partent vite en live.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
