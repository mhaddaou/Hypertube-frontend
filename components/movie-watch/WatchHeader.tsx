import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import type { Movie } from "@/types/movie";

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

export function WatchHeader({ movie }: { movie: Movie }) {
  return (
    <header className="border-b border-white/10 bg-[#050505]/92">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex min-w-0 items-center gap-4">
          <BrandLogo />
          <div className="hidden h-8 w-px bg-white/12 sm:block" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#ff9f00]">
              Now watching
            </p>
            <h1 className="mt-1 truncate font-serif text-xl font-bold italic text-white sm:text-2xl">
              {movie.title}
            </h1>
          </div>
        </div>

        <Link
          href={`/movies/${movie.id}`}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:border-[#ff9f00] hover:text-[#ff9f00]"
        >
          <BackIcon />
          Back to movie details
        </Link>
      </div>
    </header>
  );
}
