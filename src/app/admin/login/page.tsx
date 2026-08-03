import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/Button";
import { cardSurface } from "@/lib/ui";
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
      <div className={`w-full max-w-sm bg-white p-8 ${cardSurface}`}>
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
          <FormInput id="email" name="email" type="email" label="Email" required />
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            required
          />
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
}
