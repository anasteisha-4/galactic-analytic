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

export const processDate = (day: number) => {
  const date = new Date(new Date(2025, 0).setDate(day));
  if (!day) console.log(day);
  return `${date.getDate()} ${monthsMap[date.getMonth()]}`;
};
