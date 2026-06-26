"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { RatingStars } from "@/components/common/RatingStars";
import { fallbackMovies } from "@/data/fallbackMovies";
import type { Movie } from "@/types/movie";

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.25 2.65v10.7c0 .58.63.94 1.13.64l8.82-5.35a.75.75 0 0 0 0-1.28L5.38 2.01a.75.75 0 0 0-1.13.64Z" />
    </svg>
  );
}

function BannerSlide({ movie }: { movie: Movie }) {
  const href = movie.id > 0 ? `/movies/${movie.id}` : "#";

  return (
    <article className="relative w-full shrink-0 snap-start overflow-visible rounded-lg border border-primary bg-[#c07a08] shadow-2xl shadow-black/50">
      <Image
        src={movie.backgroundImage}
        alt=""
        fill
        quality={90}
        sizes="(min-width: 1024px) 1152px, 100vw"
        className="-z-30 rounded-lg object-cover"
      />
      <div className="absolute inset-0 -z-20 rounded-lg bg-[linear-gradient(90deg,rgba(255,159,0,0.9)_0%,rgba(184,102,4,0.78)_45%,rgba(18,10,4,0.9)_100%)]" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-3/5 bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.38)_42%,rgba(0,0,0,0.78)_100%)] md:block" />

      <div className="absolute left-6 top-0 aspect-4/5 w-48 -translate-y-10 overflow-hidden rounded-lg border border-primary shadow-2xl shadow-black/45 sm:w-56 sm:-translate-y-12 md:w-62 md:-translate-y-16 lg:w-64 lg:-translate-y-20">
        <Image
          src={movie.posterImage}
          alt={`${movie.title} poster`}
          fill
          quality={90}
          sizes="(min-width: 1024px) 256px, 224px"
          className="object-cover"
        />
      </div>

      <div className="grid min-h-60 grid-cols-1 gap-6 p-6 pl-6 sm:p-8 md:grid-cols-[248px_1fr] md:pl-8 lg:grid-cols-[256px_1fr]">
        <div className="hidden md:block" aria-hidden="true" />

        <div className="max-w-2xl pb-8 pt-50 text-center sm:pt-58 md:pt-0 md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <h3 className="font-lemonada text-2xl font-bold italic text-white sm:text-3xl">
              {movie.title}
            </h3>
            <RatingStars rating={movie.rating} />
          </div>
          <p className="mt-4 max-w-xl text-sm font-semibold italic leading-6 text-white/90 font-lemonada">
            {movie.summary}
          </p>
          <Link
            href={href}
            aria-disabled={movie.id <= 0}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ff9f00] px-4 py-2.5 text-xs font-black text-black shadow-[0_10px_22px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffb12a]"
          >
            <PlayIcon />
            Watch now
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedBanner({ movies }: { movies: Movie[] }) {
  const slides = (movies.length ? movies : fallbackMovies).slice(0, 3);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  function updateActiveSlide() {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setActiveSlide(Math.round(track.scrollLeft / track.clientWidth));
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateActiveSlide);
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      track.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  function goToSlide(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
  }

  return (
    <section className="bg-[#080808] px-4 py-14 sm:px-6 sm:py-18 lg:px-12">
      <div className="relative mx-auto max-w-280">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth pt-10 sm:pt-12 md:pt-16 lg:pt-20"
        >
          {slides.map((movie) => (
            <BannerSlide key={movie.id} movie={movie} />
          ))}
        </div>

        {slides.length > 1 ? (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {slides.map((movie, index) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="cursor-pointer p-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    index === activeSlide ? "w-5 bg-white" : "w-1.5 bg-white/65"
                  }`}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
