export function toURLSafe(str?: string): string {
  if (!str) {
    return '';
  }
  const s = str.replace(/[&#,+()$~%'.":!*?<>{}]/g, '');
  return s.replace(/\s+/g, '-').toLowerCase();
}
