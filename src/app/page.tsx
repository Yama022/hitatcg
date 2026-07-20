import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { StatsStrip } from "@/components/StatsStrip";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";
import { WhatnotProfileCard } from "@/components/WhatnotProfileCard";
import { getAllProducts } from "@/lib/products";
import { siteConfig } from "@/lib/config";

const previewReviews = [
  {
    author: "titizamasu592",
    quote:
      "Excellent vendeur ! Très bon live, ambiance au top et échanges très agréables. Colis reçu rapidement, très bien protégé et conforme à la description. Vendeur sérieux et professionnel, je recommande vivement.",
  },
  {
    author: "syzhrod",
    quote:
      "Hyper pro ! Les cartes sont très bien emballées. Je recommande sans hésiter !",
  },
  {
    author: "jackyviii",
    quote:
      "Vendeur super cool avec qui on peut discuter. Cartes très bien protégées. Vous pouvez y aller les yeux fermés.",
  },
];

export default async function HomePage() {
  const allProducts = await getAllProducts();
  const featured = allProducts.slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:pt-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sakura-deep">
              Boutique de cartes One Piece
            </p>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-md text-base text-ink-soft">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="/catalogue">Voir le catalogue</CTAButton>
              <CTAButton href={siteConfig.whatnotUrl} external variant="secondary">
                Rejoindre les lives Whatnot
              </CTAButton>
            </div>
          </div>
          <WhatnotProfileCard />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <StatsStrip />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Sélection du moment
          </h2>
          <Link href="/catalogue" className="text-sm font-medium text-ink-soft hover:text-ink">
            Voir tout →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-cream-soft py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Une communauté qui nous fait confiance
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            {siteConfig.stats.reviews} avis 5 étoiles récoltés lors de nos
            lives Whatnot. Un aperçu :
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {previewReviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Prêt à passer commande ?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
          Parcours le catalogue en ligne ou retrouve-nous en direct sur Whatnot
          pour vivre l&apos;expérience live.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <CTAButton href="/catalogue">Voir le catalogue</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Nous contacter
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
