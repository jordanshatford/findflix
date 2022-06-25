/**
 * Convert minutes to hour minutes string
 * @param minutes - the amount of time in minutes
 * @returns string
 */
export function toHourMinutes(minutes: number): string {
  return `${Math.floor(minutes / 60)}hr ${minutes % 60}min`;
}

/**
 * Convert Date oject to readable, formatted string
 * @param date - the Date
 * @returns string
 */
export function toReadableDate(date?: Date): string | undefined {
  if (!date) {
    return;
  }
  return date.toLocaleString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
