export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + '…';
}

export function formatStreak(days: number): string {
  if (days === 0) return 'Sin racha aún';
  if (days === 1) return '1 día seguido';
  return `${days} días seguidos`;
}

export function formatRosaryCount(count: number): string {
  if (count === 0) return 'Ningún Rosario aún';
  if (count === 1) return '1 Rosario rezado';
  return `${count} Rosarios rezados`;
}
