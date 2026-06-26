import { Hero } from "@/components/landing/Hero";
import { CompatibleDevices } from "@/components/landing/CompatibleDevices";
import { FeaturedBanner } from "@/components/landing/FeaturedBanner";
import { Footer } from "@/components/layout/Footer";
import { MoviesSection } from "@/components/landing/MoviesSection";
import { PopularMovies } from "@/components/landing/PopularMovies";
import { WatchAgainSection } from "@/components/landing/WatchAgainSection";
import { getMovies as getBackendMovies } from "@/actions/movies";
import { getPopularMovies } from "@/actions/popularMovies";
import { getFeaturedMovie, getMovieDetails, getMovies } from "@/lib/moviesApi";
import type { Movie } from "@/types/movie";

export const dynamic = "force-dynamic";

export default async function Home() {
  const moviesPageSize = 12;
  const [popularMovies, movieRow, watchAgainMovies, bannerBase, heroMovies, moviesSectionRow] =
    await Promise.all([
      getPopularMovies(),
      getMovies({ limit: 12, sortBy: "date_added", orderBy: "desc" }),
      getMovies({ limit: 10, sortBy: "like_count", orderBy: "desc" }),
      getFeaturedMovie("Non Negotiable"),
      getBackendMovies(),
      getBackendMovies({ page: 1, limit: moviesPageSize }),
    ]);

  const fallbackFeatured = heroMovies[0] ?? popularMovies[0] ?? movieRow[0] ?? null;
  const bannerMovie =
    bannerBase ??
    (movieRow[4] ? (await getMovieDetails(movieRow[4].id)) ?? movieRow[4] : null) ??
    fallbackFeatured;

  const bannerFillers = [...movieRow, ...popularMovies].filter(
    (item) => item.id !== bannerMovie?.id,
  );
  const bannerMovies = [bannerMovie, ...bannerFillers]
    .filter((item): item is Movie => item !== null)
    .filter((item, index, all) => all.findIndex((other) => other.id === item.id) === index)
    .slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <Hero movie={fallbackFeatured} posterMovies={heroMovies.slice(0, 7)} />
      <PopularMovies movies={popularMovies.length ? popularMovies : movieRow.slice(0, 5)} />
      <MoviesSection movies={moviesSectionRow.length ? moviesSectionRow : movieRow} limit={moviesPageSize} />
      <WatchAgainSection movies={watchAgainMovies.length ? watchAgainMovies : movieRow} />
      <FeaturedBanner movies={bannerMovies} />
      <CompatibleDevices />
      <Footer />
    </main>
  );
}
