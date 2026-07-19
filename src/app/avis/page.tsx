import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { ReviewCard } from "@/components/ReviewCard";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Avis clients — HITATCG",
  description: "Avis clients récoltés lors des lives Whatnot HITATCG.",
};

const reviews = [
  {
    author: "askel_tcg",
    quote: "Très bel envoi, un vendeur au top. Encore merci à toi !",
  },
  {
    author: "blysly",
    quote:
      "Live de qualité, vendeur au top, produit conforme parfait état, reçu rapidement, bien protégé.",
  },
  {
    author: "titizamasu592",
    quote:
      "Je suis absolument ravie de mes magnets, ils sont magnifiques ! On sent tout l'amour, la passion et le travail apportés à chaque création. Un immense merci pour les cadeaux ajoutés au colis, votre générosité me touche beaucoup.",
  },
  {
    author: "titizamasu592",
    quote:
      "Super live sur Whatnot autour des cartes One Piece Card Game ! Le vendeur était vraiment super gentil, très pro et agréable tout au long du live, avec une très bonne ambiance. Je recommande fortement.",
  },
  {
    author: "leho_tcg",
    quote: "Cartes très bien emballées et vite expédiées.",
  },
  {
    author: "bazakay",
    quote: "Très rapide et très réactif pour une question.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Avis clients
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        {siteConfig.stats.reviews} avis 5 étoiles récoltés sur Whatnot. Ci-dessous
        un échantillon — l&apos;historique complet est consultable directement
        sur notre profil.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.author}-${index}`} review={review} />
        ))}
      </div>

      <div className="mt-10">
        <CTAButton href={siteConfig.whatnotUrl} external>
          Voir tous les avis sur Whatnot
        </CTAButton>
      </div>
    </div>
  );
}
