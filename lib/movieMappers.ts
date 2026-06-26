import type { Movie, MovieDetailsSummary, MovieSummary, RawYtsMovie } from "@/types/movie";

export const FALLBACK_IMAGE = "/images/popular/dark-knight-placeholder.svg";
export const SPIDER_MAN_REAL_BACKGROUND =
  "https://yts.bz/assets/images/movies/spider_man_no_way_home_2021/background.jpg";
export const SPIDER_MAN_HERO_POSTER = "/images/hero/spider-man-no-way-home-poster.svg";

function asText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function pickImage(...images: Array<string | undefined>) {
  return images.find((image) => typeof image === "string" && image.trim()) ?? FALLBACK_IMAGE;
}

const FALLBACK_SUMMARY_TEMPLATES: Array<(title: string, year: string, genre: string) => string> = [
  (title, year, genre) =>
    `${genre ? `A ${genre} story` : "A story"}${year !== "N/A" ? ` from ${year}` : ""} — stream "${title}" now on HyperTube.`,
  (title, year, genre) =>
    `Discover "${title}"${year !== "N/A" ? ` (${year})` : ""}${genre ? `, a standout ${genre} pick` : ""} on HyperTube.`,
  (title, year, genre) =>
    `"${title}" brings${genre ? ` ${genre}` : ""} drama to your screen${year !== "N/A" ? ` from ${year}` : ""}. Now streaming on HyperTube.`,
  (title, year, genre) =>
    `${genre ? `${genre} fans, meet` : "Meet"} "${title}"${year !== "N/A" ? `, released in ${year}` : ""}. Now streaming on HyperTube.`,
];

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function buildFallbackSummary(title: string, year: string, genre?: string) {
  const template =
    FALLBACK_SUMMARY_TEMPLATES[hashString(title) % FALLBACK_SUMMARY_TEMPLATES.length];
  return template(title, year, genre?.toLowerCase() ?? "");
}

export function getHeroBackgroundImage(movie: RawYtsMovie) {
  return pickImage(
    movie.background_image_original,
    movie.background_image,
    movie.large_cover_image,
    movie.medium_cover_image,
  );
}

export function getPosterImage(movie: RawYtsMovie) {
  return pickImage(movie.large_cover_image, movie.medium_cover_image);
}

export function getLandscapeImage(movie: RawYtsMovie) {
  return pickImage(
    movie.background_image_original,
    movie.background_image,
    movie.large_cover_image,
    movie.medium_cover_image,
  );
}

function formatRuntime(minutes?: number) {
  if (!minutes || minutes <= 0) {
    return "N/A";
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return hours ? `${hours}h ${mins}m` : `${mins}m`;
}

function isSpiderManNoWayHome(movie: RawYtsMovie) {
  const title = `${movie.title ?? ""} ${movie.title_long ?? ""}`.toLowerCase();
  return title.includes("spider") && title.includes("no way home");
}

export function mapYtsMovieToMovie(movie: RawYtsMovie): Movie {
  const backgroundImage = isSpiderManNoWayHome(movie)
    ? SPIDER_MAN_REAL_BACKGROUND
    : getHeroBackgroundImage(movie);

  const title = asText(movie.title, movie.title_long ?? "Untitled");
  const year = movie.year ? String(movie.year) : "N/A";
  const genres = Array.isArray(movie.genres) ? movie.genres.slice(0, 3) : [];

  return {
    id: movie.id ?? 0,
    title,
    year,
    runtime: formatRuntime(movie.runtime),
    rating: typeof movie.rating === "number" && movie.rating > 0 ? movie.rating.toFixed(1) : "N/A",
    quality: asText(movie.quality, "HD").toUpperCase(),
    language: asText(movie.language, "EN").toUpperCase(),
    genres,
    summary: asText(
      movie.description_full,
      asText(movie.summary, buildFallbackSummary(title, year, genres[0])),
    ),
    posterImage: getPosterImage(movie),
    coverImage: isSpiderManNoWayHome(movie) ? SPIDER_MAN_REAL_BACKGROUND : getLandscapeImage(movie),
    backgroundImage,
    cast: Array.isArray(movie.cast)
      ? movie.cast.slice(0, 5).map((member) => ({
          name: asText(member.name, "Unknown cast"),
          characterName: asText(member.character_name, "Cast"),
          image: pickImage(member.url_small_image),
        }))
      : [],
  };
}

export function mapMovieSummaryToMovie(movie: MovieSummary): Movie {
  const numericId = Number(movie.id);
  const title = asText(movie.name, "Untitled");
  const year = movie.year ? String(movie.year) : "N/A";
  const genres = Array.isArray(movie.genres) ? movie.genres.slice(0, 3) : [];

  return {
    id: Number.isFinite(numericId) ? numericId : 0,
    title,
    year,
    runtime: formatRuntime(movie.runtime ?? undefined),
    rating:
      typeof movie.imdb_rating === "number" && movie.imdb_rating > 0
        ? movie.imdb_rating.toFixed(1)
        : typeof movie.rating === "number" && movie.rating > 0
          ? movie.rating.toFixed(1)
          : "N/A",
    quality: "HD",
    language: "EN",
    genres,
    summary: asText(movie.plot, buildFallbackSummary(title, year, genres[0])),
    posterImage: pickImage(movie.image ?? undefined, movie.cover_image ?? undefined),
    coverImage: pickImage(movie.cover_image ?? undefined, movie.image ?? undefined),
    backgroundImage: pickImage(
      movie.backdrop ?? undefined,
      movie.cover_image ?? undefined,
      movie.image ?? undefined,
    ),
    cast: [],
  };
}

export function mapMovieDetailsToMovie(movie: MovieDetailsSummary): Movie {
  const numericId = Number(movie.id);
  const title = asText(movie.name, "Untitled");
  const year = movie.year ? String(movie.year) : "N/A";
  const genres = asText(movie.genre).split(",").map((genre) => genre.trim()).filter(Boolean).slice(0, 3);

  return {
    id: Number.isFinite(numericId) ? numericId : 0,
    title,
    year,
    runtime: formatRuntime(movie.runtime ?? undefined),
    rating:
      typeof movie.imdb_rating === "number" && movie.imdb_rating > 0
        ? movie.imdb_rating.toFixed(1)
        : "N/A",
    quality: "HD",
    language: asText(movie.language, "EN").toUpperCase(),
    genres,
    summary: asText(movie.plot, buildFallbackSummary(title, year, genres[0])),
    posterImage: pickImage(movie.image ?? undefined, movie.cover_image ?? undefined),
    coverImage: pickImage(movie.cover_image ?? undefined, movie.image ?? undefined),
    backgroundImage: pickImage(
      movie.backdrop ?? undefined,
      movie.cover_image ?? undefined,
      movie.image ?? undefined,
    ),
    cast: asText(movie.cast)
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
      .slice(0, 5)
      .map((name) => ({ name, characterName: "Cast", image: FALLBACK_IMAGE })),
  };
}
