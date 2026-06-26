"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";

const reorderTransition = { type: "spring", stiffness: 280, damping: 28, mass: 0.9 } as const;

function PlayGlyph() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff9f00] text-black shadow-lg shadow-black/40 backdrop-blur">
        <svg aria-hidden="true" className="h-4 w-4 translate-x-px" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.25 2.65v10.7c0 .58.63.94 1.13.64l8.82-5.35a.75.75 0 0 0 0-1.28L5.38 2.01a.75.75 0 0 0-1.13.64Z" />
        </svg>
      </span>
    </span>
  );
}

export function MoviePosterStrip({
  activeMovieId,
  movies,
  onSelectMovie,
}: {
  activeMovieId: number;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}) {
  const [order, setOrder] = useState<Movie[]>(() =>
    (movies.length ? movies : fallbackMovies).slice(0, 7),
  );

  useEffect(() => {
    setOrder((movies.length ? movies : fallbackMovies).slice(0, 7));
  }, [movies]);

  function handleSelect(poster: Movie) {
    if (poster.id <= 0) return;

    onSelectMovie(poster);
    setOrder((current) => {
      const clickedIndex = current.findIndex((item) => item.id === poster.id);
      if (clickedIndex <= 0) return current;

      return [...current.slice(clickedIndex), ...current.slice(0, clickedIndex)];
    });
  }

  return (
    <div className="flex w-full justify-end ">
      <div className="w-full max-w-160 overflow-hidden px-1 sm:max-w-200 sm:px-2 lg:max-w-229">
        <div className="flex items-end gap-3 py-5 sm:gap-4">
          {order.map((poster) => {
            const isActive = poster.id === activeMovieId;
            const isDisabled = poster.id <= 0;

            return (
              <motion.button
                key={poster.id}
                layout
                transition={reorderTransition}
                whileHover={!isActive && !isDisabled ? { scale: 1.06, y: -6 } : undefined}
                whileTap={!isDisabled ? { scale: 0.96 } : undefined}
                type="button"
                onClick={() => handleSelect(poster)}
                disabled={isDisabled}
                className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-zinc-950 text-left shadow-2xl shadow-black/60 outline-none focus-visible:ring-2 focus-visible:ring-[#ff9f00] disabled:cursor-default disabled:opacity-60 ${
                  isActive
                    ? "h-48 w-36 border-[#ff9f00] shadow-[0_0_34px_rgba(255,159,0,0.4)] ring-1 ring-[#ff9f00]/50 sm:h-60 sm:w-44 lg:h-68 lg:w-52"
                    : "h-44 w-32 border-white/12 hover:border-[#ff9f00] hover:shadow-[0_18px_36px_-12px_rgba(255,159,0,0.45)] sm:h-52 sm:w-40 lg:h-60 lg:w-46"
                }`}
                aria-pressed={isActive ? "true" : "false"}
                aria-label={`Preview ${poster.title}`}
              >
                <Image
                  src={poster.posterImage}
                  alt={`${poster.title} poster`}
                  fill
                  quality={90}
                  sizes={isActive ? "208px" : "184px"}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

                {!isActive ? <PlayGlyph /> : null}

                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="line-clamp-2 text-[10px] font-black uppercase leading-tight tracking-wide text-white drop-shadow sm:text-xs">
                    {poster.title}
                  </p>
                </div>

                {/* Active accent bar */}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.75 origin-left bg-[#ff9f00] transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
