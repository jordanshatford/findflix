/**
 * Convert enum string to something more readable
 * @param str - the string enum
 * @return - string
 */
export function toReadableString(str: string): string {
  const spacedString = str.replaceAll('_', ' ');
  return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
}
