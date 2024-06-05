import pLimit from 'p-limit';

const API_URL = "https://isdayoff.ru/";

const limit = pLimit(5); // Ограничиваем количество одновременных запросов
const cache: { [key: string]: { [day: number]: boolean } } = {};

const fetchDayOff = async (
  year: number,
  month: number,
  day: number
): Promise<boolean> => {
  const formattedMonth = String(month + 1).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const response = await fetch(`${API_URL}${year}${formattedMonth}${formattedDay}`);
  
  if (response.ok) {
    const data = await response.text(); // API возвращает текст
    console.log('isDay')
    return data === '1'; // '1' означает выходной
  } else {
    console.error(`Failed to fetch data for ${year}-${formattedMonth}-${formattedDay}`);
    return false;
  }
};

export const isDayOff = async (year: number, month: number): Promise<{ [day: number]: boolean }> => {
  const cacheKey = `${year}-${month}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const holidays: { [day: number]: boolean } = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const promises = [];
  for (let day = 1; day <= daysInMonth; day++) {
    promises.push(limit(() => fetchDayOff(year, month, day).then(isHoliday => {
      holidays[day] = isHoliday;
    })));
  }

  await Promise.all(promises);

  cache[cacheKey] = holidays;

  return holidays;
};
