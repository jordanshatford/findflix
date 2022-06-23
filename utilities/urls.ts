/**
 * Convert string to URL safe
 * @param str - the string to convert
 * @returns - URL safe string
 */
export function toURLSafe(str?: string): string {
  if (!str) {
    return '';
  }
  const s = str.replace(/[&#,+()$~%'.":!*?<>{}]/g, '');
  return s.replace(/\s+/g, '-').toLowerCase();
}
