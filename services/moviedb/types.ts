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
