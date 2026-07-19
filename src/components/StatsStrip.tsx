import { siteConfig } from "@/lib/config";

const items = [
  { label: "Abonnés Whatnot", value: siteConfig.stats.followers },
  { label: "Ventes réalisées", value: siteConfig.stats.sales },
  { label: "Avis clients", value: siteConfig.stats.reviews },
  { label: "Note moyenne", value: `${siteConfig.stats.rating} ★` },
];

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-6 border-y border-ink/10 py-8 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {item.value}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
