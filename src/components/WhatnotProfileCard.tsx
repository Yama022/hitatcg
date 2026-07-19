import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/CTAButton";
import { siteConfig } from "@/lib/config";

export function WhatnotProfileCard() {
  const { whatnotProfile, stats } = siteConfig;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-sakura">
        Profil vérifié Whatnot
      </p>
      <div className="mt-3 flex items-center gap-4">
        <Logo className="h-16 w-16 shrink-0" />
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            {whatnotProfile.displayName}
          </p>
          <p className="text-sm text-ink-soft">@{whatnotProfile.handle}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-y border-ink/10 py-4 text-center">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            <span className="text-sakura">{stats.rating} ★</span>
          </p>
          <p className="text-xs text-ink-soft">{stats.reviews} avis</p>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {whatnotProfile.shippingTime}
          </p>
          <p className="text-xs text-ink-soft">Délai d&apos;envoi</p>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            {stats.sales}
          </p>
          <p className="text-xs text-ink-soft">Vendus</p>
        </div>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-ink-soft">
        {whatnotProfile.bio.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="mt-6">
        <CTAButton href={siteConfig.whatnotUrl} external>
          Voir la boutique Whatnot
        </CTAButton>
      </div>
    </div>
  );
}
