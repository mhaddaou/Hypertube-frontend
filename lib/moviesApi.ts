import { spiderManFallbackMovie } from "@/data/fallbackMovies";
import { mapYtsMovieToMovie } from "@/lib/movieMappers";
import type {
  ListMoviesParams,
  Movie,
  MovieApiDetailsResponse,
  MovieApiListResponse,
} from "@/types/movie";

const DEFAULT_API_BASE_URL = "https://yts.am/api/v2";
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_MOVIE_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");

export type { Movie, MovieCastMember } from "@/types/movie";
export { spiderManFallbackMovie };

async function fetchJson<T>(url: URL): Promise<T | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function createApiUrl(endpoint: string) {
  return new URL(`${API_BASE_URL}/${endpoint}`);
}

export async function getMovies(params: ListMoviesParams = {}): Promise<Movie[]> {
  const url = createApiUrl("list_movies.json");
  const search = url.searchParams;

  search.set("limit", String(params.limit ?? 12));
  if (params.page) search.set("page", String(params.page));
  if (params.quality) search.set("quality", params.quality);
  if (params.minimumRating) search.set("minimum_rating", String(params.minimumRating));
  if (params.queryTerm) search.set("query_term", params.queryTerm);
  if (params.genre) search.set("genre", params.genre);
  if (params.sortBy) search.set("sort_by", params.sortBy);
  if (params.orderBy) search.set("order_by", params.orderBy);

  const payload = await fetchJson<MovieApiListResponse>(url);

  if (payload?.status !== "ok" || !Array.isArray(payload.data?.movies)) {
    return [];
  }

  return payload.data.movies.map(mapYtsMovieToMovie).filter((movie) => movie.id > 0);
}

export async function getMovieDetails(movieId: number): Promise<Movie | null> {
  if (!movieId) {
    return null;
  }

  const url = createApiUrl("movie_details.json");
  url.searchParams.set("movie_id", String(movieId));
  url.searchParams.set("with_images", "true");
  url.searchParams.set("with_cast", "true");

  const payload = await fetchJson<MovieApiDetailsResponse>(url);

  if (payload?.status !== "ok" || !payload.data?.movie) {
    return null;
  }

  return mapYtsMovieToMovie(payload.data.movie);
}

export async function getMovieSuggestions(movieId: number): Promise<Movie[]> {
  if (!movieId) {
    return [];
  }

  const url = createApiUrl("movie_suggestions.json");
  url.searchParams.set("movie_id", String(movieId));

  const payload = await fetchJson<MovieApiListResponse>(url);

  if (payload?.status !== "ok" || !Array.isArray(payload.data?.movies)) {
    return [];
  }

  return payload.data.movies.map(mapYtsMovieToMovie).filter((movie) => movie.id > 0);
}

export async function getPopularMovies() {
  return getMovies({ limit: 5, minimumRating: 6, sortBy: "rating", orderBy: "desc" });
}

export async function getFeaturedMovie(queryTerm = "spider man no way home") {
  const movies = await getMovies({ limit: 5, queryTerm, sortBy: "rating", orderBy: "desc" });
  const movie =
    movies.find((item) => item.title.toLowerCase().includes("no way home")) ?? movies[0];

  if (movie) {
    return (await getMovieDetails(movie.id)) ?? movie;
  }

  return queryTerm.toLowerCase().includes("spider") ? spiderManFallbackMovie : null;
}
