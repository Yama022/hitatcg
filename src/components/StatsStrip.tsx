import { siteConfig } from "@/lib/config";

const items = [
  { label: "Abonnés Whatnot", value: siteConfig.stats.followers },
  { label: "Ventes réalisées", value: siteConfig.stats.sales },
  { label: "Avis clients", value: siteConfig.stats.reviews },
  { label: "Note moyenne", value: `${siteConfig.stats.rating} ★` },
];

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-white sm:grid-cols-4">
      {items.map((item, i) => {
        const noBorderRMobile = (i + 1) % 2 === 0;
        const noBorderRDesktop = (i + 1) % 4 === 0;
        const noBorderBMobile = i >= items.length - 2;

        return (
          <div
            key={item.label}
            className={[
              "border-ink/10 p-6 text-center",
              noBorderRMobile ? "" : "border-r",
              noBorderRDesktop ? "sm:border-r-0" : "sm:border-r",
              noBorderBMobile ? "" : "border-b",
              "sm:border-b-0",
            ].join(" ")}
          >
            <p className="font-mono text-3xl font-semibold text-ink sm:text-4xl">
              {item.value}
            </p>
            <p className="label-tag mt-1 text-ink-faint">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
