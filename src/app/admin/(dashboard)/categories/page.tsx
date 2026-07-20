import type { Metadata } from "next";
import { getAllCategories } from "@/lib/categories";
import { createCategory, deleteCategory } from "../actions";

export const metadata: Metadata = {
  title: "Catégories — Admin HitaTCG",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage(
  props: PageProps<"/admin/categories">
) {
  const searchParams = await props.searchParams;
  const errorMessage =
    typeof searchParams.error === "string" ? searchParams.error : null;

  const categories = await getAllCategories();

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold text-ink">Catégories</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Les catégories créées ici apparaissent dans le formulaire produit et
        dans le filtre du catalogue.
      </p>

      {errorMessage && (
        <p className="mt-4 rounded-lg bg-sakura-pale px-3 py-2 text-sm text-sakura-deep">
          {errorMessage}
        </p>
      )}

      <form action={createCategory} className="mt-6 flex gap-3">
        <input
          name="label"
          type="text"
          placeholder="Nom de la catégorie (ex : Booster)"
          required
          className="flex-1 rounded-lg border border-ink/20 px-3 py-2 text-sm outline-none focus:border-sakura"
        />
        <button
          type="submit"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:bg-ink-soft"
        >
          Ajouter
        </button>
      </form>

      <ul className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-ink">{cat.label}</span>
            <form
              action={async () => {
                "use server";
                await deleteCategory(cat.id);
              }}
            >
              <button type="submit" className="text-xs text-ink-soft hover:text-ink">
                Supprimer
              </button>
            </form>
          </li>
        ))}
        {categories.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-ink-soft">
            Aucune catégorie pour l&apos;instant.
          </li>
        )}
      </ul>
    </div>
  );
}
