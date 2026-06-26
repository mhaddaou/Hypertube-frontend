function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 ${filled ? "text-[#ff9f00]" : "text-white/40"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 1.5 12.58 6.9l5.94.78-4.35 4.09 1.1 5.88L10 14.78l-5.27 2.87 1.1-5.88-4.35-4.09 5.94-.78L10 1.5Z" />
    </svg>
  );
}

export function getStarCount(rating: string) {
  const numericRating = Number(rating);
  return Number.isFinite(numericRating) ? Math.max(1, Math.round(numericRating / 2)) : 4;
}

export function RatingStars({ rating }: { rating: string }) {
  const starCount = getStarCount(rating);

  return (
    <div className="flex items-center gap-1.5" aria-label={`${starCount} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((star) => (
        <StarIcon key={star} filled={star < starCount} />
      ))}
    </div>
  );
}
