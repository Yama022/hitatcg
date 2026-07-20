import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Connexion admin — HitaTCG",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage(
  props: PageProps<"/admin/login">
) {
  const searchParams = await props.searchParams;
  const error = typeof searchParams.error === "string" ? searchParams.error : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8">
        <div className="flex justify-center">
          <Logo className="h-14 w-14" style={{ width: 56, height: 56 }} />
        </div>
        <h1 className="font-display mt-4 text-center text-xl font-semibold text-ink">
          Espace admin
        </h1>

        {error && (
          <p className="mt-4 rounded-lg bg-sakura-pale px-3 py-2 text-sm text-sakura-deep">
            Identifiants incorrects.
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm outline-none focus:border-sakura"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm outline-none focus:border-sakura"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
