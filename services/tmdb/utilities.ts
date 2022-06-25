import config from './config';
import * as types from './types';

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
export function hasWatchLink(): boolean {
  return config.watchBaseURL !== undefined;
}

/**
 * Check if a peice of media is available to watch.
 * @param media - the media to check (Movie or Episode)
 * @returns
 */
export function isWatchable(
  media: Partial<types.Movie & types.Episode>
): boolean {
  let date: Date | null = null;
  if (media.release_date) {
    date = toDate(media.release_date);
  } else if (media.air_date) {
    date = toDate(media.air_date);
  }
  if (!date) {
    return false;
  }
  const today = new Date();
  return today >= date && hasWatchLink();
}

/**
 * Check whether a list is a valid list for a given media type.
 * @param mediaType - the type of media (Movie or TVShow)
 * @param value - the list value to check
 * @returns - true if the list is valid, false otherwise
 */
export function isValidList(
  mediaType: types.MediaTypeEnum,
  value: types.MovieListEnum | types.TVShowListEnum
): boolean {
  if (mediaType === types.MediaTypeEnum.MOVIE) {
    return Object.values(types.MovieListEnum).includes(
      value as types.MovieListEnum
    );
  } else {
    return Object.values(types.TVShowListEnum).includes(
      value as types.TVShowListEnum
    );
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
 * Get the url to watch a specific movie.
 * @param movie - the movie to get url for
 * @returns - the string url
 */
export function getMovieWatchLink(movie: Partial<types.Movie>): string {
  return `${config.watchBaseURL}movie?id=${movie.id}`;
}

/**
 * Get the url to watch a specific TV show.
 * @param showId
 * @param seasonNum
 * @param episodeNum
 * @returns - the string url
 */
export function getTVShowEpisodeWatchLink(
  show: Partial<types.TVShow>,
  episode: Partial<types.Episode>
): string {
  return `${config.watchBaseURL}tv/?id=${show.id}&s=${episode.season_number}&e=${episode.episode_number}`;
}

/**
 * Convert a date from TMDB to a date object. These dates are in the format
 * YYYY-MM-DD.
 * @param date - the string representation of a date
 * @returns - a date object
 */
export function toDate(date?: string): Date | undefined {
  if (!date) {
    return;
  }
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
  item: Partial<types.Movie & types.TVShow>,
  type: types.MediaTypeEnum
): Date | undefined {
  if (type === types.MediaTypeEnum.MOVIE && item?.release_date) {
    return toDate(item.release_date);
  } else if (type === types.MediaTypeEnum.TV_SHOW && item?.first_air_date) {
    return toDate(item.first_air_date);
  }
}
