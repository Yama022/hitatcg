import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-ink text-cream hover:bg-ink-soft"
      : "border border-ink text-ink hover:bg-ink hover:text-cream";

  return (
    <Link
      href={href}
      className={`${base} ${styles}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
