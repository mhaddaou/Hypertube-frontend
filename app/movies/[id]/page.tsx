import { CompatibleDevices } from "@/components/landing/CompatibleDevices";
import { Footer } from "@/components/layout/Footer";
import { DetailsHero } from "@/components/movie-details/DetailsHero";
import { Discussion } from "@/components/movie-details/Discussion";
import { MovieRail } from "@/components/movie-details/MovieRails";
import { fallbackMovies, fallbackWatchlist, spiderManFallbackMovie } from "@/data/fallbackMovies";
import {
  getMovieDetails,
  getMovies,
  getMovieSuggestions,
} from "@/lib/moviesApi";

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = await params;
  const movieId = Number(id);

  const [movieDetails, suggestions, watchlist] = await Promise.all([
    Number.isFinite(movieId) ? getMovieDetails(movieId) : null,
    Number.isFinite(movieId) ? getMovieSuggestions(movieId) : Promise.resolve([]),
    getMovies({ limit: 10, sortBy: "like_count", orderBy: "desc" }),
  ]);

  const movie = movieDetails ?? fallbackMovies.find((item) => item.id === movieId) ?? spiderManFallbackMovie;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#09090b] text-white">
      <DetailsHero movie={movie} />
      <Discussion />
      <MovieRail title="Similar Movies for you" movies={suggestions} />
      <MovieRail title="Your Watchlist" movies={watchlist.length ? watchlist : fallbackWatchlist} />
      <div className="mt-6">
        <CompatibleDevices />
      </div>
      <Footer />
    </main>
  );
}
