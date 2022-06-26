import axios from 'axios';
import config from './config';
import * as types from './types';

enum APIVersion {
  V3 = '3',
  V4 = '4',
}

/**
 * This works on server side only as the env variables are not available on client side.
 * DO NOT call any API functions from the client side.
 */
const v3Client = axios.create({
  baseURL: `${config.baseURL}${APIVersion.V3}/`,
  params: {
    api_key: config.apiKey,
    language: config.language,
  },
});

const v4Client = axios.create({
  baseURL: `${config.baseURL}${APIVersion.V4}/`,
  params: {
    api_key: config.apiKey,
    language: config.language,
  },
});

export async function getMovieListPagedResults(
  list: types.MovieListEnum,
  page: number = 1
): Promise<types.PagedResults<types.Movie>> {
  if (list === types.MovieListEnum.TRENDING) {
    const data = await v3Client.get<types.PagedResults<types.Movie>>(
      `/trending/movie/${config.trendingTimeWindow}`,
      {
        params: { page },
      }
    );
    return data.data;
  }
  const data = await v3Client.get<types.PagedResults<types.Movie>>(
    `/movie/${list}`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getMovieDetails(
  id: string
): Promise<types.DetailedMovie> {
  const data = await v3Client.get<types.DetailedMovie>(`/movie/${id}`, {
    params: { append_to_response: 'recommendations,similar' },
  });
  return data.data;
}

export async function getMovieSimilar(
  id: string,
  page: number = 1
): Promise<types.PagedResults<types.Movie>> {
  const data = await v3Client.get<types.PagedResults<types.Movie>>(
    `/movie/${id}/similar`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getMovieRecommendations(
  id: string,
  page: number = 1
): Promise<types.PagedResults<types.Movie>> {
  const data = await v3Client.get<types.PagedResults<types.Movie>>(
    `/movie/${id}/recommendations`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getTVShowListPagedResults(
  list: types.TVShowListEnum,
  page: number = 1
): Promise<types.PagedResults<types.TVShow>> {
  if (list === types.TVShowListEnum.TRENDING) {
    const data = await v3Client.get<types.PagedResults<types.TVShow>>(
      `/trending/tv/${config.trendingTimeWindow}`,
      {
        params: { page },
      }
    );
    return data.data;
  }
  const data = await v3Client.get<types.PagedResults<types.TVShow>>(
    `/tv/${list}`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getTVShowDetails(
  id: string
): Promise<types.DetailedTVShow> {
  const data = await v3Client.get<types.DetailedTVShow>(`/tv/${id}`, {
    params: { append_to_response: 'recommendations,similar' },
  });
  return data.data;
}

export async function getTVShowSeason(
  id: string,
  seasonId: string
): Promise<types.Season> {
  const data = await v3Client.get<types.Season>(`/tv/${id}/season/${seasonId}`);
  return data.data;
}

export async function getTVSimilar(
  id: string,
  page: number = 1
): Promise<types.PagedResults<types.TVShow>> {
  const data = await v3Client.get<types.PagedResults<types.TVShow>>(
    `/tv/${id}/similar`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getTVRecommendations(
  id: string,
  page: number = 1
): Promise<types.PagedResults<types.TVShow>> {
  const data = await v3Client.get<types.PagedResults<types.TVShow>>(
    `/tv/${id}/recommendations`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getList(
  listId: string,
  page: number = 1
): Promise<types.PagedResults<types.ListItem>> {
  const data = await v4Client.get<types.PagedResults<types.ListItem>>(
    `/list/${listId}`,
    {
      params: { page },
    }
  );
  return data.data;
}

export async function getFavourites(
  page: number = 1
): Promise<types.PagedResults<types.ListItem>> {
  if (!config.favouritesListId) {
    return {
      page,
      results: [] as types.ListItem[],
      total_pages: 0,
      total_results: 0,
    } as types.PagedResults<types.ListItem>;
  }
  return getList(config.favouritesListId, page);
}

export async function search(
  query: string,
  page: number = 1
): Promise<types.PagedResults<types.ListItem>> {
  const data = await v3Client.get<types.PagedResults<types.ListItem>>(
    `/search/multi`,
    {
      params: { query, page },
    }
  );
  return data.data;
}
