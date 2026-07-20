import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { deleteProduct } from "../actions";

export const metadata: Metadata = {
  title: "Produits — Admin HitaTCG",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">Produits</h1>
        <Link
          href="/admin/produits/nouveau"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-soft"
        >
          + Nouveau produit
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3">
                  {product.images[0] ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-cream-soft">
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-cream-soft" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-ink">{product.name}</td>
                <td className="px-4 py-3 text-ink-soft">
                  {product.categoryLabel}
                </td>
                <td className="px-4 py-3 text-ink-soft">{product.price.toFixed(2)} €</td>
                <td className="px-4 py-3 text-ink-soft">{product.stock}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/produits/${product.id}`}
                      className="text-sakura-deep hover:underline"
                    >
                      Éditer
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(product.id);
                      }}
                    >
                      <button type="submit" className="text-ink-soft hover:text-ink">
                        Supprimer
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-soft">
                  Aucun produit pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
