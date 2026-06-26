import Image from "next/image";
import Link from "next/link";

import type { Movie } from "@/types/movie";

function RatingPill({ rating }: { rating: string }) {
  return (
    <span className="inline-flex h-5 items-center gap-1 rounded-full bg-primary/25 pr-2.5 text-[11px] font-bold text-white">
      <Image src="/icons/stars.svg" alt="" width={14} height={14} className="h-full w-auto pr-1" aria-hidden="true" />
      {rating}
    </span>
  );
}

export function PosterMovieCard({ movie }: { movie: Movie }) {
  const href = movie.id > 0 ? `/movies/${movie.id}` : "#";

  return (
    <Link
      href={href}
      aria-disabled={movie.id <= 0}
      className="group w-43 shrink-0 snap-start sm:w-47.5 lg:w-49.5"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-primary bg-zinc-950 shadow-xl shadow-black/50 transition duration-300 group-hover:shadow-[0_0_24px_rgba(255,159,0,0.2)]">
        <Image
          src={movie.posterImage}
          alt={`${movie.title} poster`}
          fill
          quality={90}
          sizes="(min-width: 1024px) 198px, 180px"
          className="object-cover transition duration-500 group-hover:scale-[1.06]"
        />
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-2 min-h-[32px] font-lemonada text-sm font-bold leading-5 text-primary">
          {movie.title}
        </h3>
        <p className="mt-1 font-lemonada text-xs font-medium text-white/55">
          {movie.year} &nbsp; {movie.runtime}
        </p>
        <div className="mt-2 font-lemonada">
          <RatingPill rating={movie.rating} />
        </div>
      </div>
    </Link>
  );
}

export function PosterMovieCardSkeleton() {
  return (
    <div className="w-43 shrink-0 snap-start sm:w-47.5 lg:w-49.5" aria-hidden="true">
      <div className="aspect-2/3 animate-pulse rounded-lg border border-white/10 bg-white/10" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
        <div className="h-5 w-12 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function WatchAgainMovieCard({ movie }: { movie: Movie }) {
  const href = movie.id > 0 ? `/movies/${movie.id}` : "#";

  return (
    <Link
      href={href}
      aria-disabled={movie.id <= 0}
      className="group w-[148px] shrink-0 snap-start sm:w-[164px] lg:w-[176px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-zinc-950 shadow-xl shadow-black/55 transition duration-300 group-hover:-translate-y-1 group-hover:border-[#ff9f00]/80 group-hover:shadow-[0_0_22px_rgba(255,159,0,0.2)]">
        <Image
          src={movie.posterImage}
          alt={`${movie.title} poster`}
          fill
          quality={90}
          sizes="(min-width: 1024px) 184px, 168px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-3 line-clamp-1 text-[11px] font-black leading-4 text-[#ff9f00]">
        {movie.title}
      </h3>
      <p className="line-clamp-1 text-[10px] font-semibold text-white">
        {movie.genres.join(" / ") || `${movie.year} / ${movie.quality}`}
      </p>
    </Link>
  );
}

export function LandscapeMovieCard({ movie, titlePrefix = "" }: { movie: Movie; titlePrefix?: string }) {
  const href = movie.id > 0 ? `/movies/${movie.id}` : "#";

  return (
    <Link
      href={href}
      aria-disabled={movie.id <= 0}
      className="group w-60 shrink-0 snap-start sm:w-64"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-zinc-950 shadow-xl shadow-black/45">
        <Image
          src={movie.coverImage || movie.posterImage}
          alt={`${movie.title} poster`}
          fill
          quality={90}
          sizes="256px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <h3 className="mt-3 line-clamp-1 text-sm font-black text-white">
        {titlePrefix}
        {movie.title}
      </h3>
      <p className="mt-2 flex items-center gap-2 text-xs text-white/60">
        <span className="font-black text-[#ff9f00]">&#9733;</span>
        <span className="font-semibold text-white">{movie.rating}</span>
        <span>{movie.genres[0] ?? "Action"} / Movie</span>
      </p>
    </Link>
  );
}
