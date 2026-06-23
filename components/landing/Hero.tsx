"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { RatingStars } from "@/components/common/RatingStars";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { Navbar } from "@/components/layout/Navbar";
import { MoviePosterStrip } from "./MoviePosterStrip";

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.25 2.65v10.7c0 .58.63.94 1.13.64l8.82-5.35a.75.75 0 0 0 0-1.28L5.38 2.01a.75.75 0 0 0-1.13.64Z" />
    </svg>
  );
}

function getTitleLines(title: string) {
  if (title.toLowerCase().includes("spider") && title.toLowerCase().includes("no way home")) {
    return ["Spider man", "No way Home"];
  }

  return title.includes(": ") ? title.split(": ") : [title];
}

export function Hero({
  movie,
  posterMovies,
}: {
  movie: Movie | null;
  posterMovies: Movie[];
}) {
  const heroMovies = useMemo(() => {
    const movies = posterMovies.length ? posterMovies : fallbackMovies;
    const seedMovie = movie ?? movies[0] ?? fallbackMovies[0];
    const withoutDuplicate = movies.filter((item) => item.id !== seedMovie.id);

    return [seedMovie, ...withoutDuplicate].slice(0, 7);
  }, [movie, posterMovies]);

  const [activeMovie, setActiveMovie] = useState<Movie>(heroMovies[0]);
  const genres = activeMovie.genres.length
    ? activeMovie.genres
    : ["Crime", "Drama", "Mystery"];
  const titleLines = getTitleLines(activeMovie.title);

  return (
    <section className="relative isolate min-h-[700px] overflow-hidden bg-[#050505] pb-8 sm:min-h-[720px] sm:pb-10 lg:min-h-[710px]">
      <Image
        key={activeMovie.id}
        src={activeMovie.backgroundImage}
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-center transition-opacity duration-500"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.46)_42%,rgba(5,5,5,0.14)_100%),linear-gradient(0deg,rgba(5,5,5,0.68)_0%,rgba(5,5,5,0.08)_38%,rgba(5,5,5,0.28)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_22%,rgba(255,159,0,0.08),transparent_20%),radial-gradient(circle_at_88%_7%,rgba(255,255,255,0.08),transparent_10%)]" />

      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-[8.25rem] sm:px-6 sm:pt-[8.5rem] md:pt-[7.5rem] lg:px-12 lg:pt-[7.25rem]">
        <div className="max-w-xl">
          <h1 className="max-w-[600px] font-serif text-4xl font-bold italic leading-[1.05] text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="mt-4">
            <RatingStars rating={activeMovie.rating} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium italic text-white/85">
            {genres.map((genre, index) => (
              <span key={genre} className="contents">
                {index > 0 ? <span className="h-1 w-1 rounded-full bg-white/45" /> : null}
                <span>{genre}</span>
              </span>
            ))}
          </div>

          <p className="mt-3 line-clamp-4 max-w-lg text-sm font-medium leading-6 text-white/80 sm:text-base">
            {activeMovie.summary}
          </p>

          <a
            href="#"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ff9f00] px-4 py-2.5 text-sm font-bold text-black shadow-[0_14px_28px_rgba(255,159,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffb12a]"
          >
            <PlayIcon />
            Watch now
          </a>
        </div>

        <MoviePosterStrip
          activeMovieId={activeMovie.id}
          movies={heroMovies}
          onSelectMovie={setActiveMovie}
        />
      </div>
    </section>
  );
}
