export type MovieGenre = string;

export type MovieCastMember = {
  name: string;
  characterName: string;
  image: string;
};

export type Movie = {
  id: number;
  title: string;
  year: string;
  runtime: string;
  rating: string;
  quality: string;
  language: string;
  genres: MovieGenre[];
  summary: string;
  posterImage: string;
  coverImage: string;
  backgroundImage: string;
  cast: MovieCastMember[];
};

export type MovieComment = {
  user: string;
  text: string;
};

export type MovieImageFields = {
  medium_cover_image?: string;
  large_cover_image?: string;
  background_image?: string;
  background_image_original?: string;
};

export type RawYtsMovie = MovieImageFields & {
  id?: number;
  title?: string;
  title_long?: string;
  year?: number;
  runtime?: number;
  rating?: number;
  language?: string;
  quality?: string;
  genres?: string[];
  summary?: string;
  description_full?: string;
  cast?: Array<{
    name?: string;
    character_name?: string;
    url_small_image?: string;
  }>;
};

export type ListMoviesParams = {
  limit?: number;
  page?: number;
  quality?: string;
  minimumRating?: number;
  queryTerm?: string;
  genre?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
};

export type MovieApiListResponse = {
  status?: string;
  data?: { movies?: RawYtsMovie[] };
};

export type MovieApiDetailsResponse = {
  status?: string;
  data?: { movie?: RawYtsMovie };
};
