import { existsSync } from "node:fs";
import { join } from "node:path";

import { MovieInfoPanel } from "@/components/movie-watch/MovieInfoPanel";
import { VideoPlayer } from "@/components/movie-watch/VideoPlayer";
import { WatchHeader } from "@/components/movie-watch/WatchHeader";
import { fallbackMovies, spiderManFallbackMovie } from "@/data/fallbackMovies";
import { getMovieDetails } from "@/lib/moviesApi";

type MovieWatchPageProps = {
  params: Promise<{ id: string }>;
};

const SAMPLE_VIDEO_PATH = "/videos/sample.mp4";

function getSampleVideoSrc() {
  const sampleVideoFile = join(process.cwd(), "public", "videos", "sample.mp4");

  return existsSync(sampleVideoFile) ? SAMPLE_VIDEO_PATH : null;
}

export default async function MovieWatchPage({ params }: MovieWatchPageProps) {
  const { id } = await params;
  const movieId = Number(id);
  const movieDetails = Number.isFinite(movieId) ? await getMovieDetails(movieId) : null;
  const movie =
    movieDetails ??
    fallbackMovies.find((item) => item.id === movieId) ??
    spiderManFallbackMovie;
  const sampleVideoSrc = getSampleVideoSrc();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_8%,rgba(255,159,0,0.11),transparent_26%),radial-gradient(circle_at_82%_10%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#050505_0%,#09090b_58%,#050505_100%)]" />

      <WatchHeader movie={movie} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
        <VideoPlayer movie={movie} sampleVideoSrc={sampleVideoSrc} />
        <MovieInfoPanel movie={movie} />
      </div>
    </main>
  );
}
