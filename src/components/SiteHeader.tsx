"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/CTAButton";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/a-propos", label: "À propos" },
  { href: "/avis", label: "Avis" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-10 w-10 shrink-0">
              <Logo
                className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
                style={{ width: 64, height: 64 }}
              />
            </span>
            <span className="font-display text-lg font-semibold text-ink">
              {siteConfig.name}
            </span>
          </Link>
          <div className="md:hidden">
            <CTAButton href={siteConfig.whatnotUrl} external variant="secondary">
              Whatnot
            </CTAButton>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 pb-0.5 transition-colors ${
                  isActive
                    ? "border-sakura text-ink"
                    : "border-transparent hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <CTAButton href={siteConfig.whatnotUrl} external variant="secondary">
            Voir sur Whatnot
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
