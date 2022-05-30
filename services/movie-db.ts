import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.MOVIEDB_API_BASE_URL as string,
  params: {
    api_key: process.env.MOVIEDB_API_KEY as string,
  },
});

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_MOVIEDB_IMAGE_BASE_URL as string;

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

export enum MovieDbMediaType {
  MOVIE = 'movie',
  TV_SHOW = 'tv',
}

export function isValidList(
  mediaType: MovieDbMediaType,
  value: MovieListEnum | TVShowListEnum
) {
  if (mediaType === MovieDbMediaType.MOVIE) {
    return Object.values(MovieListEnum).includes(value as MovieListEnum);
  } else {
    return Object.values(TVShowListEnum).includes(value as TVShowListEnum);
  }
}

export function getMovieDBImageLink(
  path: string | null | undefined,
  size: string = 'w780'
) {
  if (!path) {
    return '';
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
}

export async function getMovieList(
  list: MovieListEnum,
  page: number = 1
): Promise<MovieDBPagedResults<MovieResult>> {
  const data = await axiosInstance.get<MovieDBPagedResults<MovieResult>>(
    `/movie/${list}`,
    { params: { page } }
  );
  return data.data;
}

export async function getTVShowList(
  list: TVShowListEnum,
  page: number = 1
): Promise<MovieDBPagedResults<TVShowResult>> {
  const data = await axiosInstance.get<MovieDBPagedResults<TVShowResult>>(
    `/tv/${list}`,
    { params: { page } }
  );
  return data.data;
}

export function getMediaCreationDate(
  item: Partial<MovieResult & TVShowResult>,
  type: MovieDbMediaType
) {
  if (type === MovieDbMediaType.MOVIE) {
    if (item.release_date) {
      return new Date(item.release_date as string);
    }
    return null;
  } else {
    if (item.first_air_date) {
      return new Date(item.first_air_date as string);
    }
    return null;
  }
}

export async function getMovie(mId: string) {}

export async function getTVShow(showId: string) {}

export async function getTrendingMovies() {}

export async function getTrendingTVShows() {}

export default {
  getMovieList,
};
