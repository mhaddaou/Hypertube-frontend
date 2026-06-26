"use server";

import { API_BASE_URL, buildAuthHeaders } from "@/lib/apiClient";
import { mapMovieDetailsToMovie, mapMovieSummaryToMovie } from "@/lib/movieMappers";
import type { Movie, MovieDetailsSummary, MovieSummary } from "@/types/movie";

export interface GetMoviesParams {
  page?: number;
  limit?: number;
}

export async function getMovies(params: GetMoviesParams = {}): Promise<Movie[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/movies`);
    if (params.page) url.searchParams.set("page", String(params.page));
    if (params.limit) url.searchParams.set("limit", String(params.limit));

    const response = await fetch(url, {
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

export async function getMovieDetails(movieId: number | string): Promise<Movie | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movies/${movieId}`, {
      cache: "no-store",
      headers: buildAuthHeaders(),
    });

    if (!response.ok) {
      return null;
    }

    const movie = (await response.json()) as MovieDetailsSummary;
    return movie ? mapMovieDetailsToMovie(movie) : null;
  } catch {
    return null;
  }
}
