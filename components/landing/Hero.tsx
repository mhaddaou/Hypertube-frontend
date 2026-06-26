"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";

import { RatingStars } from "@/components/common/RatingStars";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { Navbar } from "@/components/layout/Navbar";
import { MoviePosterStrip } from "./MoviePosterStrip";
import Link from "next/link";

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
    <section className="relative isolate flex h-svh max-h-screen min-h-160 flex-col overflow-hidden bg-[#050505]">
      <div key={activeMovie.id} className="absolute inset-0 -z-30 overflow-hidden">
        <Image
          src={activeMovie.backgroundImage}
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="animate-hero-ken-burns object-cover object-center will-change-transform"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.46)_42%,rgba(5,5,5,0.14)_100%),linear-gradient(0deg,rgba(5,5,5,0.78)_0%,rgba(5,5,5,0.08)_38%,rgba(5,5,5,0.28)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_22%,rgba(255,159,0,0.08),transparent_20%),radial-gradient(circle_at_88%_7%,rgba(255,255,255,0.08),transparent_10%)]" />

      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-30 sm:px-6 md:pt-28 lg:px-12 lg:pt-27">
        <div key={activeMovie.id} className="max-w-xl">
          <h1 className="animate-hero-fade-up max-w-150 font-serif text-4xl font-bold italic leading-[1.05] text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            {titleLines.map((line) => (
              <span key={line} className="block font-lemonada">
                {line}
              </span>
            ))}
          </h1>

          <div className="animate-hero-fade-up mt-4 [animation-delay:80ms]">
            <RatingStars rating={activeMovie.rating} />
          </div>

          <div className="animate-hero-fade-up mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium italic [animation-delay:140ms] font-lemonada">
            {genres.map((genre, index) => (
              <span key={genre} className="contents">
                {index > 0 ? <span className="text-primary/70">|</span> : null}
                <span className="text-white/85">{index === 0 ? genre.toLowerCase() : genre}</span>
              </span>
            ))}
          </div>

          <div className="animate-hero-fade-up mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-white/75 [animation-delay:170ms] font-lemonada">
            <span>{activeMovie.year}</span>
            <span className="text-primary/70">|</span>
            <span>{activeMovie.runtime}</span>
            <span className="text-primary/70">|</span>
            <span>{genres[genres.length - 1] ?? genres[0]}</span>
          </div>

          <p className="animate-hero-fade-up mt-3 line-clamp-3 min-h-18 max-w-lg text-sm font-medium leading-6 text-white/80 [animation-delay:200ms] sm:text-base font-lemonada">
            {activeMovie.summary}
          </p>

          <Link
            href="#"
            className="animate-hero-fade-up mt-4  inline-flex items-center gap-2 rounded-md bg-[#ff9f00] px-4 py-2.5 text-sm font-bold text-black shadow-[0_14px_28px_rgba(255,159,0,0.28)] transition [animation-delay:260ms] hover:-translate-y-0.5 hover:bg-[#ffb12a]"
          >
            <Play className="h-3.5 w-3.5" fill="currentColor" />
            Watch now
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 w-full pb-5 sm:pb-7">
        <MoviePosterStrip
          activeMovieId={activeMovie.id}
          movies={heroMovies}
          onSelectMovie={setActiveMovie}
        />
      </div>
    </section>
  );
}
