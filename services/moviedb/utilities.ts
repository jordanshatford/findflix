import config from './config';
import {
  MediaTypeEnum,
  MovieListEnum,
  TVShowListEnum,
  Movie,
  TVShow,
} from './types';

export function hasFavouritesAvailable(): boolean {
  return config.favouritesListId !== undefined;
}

export function isValidList(
  mediaType: MediaTypeEnum,
  value: MovieListEnum | TVShowListEnum
): boolean {
  if (mediaType === MediaTypeEnum.MOVIE) {
    return Object.values(MovieListEnum).includes(value as MovieListEnum);
  } else {
    return Object.values(TVShowListEnum).includes(value as TVShowListEnum);
  }
}

export function getImageLink(
  path: string | null | undefined,
  size: string = 'w780'
): string {
  if (!path) {
    return '';
  }
  return `${config.imageBaseURL}${size}${path}`;
}

export function toDate(date: string): Date {
  const [year, month, day] = date.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function getMediaCreationDate(
  item: Partial<Movie & TVShow>,
  type: MediaTypeEnum
): Date | null {
  if (type === MediaTypeEnum.MOVIE && item?.release_date) {
    return toDate(item.release_date);
  } else if (type === MediaTypeEnum.TV_SHOW && item?.first_air_date) {
    return toDate(item.first_air_date);
  }
  return null;
}
