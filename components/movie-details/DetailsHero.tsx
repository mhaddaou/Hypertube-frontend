import Image from "next/image";

import { Button, ButtonLink } from "@/components/common/Button";
import type { Movie } from "@/types/movie";
import { DetailsNav } from "./DetailsNav";

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.25 2.65v10.7c0 .58.63.94 1.13.64l8.82-5.35a.75.75 0 0 0 0-1.28L5.38 2.01a.75.75 0 0 0-1.13.64Z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4.8C6 3.8 6.8 3 7.8 3h8.4c1 0 1.8.8 1.8 1.8V21l-6-3.5L6 21V4.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DetailsHero({ movie }: { movie: Movie }) {
  const metadata = [
    movie.runtime,
    movie.year,
    movie.genres.join(" / "),
    movie.language || movie.quality,
  ].filter(Boolean);

  return (
    <section className="relative isolate min-h-[450px] overflow-hidden bg-[#050505] pb-12 pt-[7.5rem] sm:min-h-[500px] sm:pt-[8.5rem] lg:min-h-[540px] lg:pt-32">
      <Image
        src={movie.backgroundImage}
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.46)_44%,rgba(5,5,5,0.14)_100%),linear-gradient(0deg,rgba(5,5,5,0.68)_0%,rgba(5,5,5,0.08)_44%,rgba(5,5,5,0.28)_100%)]" />

      <DetailsNav />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-bold italic text-white/90">Movie</p>
          <h1 className="mt-7 font-serif text-4xl font-bold italic leading-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            {movie.title}
          </h1>
          <p className="mt-4 text-xs font-semibold italic text-white/75 sm:text-sm">
            {metadata.join(" / ")}
          </p>
          <p className="mt-4 line-clamp-4 max-w-xl text-sm font-medium leading-6 text-white/82">
            {movie.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ButtonLink
              href={`/movies/${movie.id}/watch`}
              className="px-5"
            >
              <PlayIcon />
              Play now
            </ButtonLink>
            <Button variant="outline" className="border-white/80 bg-black/20 px-5">
              <BookmarkIcon />
              add watchlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
