import { Hero } from "@/components/landing/Hero";
import { CompatibleDevices } from "@/components/landing/CompatibleDevices";
import { FeaturedBanner } from "@/components/landing/FeaturedBanner";
import { Footer } from "@/components/layout/Footer";
import { MoviesSection } from "@/components/landing/MoviesSection";
import { PopularMovies } from "@/components/landing/PopularMovies";
import { WatchAgainSection } from "@/components/landing/WatchAgainSection";
import { getMovies as getBackendMovies } from "@/actions/movies";
import {
  getFeaturedMovie,
  getMovieDetails,
  getMovies,
  getPopularMovies,
} from "@/lib/moviesApi";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [popularMovies, movieRow, watchAgainMovies, bannerBase, heroMovies] =
    await Promise.all([
      getPopularMovies(),
      getMovies({ limit: 12, sortBy: "date_added", orderBy: "desc" }),
      getMovies({ limit: 10, sortBy: "like_count", orderBy: "desc" }),
      getFeaturedMovie("Non Negotiable"),
      getBackendMovies(),
    ]);

  const fallbackFeatured = heroMovies[0] ?? popularMovies[0] ?? movieRow[0] ?? null;
  const bannerMovie =
    bannerBase ??
    (movieRow[4] ? (await getMovieDetails(movieRow[4].id)) ?? movieRow[4] : null) ??
    fallbackFeatured;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Hero movie={fallbackFeatured} posterMovies={heroMovies.slice(0, 7)} />
      <PopularMovies movies={popularMovies.length ? popularMovies : movieRow.slice(0, 5)} />
      <MoviesSection movies={movieRow} />
      <WatchAgainSection movies={watchAgainMovies.length ? watchAgainMovies : movieRow} />
      <FeaturedBanner movie={bannerMovie} />
      <CompatibleDevices />
      <Footer />
    </main>
  );
}
