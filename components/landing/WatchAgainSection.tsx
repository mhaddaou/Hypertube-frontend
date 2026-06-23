import { WatchAgainCard } from "./MovieCard";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { SectionHeading } from "./SectionHeading";

export function WatchAgainSection({ movies }: { movies: Movie[] }) {
  const items = movies.length ? movies : fallbackMovies;

  return (
    <section className="relative isolate overflow-hidden bg-[#070707] py-14 sm:py-16 lg:py-[4.5rem]">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,5,5,0.94)_0%,rgba(5,5,5,0.64)_48%,rgba(5,5,5,0.84)_100%),radial-gradient(circle_at_18%_32%,rgba(43,83,78,0.45),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(255,159,0,0.16),transparent_18%),linear-gradient(135deg,#0a1110_0%,#121616_42%,#050505_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-transparent to-black/70" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-7">
          <SectionHeading title="Watch Again" />
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:gap-7 sm:px-6 lg:mx-0 lg:px-0">
          {items.map((movie) => (
            <WatchAgainCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
