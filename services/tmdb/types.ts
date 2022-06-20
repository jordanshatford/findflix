export interface Movie {
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

export interface Genre {
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

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Video {
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

export interface DetailedMovie extends Movie {
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  images: { backdrops: Image[]; posters: Image[] };
  videos: { id: number; results: Video[] };
  recommendations: PagedResults<Movie>;
  similar: PagedResults<Movie>;
}

export interface TVShow {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface DetailedTVShow extends TVShow {
  created_by: Creator[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: any;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  images: { backdrops: Image[]; posters: Image[] };
  videos: { id: number; results: Video[] };
  recommendations: PagedResults<Movie>;
  similar: PagedResults<Movie>;
}

export interface PagedResults<T> {
  page: number;
  total_results: number;
  total_pages: number;
  results: T[];
}

export interface ListItem extends Partial<Movie & TVShow> {
  media_type: MediaTypeEnum;
}

export enum MovieListEnum {
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
  TRENDING = 'trending',
}

export enum TVShowListEnum {
  AIRING_TODAY = 'airing_today',
  ON_THE_AIR = 'on_the_air',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  TRENDING = 'trending',
}

export enum MediaTypeEnum {
  MOVIE = 'movie',
  TV_SHOW = 'tv',
}
