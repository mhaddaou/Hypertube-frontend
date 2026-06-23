import { API_BASE_URL, buildAuthHeaders } from "@/lib/apiClient";

export function getStreamUrl(movieId: number | string, quality?: string): string {
  const url = new URL(`${API_BASE_URL}/api/movies/${movieId}/stream`);
  if (quality) {
    url.searchParams.set("quality", quality);
  }
  return url.toString();
}

export async function fetchStream(movieId: number | string, quality?: string): Promise<Response> {
  return fetch(getStreamUrl(movieId, quality), { headers: buildAuthHeaders() });
}
