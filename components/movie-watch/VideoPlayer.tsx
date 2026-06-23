import Image from "next/image";

import type { Movie } from "@/types/movie";

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.25 2.65v10.7c0 .58.63.94 1.13.64l8.82-5.35a.75.75 0 0 0 0-1.28L5.38 2.01a.75.75 0 0 0-1.13.64Z" />
    </svg>
  );
}

export function VideoPlayer({
  movie,
  sampleVideoSrc,
}: {
  movie: Movie;
  sampleVideoSrc: string | null;
}) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl shadow-black/60">
      <div className="aspect-video w-full">
        {sampleVideoSrc ? (
          <video
            className="h-full w-full bg-black object-contain"
            controls
            poster={movie.backgroundImage || movie.posterImage}
            preload="metadata"
          >
            <source src={sampleVideoSrc} type="video/mp4" />
            Video source not available yet.
          </video>
        ) : (
          <div className="relative grid h-full w-full place-items-center overflow-hidden bg-black">
            <Image
              src={movie.backgroundImage || movie.posterImage}
              alt=""
              fill
              priority
              quality={92}
              sizes="(min-width: 1024px) 1180px, 100vw"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68),rgba(0,0,0,0.34)),linear-gradient(0deg,rgba(0,0,0,0.82),rgba(0,0,0,0.12))]" />
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[#ff9f00] text-black shadow-[0_0_45px_rgba(255,159,0,0.36)]">
                <PlayIcon />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-bold italic text-white sm:text-4xl">
                Video source not available yet
              </h2>
              <p className="mt-3 max-w-md text-sm font-medium leading-6 text-white/70">
                This page is wired for playback, but real streaming is waiting on the backend.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
