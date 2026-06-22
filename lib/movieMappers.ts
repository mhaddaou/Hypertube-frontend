import type { Movie, RawYtsMovie } from "@/types/movie";

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

  return {
    id: movie.id ?? 0,
    title: asText(movie.title, movie.title_long ?? "Untitled"),
    year: movie.year ? String(movie.year) : "N/A",
    runtime: formatRuntime(movie.runtime),
    rating: typeof movie.rating === "number" && movie.rating > 0 ? movie.rating.toFixed(1) : "N/A",
    quality: asText(movie.quality, "HD").toUpperCase(),
    language: asText(movie.language, "EN").toUpperCase(),
    genres: Array.isArray(movie.genres) ? movie.genres.slice(0, 3) : [],
    summary: asText(
      movie.description_full,
      asText(movie.summary, "A cinematic selection from HyperTube."),
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
