import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { cardSurface } from "@/lib/ui";

const gradients = [
  "from-gold to-amber-500",
  "from-sakura to-sakura-deep",
  "from-ink-soft to-ink",
  "from-sky-300 to-sky-500",
  "from-emerald-300 to-emerald-500",
];

function gradientForCategory(categorySlug: string): string {
  let hash = 0;
  for (let i = 0; i < categorySlug.length; i++) {
    hash = (hash * 31 + categorySlug.charCodeAt(i)) >>> 0;
  }
  return gradients[hash % gradients.length];
}

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock === 0;
  const image = product.images[0];

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className={`group flex flex-col overflow-hidden bg-white/60 transition-shadow hover:shadow-lg ${cardSurface}`}
    >
      <div
        className={`relative aspect-[3/4] bg-gradient-to-br ${gradientForCategory(product.categorySlug)}`}
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
        <span className="absolute left-3 top-3 rounded-md bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
          {product.categoryLabel}
        </span>
        {outOfStock && (
          <span className="absolute right-3 top-3 rounded-md bg-ink px-2 py-1 text-[10px] font-semibold text-cream">
            Épuisé
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg font-semibold text-ink group-hover:underline">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-mono text-lg font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="font-mono text-sm text-ink-soft line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
