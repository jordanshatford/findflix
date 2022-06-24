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

export interface Episode {
  air_date: string;
  episode_number: number;
  // crew: any[];
  // guest_stars: any[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Season {
  air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episodes?: Episode[];
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
  TRENDING = 'trending',
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
}

export enum TVShowListEnum {
  TRENDING = 'trending',
  AIRING_TODAY = 'airing_today',
  ON_THE_AIR = 'on_the_air',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
}

export enum MediaTypeEnum {
  MOVIE = 'movie',
  TV_SHOW = 'tv',
}
