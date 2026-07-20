"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { categoryLabels } from "@/lib/product-categories";

export function CatalogueFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label htmlFor="q" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          Nom
        </label>
        <input
          id="q"
          type="text"
          value={search}
          placeholder="Rechercher..."
          onChange={(e) => setSearch(e.target.value)}
          onBlur={() => updateParam("q", search)}
          onKeyDown={(e) => e.key === "Enter" && updateParam("q", search)}
          className="mt-1 block w-40 rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-sakura"
        />
      </div>

      <div>
        <label htmlFor="category" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          Catégorie
        </label>
        <select
          id="category"
          defaultValue={searchParams.get("category") ?? ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="mt-1 block w-40 rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-sakura"
        >
          <option value="">Toutes</option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="minPrice" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          Prix min
        </label>
        <input
          id="minPrice"
          type="number"
          min={0}
          defaultValue={searchParams.get("minPrice") ?? ""}
          onBlur={(e) => updateParam("minPrice", e.target.value)}
          className="mt-1 block w-24 rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-sakura"
        />
      </div>

      <div>
        <label htmlFor="maxPrice" className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          Prix max
        </label>
        <input
          id="maxPrice"
          type="number"
          min={0}
          defaultValue={searchParams.get("maxPrice") ?? ""}
          onBlur={(e) => updateParam("maxPrice", e.target.value)}
          className="mt-1 block w-24 rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-sakura"
        />
      </div>

      {(searchParams.get("q") ||
        searchParams.get("category") ||
        searchParams.get("minPrice") ||
        searchParams.get("maxPrice")) && (
        <button
          type="button"
          onClick={() => {
            setSearch("");
            startTransition(() => router.push(pathname));
          }}
          className="text-sm text-ink-soft underline hover:text-ink"
        >
          Réinitialiser
        </button>
      )}

      {isPending && <span className="text-xs text-ink-soft">Mise à jour…</span>}
    </div>
  );
}
