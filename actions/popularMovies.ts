import { API_BASE_URL, buildAuthHeaders } from "@/lib/apiClient";
import { mapMovieSummaryToMovie } from "@/lib/movieMappers";
import type { Movie, MovieSummary } from "@/types/movie";

export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/popular`, {
      cache: "no-store",
      headers: buildAuthHeaders(),
    });

    if (!response.ok) {
      return [];
    }

    const movies = (await response.json()) as MovieSummary[];
    return Array.isArray(movies) ? movies.map(mapMovieSummaryToMovie) : [];
  } catch {
    return [];
  }
}
