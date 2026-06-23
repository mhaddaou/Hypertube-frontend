import Image from "next/image";
import Link from "next/link";

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

export function FeaturedBanner({ movie }: { movie: Movie | null }) {
  const featuredMovie = movie ?? fallbackMovies[1];
  const href = featuredMovie.id > 0 ? `/movies/${featuredMovie.id}` : "#";

  return (
    <section className="bg-[#080808] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-12">
      <div className="mx-auto max-w-[1120px]">
        <article className="relative isolate overflow-visible rounded-lg bg-[#c07a08] shadow-2xl shadow-black/50">
          <Image
            src={featuredMovie.backgroundImage}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="-z-30 rounded-lg object-cover"
          />
          <div className="absolute inset-0 -z-20 rounded-lg bg-[linear-gradient(90deg,rgba(255,159,0,0.9)_0%,rgba(184,102,4,0.78)_45%,rgba(18,10,4,0.9)_100%)]" />
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-3/5 bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.38)_42%,rgba(0,0,0,0.78)_100%)] md:block" />

          <div className="grid min-h-[240px] grid-cols-1 items-center gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
            <Link
              href={href}
              aria-disabled={featuredMovie.id <= 0}
              className="relative mx-auto aspect-[2/3] w-36 overflow-hidden rounded-lg shadow-2xl shadow-black/45 sm:w-44 md:-mt-12 md:w-[12.5rem] lg:w-52"
            >
              <Image
                src={featuredMovie.posterImage}
                alt={`${featuredMovie.title} poster`}
                fill
                quality={90}
                sizes="(min-width: 1024px) 208px, 176px"
                className="object-cover transition duration-500 hover:scale-[1.03]"
              />
            </Link>

            <div className="max-w-2xl pb-8 text-center md:text-left">
              <div className="flex flex-col items-center gap-3 md:flex-row">
                <Link
                  href={href}
                  aria-disabled={featuredMovie.id <= 0}
                  className="font-serif text-2xl font-bold italic text-white transition hover:text-[#ff9f00] sm:text-3xl"
                >
                  {featuredMovie.title}
                </Link>
                <RatingStars rating={featuredMovie.rating} />
              </div>
              <p className="mt-4 max-w-xl text-sm font-semibold italic leading-6 text-white/90">
                {featuredMovie.summary}
              </p>
              <Link
                href={href}
                aria-disabled={featuredMovie.id <= 0}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#ff9f00] px-4 py-2.5 text-xs font-black text-black shadow-[0_10px_22px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffb12a]"
              >
                <PlayIcon />
                Watch now
              </Link>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={`h-1.5 rounded-full ${dot === 1 ? "w-5 bg-white" : "w-1.5 bg-white/65"}`}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
