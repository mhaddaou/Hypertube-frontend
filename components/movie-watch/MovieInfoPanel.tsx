import Link from "next/link";

import { Button } from "@/components/common/Button";
import type { Movie } from "@/types/movie";

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4.8C6 3.8 6.8 3 7.8 3h8.4c1 0 1.8.8 1.8 1.8V21l-6-3.5L6 21V4.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MovieInfoPanel({ movie }: { movie: Movie }) {
  const metadata = [
    movie.year,
    movie.runtime,
    movie.genres.join(" / "),
    movie.quality,
  ].filter(Boolean);

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/25 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff9f00]">
            H-Tube player
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold italic text-white sm:text-4xl">
            {movie.title}
          </h2>
          <p className="mt-3 text-sm font-semibold text-white/65">
            {metadata.join(" / ")}
          </p>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/76">
            {movie.summary}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={`/movies/${movie.id}`}
            className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-black/30 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#ff9f00] hover:text-[#ff9f00]"
          >
            <BackIcon />
            Back to details
          </Link>
          <Button>
            <BookmarkIcon />
            Add watchlist
          </Button>
        </div>
      </div>
    </section>
  );
}
