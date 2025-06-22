const monthsMap = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const processDay = (day: number) => {
  const date = new Date(new Date(2025, 0).setDate(day));
  return `${date.getDate()} ${monthsMap[date.getMonth()]}`;
};

export const processDate = (date: Date) => date.toLocaleDateString();
