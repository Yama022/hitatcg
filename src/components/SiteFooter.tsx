import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="font-display text-base font-semibold text-ink">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">{siteConfig.description}</p>
        </div>

        <div className="flex gap-12 text-sm">
          <div>
            <p className="font-semibold text-ink">Navigation</p>
            <ul className="mt-3 space-y-2 text-ink-soft">
              <li><Link href="/catalogue" className="hover:text-ink">Catalogue</Link></li>
              <li><Link href="/a-propos" className="hover:text-ink">À propos</Link></li>
              <li><Link href="/avis" className="hover:text-ink">Avis</Link></li>
              <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-ink">Nous suivre</p>
            <ul className="mt-3 space-y-2 text-ink-soft">
              <li>
                <a href={siteConfig.whatnotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  Whatnot
                </a>
              </li>
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-ink">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-xs text-ink-soft sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-ink">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-ink">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
