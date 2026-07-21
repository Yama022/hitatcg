import type { Metadata } from "next";
import { CTAButton } from "@/components/CTAButton";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact — HitaTCG",
  description: "Contacter HITATCG par email, Instagram ou Whatnot.",
};

const channels = [
  {
    label: "Email",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
  {
    label: "Whatnot",
    value: "Lives et messagerie Whatnot",
    href: siteConfig.whatnotUrl,
  },
  {
    label: "Instagram",
    value: "@hitatcg",
    href: siteConfig.instagramUrl,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Contact</h1>
      <p className="mt-2 max-w-xl text-sm text-ink-soft">
        Une question sur une carte, une commande groupée ou un partenariat
        fournisseur ? Voici les moyens de nous joindre.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-2xl border border-ink/10 bg-white/60 p-6 transition-shadow hover:shadow-lg"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-sakura-deep">
              {channel.label}
            </p>
            <p className="mt-2 font-display text-lg text-ink">{channel.value}</p>
          </a>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-ink/10 bg-cream-soft p-6">
        <h2 className="font-display text-lg font-semibold text-ink">
          Grossistes &amp; partenaires
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Nous disposons d&apos;un historique vérifiable de{" "}
          {siteConfig.stats.sales} ventes et {siteConfig.stats.reviews} avis 5
          étoiles sur Whatnot. Contactez-nous par email pour toute demande de
          partenariat fournisseur.
        </p>
        <div className="mt-4">
          <CTAButton href={`mailto:${siteConfig.contactEmail}`}>
            Écrire un email
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
