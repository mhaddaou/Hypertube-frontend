import { MovieCard } from "./MovieCard";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { SectionHeading } from "./SectionHeading";

function CarouselDots() {
  return (
    <div className="flex items-center gap-1.5" aria-label="Carousel position">
      {[0, 1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={`h-2 rounded-full ${
            dot === 4 ? "w-5 bg-[#ff9f00]" : "w-2 bg-white/75"
          }`}
        />
      ))}
    </div>
  );
}

export function MoviesSection({ movies }: { movies: Movie[] }) {
  const items = movies.length ? movies : fallbackMovies;

  return (
    <section className="relative isolate overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-[4.5rem]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_88%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_10%_20%,rgba(255,159,0,0.07),transparent_26%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <SectionHeading title="Movies" />
          <CarouselDots />
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0">
          {items.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
