export {
  type MovieResult,
  type TVShowResult,
  type MovieDBPagedResults,
  type DetailedMovieResult,
  MovieDBMediaTypeEnum,
  MovieListEnum,
  TVShowListEnum,
} from './types';

import { isValidList, getImageLink, getMediaCreationDate } from './utilities';
export { isValidList, getImageLink, getMediaCreationDate };

import { getMovieListPagedResults, getMovieDetails } from './api';

export default {
  isValidList,
  getImageLink,
  getMediaCreationDate,
  // API calls server side only
  getMovieListPagedResults,
  getMovieDetails,
};
