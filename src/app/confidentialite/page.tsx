import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Politique de confidentialité — HitaTCG",
  description: "Politique de confidentialité et protection des données du site HitaTCG.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Politique de confidentialité
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Responsable du traitement
          </h2>
          <p className="mt-2">
            Rémi Jacquemin (HitaTCG), entrepreneur individuel, SIRET
            849 203 849 00021, est responsable du traitement des données
            personnelles collectées sur ce site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Données collectées
          </h2>
          <p className="mt-2">
            Ce site ne dépose aucun cookie de suivi ni traceur publicitaire,
            et ne comporte aucun formulaire. Les liens de la page Contact
            ouvrent directement votre propre client email (mailto) ou les
            plateformes Whatnot et Instagram : aucune donnée ne transite par
            ce site ni n&apos;est stockée par nos soins.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Si vous nous contactez
          </h2>
          <p className="mt-2">
            Si vous nous écrivez par email, Whatnot ou Instagram, les données
            que vous nous transmettez (adresse email, contenu du message)
            sont utilisées uniquement pour vous répondre, ne sont jamais
            revendues ni transmises à un tiers, et sont conservées au maximum
            3 ans à compter du dernier échange.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Vos droits
          </h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
            de rectification, d&apos;effacement et d&apos;opposition sur les
            données que vous nous avez transmises. Pour l&apos;exercer,
            écrivez à{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-sakura-deep hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            . Vous pouvez également introduire une réclamation auprès de la
            CNIL (cnil.fr).
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Hébergement
          </h2>
          <p className="mt-2">
            Ce site est hébergé par Vercel Inc. (États-Unis), qui ne reçoit
            que les requêtes techniques normales de consultation du site
            (aucune donnée personnelle liée au contact).
          </p>
        </section>
      </div>
    </div>
  );
}
