import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { StatsStrip } from "@/components/StatsStrip";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "À propos — HITATCG",
  description:
    "L'histoire de HITATCG, boutique de cartes One Piece née sur Whatnot.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">À propos</h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft">
        <p>
          {siteConfig.name} est né sur Whatnot : des lives réguliers dédiés aux
          cartes à collectionner One Piece, avec une exigence constante sur la
          qualité des cartes et le sérieux du service client.
        </p>
        <p>
          Cette activité en ligne a permis de construire une communauté fidèle
          et une réputation vérifiable — chaque vente, chaque avis, chaque live
          est public et consultable directement sur la plateforme.
        </p>
        <p>
          Cette boutique est le prolongement naturel de cette activité : un
          catalogue accessible en dehors des lives, pour présenter l&apos;offre
          de façon claire et professionnelle.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-ink">
          En chiffres
        </h2>
        <div className="mt-4">
          <StatsStrip />
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <CTAButton href={siteConfig.whatnotUrl} external>
          Voir la chaîne Whatnot
        </CTAButton>
        <CTAButton href="/contact" variant="secondary">
          Nous contacter
        </CTAButton>
      </div>
    </div>
  );
}
