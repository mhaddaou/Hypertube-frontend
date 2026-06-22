import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@/components/common/SectionTitle";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";

function PopularMovieCard({
  movie,
  className = "",
  sizes,
  imageType = "poster",
}: {
  movie: Movie;
  className?: string;
  sizes: string;
  imageType?: "poster" | "cover";
}) {
  const href = movie.id > 0 ? `/movies/${movie.id}` : "#";

  return (
    <Link
      href={href}
      aria-disabled={movie.id <= 0}
      className={`group relative overflow-hidden rounded-lg border border-[#ff9f00]/45 bg-zinc-950 shadow-2xl shadow-black/45 transition duration-300 hover:-translate-y-1 hover:border-[#ff9f00] hover:shadow-[0_0_28px_rgba(255,159,0,0.24)] ${className}`}
    >
      <Image
        src={imageType === "cover" ? movie.coverImage : movie.posterImage}
        alt={`${movie.title} poster`}
        fill
        quality={90}
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <h3 className="line-clamp-1 text-sm font-black text-white drop-shadow">
          {movie.title}
        </h3>
        <p className="mt-1 text-[10px] font-semibold text-white/75">
          {movie.year} / {movie.quality} / {movie.rating}
        </p>
      </div>
    </Link>
  );
}

export function PopularMovies({ movies }: { movies: Movie[] }) {
  const sourceMovies = (movies.length ? movies : fallbackMovies).slice(0, 6);
  const featuredIndex = sourceMovies.findIndex(
    (movie) => movie.coverImage !== movie.posterImage && !movie.coverImage.endsWith(".svg"),
  );
  const popularMovies =
    featuredIndex > 0
      ? [
          sourceMovies[featuredIndex],
          ...sourceMovies.slice(0, featuredIndex),
          ...sourceMovies.slice(featuredIndex + 1),
        ].slice(0, 5)
      : sourceMovies.slice(0, 5);

  return (
    <section className="relative isolate overflow-hidden bg-[#020202] py-14 sm:py-16 lg:py-[4.5rem]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,159,0,0.08),transparent_28%),linear-gradient(180deg,#050505_0%,#020202_36%,#050505_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <SectionTitle title="Popular Movies" size="lg" underlineWidth="w-32" />

          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#ff9f00] px-4 py-2 text-xs font-black text-black shadow-[0_8px_20px_rgba(255,159,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffb12a]"
          >
            View More
            <span aria-hidden="true" className="text-sm leading-none">
              +
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <PopularMovieCard
            movie={popularMovies[0]}
            className="aspect-[16/7.4] sm:col-span-2 lg:col-span-2"
            sizes="(min-width: 1024px) 780px, (min-width: 640px) 100vw, 100vw"
            imageType="cover"
          />
          <PopularMovieCard
            movie={popularMovies[1]}
            className="aspect-[4/5] sm:aspect-[16/8] lg:aspect-auto lg:h-full"
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          />
          {popularMovies.slice(2).map((movie) => (
            <PopularMovieCard
              key={movie.title}
              movie={movie}
              className="aspect-[4/3]"
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
