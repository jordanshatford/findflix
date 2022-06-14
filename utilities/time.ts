export function toHourMinutes(minutes: number): string {
  return `${Math.floor(minutes / 60)}hr ${minutes % 60}min`;
}

export function toReadableDate(date: Date): string {
  return date.toLocaleString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
