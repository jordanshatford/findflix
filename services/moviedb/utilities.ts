import config from './config';
import {
  MovieDBMediaTypeEnum,
  MovieListEnum,
  TVShowListEnum,
  MovieResult,
  TVShowResult,
} from './types';

export function isValidList(
  mediaType: MovieDBMediaTypeEnum,
  value: MovieListEnum | TVShowListEnum
) {
  if (mediaType === MovieDBMediaTypeEnum.MOVIE) {
    return Object.values(MovieListEnum).includes(value as MovieListEnum);
  } else {
    return Object.values(TVShowListEnum).includes(value as TVShowListEnum);
  }
}

export function getImageLink(
  path: string | null | undefined,
  size: string = 'w780'
) {
  if (!path) {
    return '';
  }
  return `${config.imageBaseURL}${size}${path}`;
}

export function getMediaCreationDate(
  item: Partial<MovieResult & TVShowResult>,
  type: MovieDBMediaTypeEnum
) {
  if (type === MovieDBMediaTypeEnum.MOVIE) {
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
