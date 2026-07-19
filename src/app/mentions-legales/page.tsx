import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales — HitaTCG",
  description: "Mentions légales du site HitaTCG.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Mentions légales
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Éditeur du site
          </h2>
          <p className="mt-2">
            Le site {siteConfig.name} (accessible à l&apos;adresse hitatcg.com)
            est édité par Rémi Jacquemin, entrepreneur individuel (micro-entreprise),
            exerçant sous le nom commercial &laquo; HitaTCG &raquo;.
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>SIRET : 849 203 849 00021</li>
            <li>TVA non applicable, article 293 B du Code général des impôts</li>
            <li>
              Contact :{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sakura-deep hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </li>
          </ul>
          <p className="mt-2">
            Directeur de la publication : Rémi Jacquemin.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Hébergement
          </h2>
          <p className="mt-2">
            Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Propriété intellectuelle
          </h2>
          <p className="mt-2">
            L&apos;ensemble des contenus présents sur ce site (textes, visuels,
            logo) est la propriété de {siteConfig.name}, sauf mention contraire.
            Toute reproduction ou représentation, totale ou partielle, sans
            autorisation préalable, est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Activité du site
          </h2>
          <p className="mt-2">
            Ce site présente le catalogue de cartes à collectionner et objets
            dérivés One Piece proposés par {siteConfig.name}. Il ne propose pas
            de paiement en ligne à ce jour : les commandes se finalisent
            directement sur Whatnot ou par contact avec le vendeur.
          </p>
        </section>
      </div>
    </div>
  );
}
