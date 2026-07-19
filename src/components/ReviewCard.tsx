export type Review = {
  author: string;
  quote: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white/60 p-6">
      <div className="text-gold" aria-hidden>
        ★★★★★
      </div>
      <blockquote className="font-display text-base text-ink">
        “{review.quote}”
      </blockquote>
      <figcaption className="text-sm text-ink-soft">
        — {review.author}, avis Whatnot
      </figcaption>
    </figure>
  );
}
