import axios from 'axios';
import config from './config';
import {
  MovieListEnum,
  MovieResult,
  DetailedMovieResult,
  MovieDBPagedResults,
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
): Promise<MovieDBPagedResults<MovieResult>> {
  const data = await axiosMovieDB.get<MovieDBPagedResults<MovieResult>>(
    `/movie/${list}`,
    { params: { page } }
  );
  return data.data;
}

export async function getMovieDetails(
  id: string
): Promise<DetailedMovieResult> {
  const data = await axiosMovieDB.get<DetailedMovieResult>(`/movie/${id}`, {
    params: { append_to_response: `images,videos,recommendations,similar` },
  });
  return data.data;
}
