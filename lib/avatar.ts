const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const DEFAULT_AVATAR = "https://i.pravatar.cc/256?img=12";

/**
 * Resolves a profilePicture value into a displayable <img> src.
 * - Absolute URLs (OAuth providers) are returned as-is.
 * - Relative paths (local uploads, e.g. "/uploads/avatars/xxx.jpg") are
 *   prefixed with the API base URL.
 */
export function resolveAvatarUrl(profilePicture: string | null | undefined): string {
  if (!profilePicture) return DEFAULT_AVATAR;
  if (/^https?:\/\//i.test(profilePicture)) return profilePicture;
  return `${API_URL}${profilePicture}`;
}
