const DEFAULT_API_BASE_URL = "http://localhost:5000";

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL).replace(
  /\/$/,
  "",
);

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("access_token");
}

export function buildAuthHeaders(headers: HeadersInit = {}): HeadersInit {
  const token = getAccessToken();
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}
