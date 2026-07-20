import Image from "next/image";
import Link from "next/link";
import { Product, categoryLabels } from "@/lib/products";

const categoryGradients: Record<Product["category"], string> = {
  carte: "from-gold to-amber-500",
  "objet-3d": "from-sakura to-sakura-deep",
};

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock === 0;
  const image = product.images[0];

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition-shadow hover:shadow-lg"
    >
      <div
        className={`relative aspect-[3/4] bg-gradient-to-br ${categoryGradients[product.category]}`}
      >
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
          {categoryLabels[product.category]}
        </span>
        {outOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-ink px-2 py-1 text-[10px] font-semibold text-cream">
            Épuisé
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg font-semibold text-ink group-hover:underline">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-semibold text-ink">
            {product.price.toFixed(2)} €
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink-soft line-through">
              {product.compareAtPrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
