import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTAButton } from "@/components/CTAButton";
import { getAllProducts, getProductBySlug, categoryLabels } from "@/lib/products";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/catalogue/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — HITATCG`,
    description: product.description,
  };
}

export default async function ProductPage(
  props: PageProps<"/catalogue/[slug]">
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const outOfStock = product.stock === 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-sakura-pale to-cream-soft">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          ) : (
            <p className="font-display flex h-full items-center justify-center px-6 text-center text-ink-soft">
              Photo à venir
            </p>
          )}
        </div>

        <div>
          <p className="text-xs text-ink-soft">{product.subtitle}</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-ink">
            {product.name}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-sakura-deep">
            {categoryLabels[product.category]}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-ink">
              {product.price.toFixed(2)} €
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-ink-soft line-through">
                {product.compareAtPrice.toFixed(2)} €
              </span>
            )}
          </div>

          <p className="mt-6 text-sm text-ink-soft">{product.description}</p>

          <p className="mt-4 text-sm text-ink">
            {outOfStock ? "Épuisé pour le moment" : `${product.stock} en stock`}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href={product.link ?? siteConfig.whatnotUrl} external>
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
