import config from './config';
import {
  MediaTypeEnum,
  MovieListEnum,
  TVShowListEnum,
  Movie,
  TVShow,
} from './types';

/**
 * Check wether a list of favourite movies and TV shows has been provided.
 * This is done by specifying a env variable with the id of the list.
 * @returns - true if a list is provided and false otherwise
 */
export function hasFavouritesAvailable(): boolean {
  return config.favouritesListId !== undefined;
}

/**
 * Check whether a baseUrl is provided for watch links. These links allow
 * the user to watch a specific media content via its Movie DB id.
 * @returns - true if a watch url is available and false otherwise
 */
export function hasWatchLinkAvailable(): boolean {
  return config.watchBaseURL !== undefined;
}

/**
 * Check whether a list is a valid list for a given media type.
 * @param mediaType - the type of media (Movie or TVShow)
 * @param value - the list value to check
 * @returns - true if the list is valid, false otherwise
 */
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

/**
 * Get the url for a image on the The Movie Database.
 * @param path - the path to the image
 * @param size - a string representing the size of the image
 * @returns - the url to the image
 */
export function getImageLink(
  path: string | null | undefined,
  size: string = 'w780'
): string {
  if (!path) {
    return '';
  }
  return `${config.imageBaseURL}${size}${path}`;
}

/**
 * Convert a date from TMDB to a date object. These dates are in the format
 * YYYY-MM-DD.
 * @param date - the string representation of a date
 * @returns - a date object
 */
export function toDate(date: string): Date {
  const [year, month, day] = date.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

/**
 * Get the creation date of a media item based on type.
 * @param item - the Movie or TVShow
 * @param type - the type of media (Movie or TVShow)
 * @returns - the creation date of the media item
 */
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
