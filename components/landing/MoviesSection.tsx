"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getMovies } from "@/actions/movies";
import { MovieCard, PosterMovieCardSkeleton } from "./MovieCard";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";
import { SectionHeading } from "./SectionHeading";

const SCROLL_END_THRESHOLD = 4;
const DOT_COUNT = 5;

function CarouselNav({
  canScrollLeft,
  canScrollRight,
  activeDot,
  onScroll,
  onDotClick,
}: {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  activeDot: number;
  onScroll: (direction: "left" | "right") => void;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2" aria-label="Carousel position">
      <button
        type="button"
        onClick={() => onScroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-black transition disabled:cursor-default ${
          canScrollLeft ? "cursor-pointer bg-primary hover:bg-primary/85" : "bg-white/30"
        }`}
      >
        <ChevronLeft className="h-3 w-3" />
      </button>

      {Array.from({ length: DOT_COUNT }, (_, dot) => (
        <button
          key={dot}
          type="button"
          onClick={() => onDotClick(dot)}
          aria-label={`Go to position ${dot + 1}`}
          className="cursor-pointer p-1"
        >
          <span
            className={`block h-1.5 w-1.5 rounded-full transition ${
              dot === activeDot ? "bg-primary" : "bg-white"
            }`}
          />
        </button>
      ))}

      <button
        type="button"
        onClick={() => onScroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-black transition disabled:cursor-default ${
          canScrollRight ? "cursor-pointer bg-primary hover:bg-primary/85" : "bg-white/30"
        }`}
      >
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}

export function MoviesSection({ movies, limit = 12 }: { movies: Movie[]; limit?: number }) {
  const [items, setItems] = useState(movies.length ? movies : fallbackMovies);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(movies.length >= limit);
  const [loadingMore, setLoadingMore] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const loadingRef = useRef(false);

  async function loadNextPage() {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoadingMore(true);

    const nextPage = page + 1;
    const nextMovies = await getMovies({ page: nextPage, limit });

    if (nextMovies.length) {
      setPage(nextPage);
      setItems((current) => [...current, ...nextMovies]);
    }
    setHasMore(nextMovies.length >= limit);

    setLoadingMore(false);
    loadingRef.current = false;
  }

  function updateScrollState() {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollLeft(track.scrollLeft > 4);
    const distanceFromEnd = track.scrollWidth - (track.scrollLeft + track.clientWidth);
    setCanScrollRight(distanceFromEnd > 4);

    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    setActiveDot(Math.round(progress * (DOT_COUNT - 1)));

    if (distanceFromEnd < SCROLL_END_THRESHOLD) {
      void loadNextPage();
    }
  }

  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  async function handleArrow(direction: "left" | "right") {
    const track = trackRef.current;

    if (direction === "left") {
      track?.scrollBy({ left: -480, behavior: "smooth" });
      return;
    }

    if (!canScrollRight && hasMore) {
      await loadNextPage();
    }
    requestAnimationFrame(() => track?.scrollBy({ left: 480, behavior: "smooth" }));
  }

  function handleDotClick(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: maxScroll * (index / (DOT_COUNT - 1)), behavior: "smooth" });
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-[4.5rem]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_88%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_10%_20%,rgba(255,159,0,0.07),transparent_26%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <SectionHeading title="Movies" />
          <CarouselNav
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight || hasMore}
            activeDot={activeDot}
            onScroll={handleArrow}
            onDotClick={handleDotClick}
          />
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {items.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {loadingMore
            ? [0, 1, 2].map((skeleton) => <PosterMovieCardSkeleton key={`skeleton-${skeleton}`} />)
            : null}
        </div>
      </div>
    </section>
  );
}
