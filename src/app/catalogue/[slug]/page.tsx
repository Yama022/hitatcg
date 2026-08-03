import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTAButton } from "@/components/CTAButton";
import { ProductGallery } from "@/components/ProductGallery";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export async function generateMetadata(
  props: PageProps<"/catalogue/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — HitaTCG`,
    description: product.description,
  };
}

export default async function ProductPage(
  props: PageProps<"/catalogue/[slug]">
) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const outOfStock = product.stock === 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <p className="label-tag text-sakura-deep">{product.categoryLabel}</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-ink">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-base text-ink-soft line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm text-ink-soft">{product.description}</p>

          <p className="mt-4 text-sm text-ink">
            {outOfStock ? (
              "Épuisé pour le moment"
            ) : (
              <>
                <span className="font-mono">{product.stock}</span> en stock
              </>
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href={product.whatnotLink ?? siteConfig.whatnotUrl} external>
              Réserver sur Whatnot
            </CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Poser une question
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
