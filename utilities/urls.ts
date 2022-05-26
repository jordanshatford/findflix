export function removeSpecialCharacters(str: string) {
  return str.replace(/[&#,+()$~%'.":!*?<>{}]/g, '');
}

export function toURLSafe(str?: string) {
  if (!str) {
    return '';
  }
  const s = removeSpecialCharacters(str);
  return s.replace(/\s+/g, '-').toLowerCase();
}
