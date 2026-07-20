import Link from "next/link";
import { logout } from "./actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-6 text-sm font-medium text-ink-soft">
            <Link href="/admin/produits" className="hover:text-ink">
              Produits
            </Link>
            <Link href="/" className="hover:text-ink" target="_blank">
              Voir le site ↗
            </Link>
          </nav>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-medium text-ink-soft hover:text-ink"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
