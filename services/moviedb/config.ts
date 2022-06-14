export default {
  baseURL: process.env.MOVIEDB_API_BASE_URL as string,
  apiKey: process.env.MOVIEDB_API_KEY as string,
  language: 'en-US',
  imageBaseURL: process.env.NEXT_PUBLIC_MOVIEDB_IMAGE_BASE_URL as string,
  favouritesListId: process.env.MOVIEDB_FAVOURITES_LIST_ID,
  watchBaseURL: undefined,
};
