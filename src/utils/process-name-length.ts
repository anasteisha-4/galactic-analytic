export const processNameLength = (s: string) =>
  s.length > 20 ? s.slice(0, 16) + '...' : s;
