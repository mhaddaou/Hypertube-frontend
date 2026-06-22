import Image from "next/image";
import Link from "next/link";

import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";

export function MoviePosterStrip({
  activeMovieId,
  movies,
  onSelectMovie,
}: {
  activeMovieId: number;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}) {
  const posters = (movies.length ? movies : fallbackMovies).slice(0, 7);

  return (
    <div className="mt-7 w-full sm:mt-9 lg:mt-10">
      <div className="no-scrollbar -mx-4 flex snap-x items-end gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        {posters.map((poster) => {
          const isActive = poster.id === activeMovieId;
          const href = poster.id > 0 ? `/movies/${poster.id}` : "#";

          return (
            <Link
              key={poster.id}
              href={href}
              onFocus={() => onSelectMovie(poster)}
              onMouseEnter={() => onSelectMovie(poster)}
              className={`group relative shrink-0 snap-start overflow-hidden rounded-lg border bg-zinc-950 text-left shadow-2xl shadow-black/60 outline-none transition duration-300 hover:-translate-y-1 hover:border-[#ff9f00] focus-visible:ring-2 focus-visible:ring-[#ff9f00] ${
                isActive
                  ? "h-40 w-28 border-[#ff9f00] shadow-[0_0_30px_rgba(255,159,0,0.38)] sm:h-52 sm:w-36 lg:h-60 lg:w-44"
                  : "h-36 w-24 border-white/10 sm:h-44 sm:w-32 lg:h-52 lg:w-[9.5rem]"
              }`}
              aria-pressed={isActive}
              aria-disabled={poster.id <= 0}
              aria-label={`Open details for ${poster.title}`}
            >
              <Image
                src={poster.posterImage}
                alt={`${poster.title} poster`}
                fill
                quality={90}
                sizes={isActive ? "160px" : "144px"}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="line-clamp-2 text-[10px] font-black uppercase leading-tight text-white drop-shadow sm:text-xs">
                  {poster.title}
                </p>
              </div>
              {isActive ? (
                <span className="absolute right-2 top-2 rounded-full bg-[#ff9f00] px-2 py-1 text-[9px] font-black uppercase text-black">
                  Active
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
