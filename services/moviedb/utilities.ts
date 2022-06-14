import config from './config';
import {
  MediaTypeEnum,
  MovieListEnum,
  TVShowListEnum,
  Movie,
  TVShow,
} from './types';

export function hasFavouritesAvailable() {
  return config.favouritesListId !== undefined;
}

export function isValidList(
  mediaType: MediaTypeEnum,
  value: MovieListEnum | TVShowListEnum
) {
  if (mediaType === MediaTypeEnum.MOVIE) {
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
  item: Partial<Movie & TVShow>,
  type: MediaTypeEnum
) {
  if (type === MediaTypeEnum.MOVIE) {
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
