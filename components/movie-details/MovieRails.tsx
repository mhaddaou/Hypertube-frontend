"use client";

import { useRef } from "react";

import { PosterMovieCard } from "@/components/common/MovieCard";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { SectionTitle } from "./SectionTitle";

function ArrowButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll right"
      className="absolute right-2 top-[40%] hidden h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/15 text-white transition hover:bg-primary hover:text-black md:grid"
    >
      <span className="text-2xl leading-none">›</span>
    </button>
  );
}

export function MovieRail({ title, movies }: { title: string; movies: Movie[] }) {
  const railMovies = (movies.length ? movies : fallbackMovies).slice(0, 8);
  const trackRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    trackRef.current?.scrollBy({ left: 480, behavior: "smooth" });
  }

  return (
    <section className="bg-[#09090b] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionTitle title={title} />
        <div className="relative mt-7">
          <div ref={trackRef} className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-3">
            {railMovies.map((movie) => (
              <PosterMovieCard key={`${title}-${movie.id}`} movie={movie} />
            ))}
          </div>
          <ArrowButton onClick={handleScroll} />
        </div>
      </div>
    </section>
  );
}
