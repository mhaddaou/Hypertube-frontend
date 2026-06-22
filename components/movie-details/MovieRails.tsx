import { LandscapeMovieCard } from "@/components/common/MovieCard";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { SectionTitle } from "./SectionTitle";

function ArrowButton() {
  return (
    <div className="pointer-events-none absolute right-2 top-[40%] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white md:grid">
      <span className="text-2xl leading-none">›</span>
    </div>
  );
}

export function MovieRail({ title, movies }: { title: string; movies: Movie[] }) {
  const railMovies = (movies.length ? movies : fallbackMovies).slice(0, 8);

  return (
    <section className="bg-[#09090b] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionTitle title={title} />
        <div className="relative mt-7">
          <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-3">
            {railMovies.map((movie) => (
              <LandscapeMovieCard key={`${title}-${movie.id}`} movie={movie} />
            ))}
          </div>
          <ArrowButton />
        </div>
      </div>
    </section>
  );
}
