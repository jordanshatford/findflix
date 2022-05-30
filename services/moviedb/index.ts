export {
  type MovieResult,
  type TVShowResult,
  type MovieDBPagedResults,
  MovieDBMediaTypeEnum,
  MovieListEnum,
  TVShowListEnum,
} from './types';

import {
  isValidList,
  getMovieDBImageLink,
  getMediaCreationDate,
} from './utilities';
export { isValidList, getMovieDBImageLink, getMediaCreationDate };

import { getMovieListPagedResults } from './api';

export default {
  isValidList,
  getMovieDBImageLink,
  getMediaCreationDate,
  // API calls server side only
  getMovieListPagedResults,
};
