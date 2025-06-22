export const processNameLength = (s: string) =>
  s.length > 21 ? s.slice(0, 18) + '...' : s;
