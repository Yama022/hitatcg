type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
