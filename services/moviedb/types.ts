export interface MovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDBGenre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface ImageType {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface VideoType {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface DetailedMovieResult extends MovieResult {
  budget: number;
  genres: MovieDBGenre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  images: { backdrops: ImageType[]; posters: ImageType[] };
  videos: { id: number; results: VideoType[] };
  recommendations: MovieDBPagedResults<MovieResult>;
  similar: MovieDBPagedResults<MovieResult>;
}

export interface TVShowResult {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface MovieDBPagedResults<T> {
  page: number;
  total_results: number;
  total_pages: number;
  results: T[];
}

export enum MovieListEnum {
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
}

export enum TVShowListEnum {
  AIRING_TODAY = 'airing_today',
  ON_THE_AIR = 'on_the_air',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
}

export enum MovieDBMediaTypeEnum {
  MOVIE = 'movie',
  TV_SHOW = 'tv',
}
