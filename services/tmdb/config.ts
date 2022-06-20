export default {
  baseURL: process.env.TMDB_API_BASE_URL as string,
  apiKey: process.env.TMDB_API_KEY as string,
  language: 'en-US',
  trendingTimeWindow: 'week',
  imageBaseURL: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL as string,
  favouritesListId: process.env.TMDB_FAVOURITES_LIST_ID,
  watchBaseURL: undefined,
};
