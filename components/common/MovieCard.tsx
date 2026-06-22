import Image from "next/image";
import Link from "next/link";

import type { Movie } from "@/types/movie";

function RatingPill({ rating }: { rating: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#ff9f00] px-2 py-0.5 text-[10px] font-black text-black">
      <span aria-hidden="true">&#9733;</span>
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
      className="group w-[150px] shrink-0 snap-start sm:w-[166px] lg:w-[172px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-xl shadow-black/50 transition duration-300 group-hover:-translate-y-1 group-hover:border-[#ff9f00]/80 group-hover:shadow-[0_0_24px_rgba(255,159,0,0.2)]">
        <Image
          src={movie.posterImage}
          alt={`${movie.title} poster`}
          fill
          quality={90}
          sizes="(min-width: 1024px) 176px, 158px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-2 min-h-[32px] text-xs font-bold leading-4 text-white">
          {movie.title}
        </h3>
        <p className="mt-1 text-[10px] font-medium text-white/55">
          {movie.year} / {movie.runtime} / {movie.quality}
        </p>
        <div className="mt-2">
          <RatingPill rating={movie.rating} />
        </div>
      </div>
    </Link>
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
