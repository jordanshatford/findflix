import axios from 'axios';
import config from './config';
import { MovieListEnum, MovieResult, MovieDBPagedResults } from './types';

/**
 * This works on server side only as the env variables are not available on client side.
 * DO NOT call any API functions from the client side.
 */
const axiosMovieDB = axios.create({
  baseURL: config.baseURL,
  params: {
    api_key: config.apiKey,
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
