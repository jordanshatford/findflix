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
  getImageLink,
  getMediaCreationDate,
} from './utilities';
export { isValidList, getImageLink, getMediaCreationDate };

import { getMovieListPagedResults } from './api';

export default {
  isValidList,
  getImageLink,
  getMediaCreationDate,
  // API calls server side only
  getMovieListPagedResults,
};
