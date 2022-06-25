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
 * Check if a peice of media is available to watch.
 * @param media - the media to check (Movie or Episode)
 * @returns
 */
export function isWatchable(
  media: Partial<types.Movie & types.Episode>
): boolean {
  if (!config.watchBaseURL) {
    return false;
  }
  let date: Date | undefined = undefined;
  if (media.release_date) {
    date = toDate(media.release_date);
  } else if (media.air_date) {
    date = toDate(media.air_date);
  }
  if (!date) {
    return false;
  }
  const today = new Date();
  return today >= date;
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
