import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/CTAButton";
import { siteConfig } from "@/lib/config";
import { cardSurface } from "@/lib/ui";

export function WhatnotProfileCard() {
  const { whatnotProfile, stats } = siteConfig;

  return (
    <div
      className={`relative overflow-hidden p-8 ${cardSurface}`}
      style={{
        background: "linear-gradient(155deg, var(--bg2), var(--bg3))",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--acc2) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <div className="relative">
        <p className="label-tag text-sakura">Profil vérifié Whatnot</p>
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
            <p className="font-mono text-lg font-semibold text-sakura">
              {stats.rating} ★
            </p>
            <p className="label-tag text-ink-faint">{stats.reviews} avis</p>
          </div>
          <div>
            <p className="font-mono text-lg font-semibold text-ink">
              {whatnotProfile.shippingTime}
            </p>
            <p className="label-tag text-ink-faint">Délai d&apos;envoi</p>
          </div>
          <div>
            <p className="font-mono text-lg font-semibold text-ink">
              {stats.sales}
            </p>
            <p className="label-tag text-ink-faint">Vendus</p>
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
    </div>
  );
}
