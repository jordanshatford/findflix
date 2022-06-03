import axios from 'axios';
import config from './config';
import {
  MovieListEnum,
  Movie,
  type DetailedMovie,
  type PagedResults,
} from './types';

/**
 * This works on server side only as the env variables are not available on client side.
 * DO NOT call any API functions from the client side.
 */
const axiosMovieDB = axios.create({
  baseURL: config.baseURL,
  params: {
    api_key: config.apiKey,
    language: config.language,
  },
});

export async function getMovieListPagedResults(
  list: MovieListEnum,
  page: number = 1
): Promise<PagedResults<Movie>> {
  const data = await axiosMovieDB.get<PagedResults<Movie>>(`/movie/${list}`, {
    params: { page },
  });
  return data.data;
}

export async function getMovieDetails(id: string): Promise<DetailedMovie> {
  const data = await axiosMovieDB.get<DetailedMovie>(`/movie/${id}`, {
    params: { append_to_response: `images,videos,recommendations,similar` },
  });
  return data.data;
}
