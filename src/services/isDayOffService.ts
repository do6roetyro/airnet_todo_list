// import pLimit from "p-limit";

const API_URL = "https://isdayoff.ru/";

// const limit = pLimit(5); // Ограничиваем количество одновременных запросов
const cache: { [key: string]: { [month: number]: { [day: number]: boolean } } } = {};

// Получение данных из localStorage
const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Сохранение данных в localStorage
const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const fetchYearOff = async (year: number): Promise<{ [month: number]: { [day: number]: boolean } }> => {
  const response = await fetch(`${API_URL}api/getdata?year=${year}&delimeter=%0A`);
  if (response.ok) {
    const data = await response.text(); // API возвращает текст
    const days = data.split('\n');
    const holidays: { [month: number]: { [day: number]: boolean } } = {};

    days.forEach((day, index) => {
      const month = Math.floor(index / 31) + 1;
      const dayOfMonth = (index % 31) + 1;

      if (!holidays[month]) {
        holidays[month] = {};
      }

      holidays[month][dayOfMonth] = day === '1';
    });

    return holidays;
  } else {
    console.error(`Failed to fetch data for year ${year}`);
    throw new Error(`Failed to fetch data for year ${year}`);
  }
};

export const isDayOff = async (
  year: number,
  month: number
): Promise<{ [day: number]: boolean }> => {
  const cacheKey = `${year}`;

  // Cache check
  if (cache[cacheKey]) {
    return cache[cacheKey][month];
  }

  // LocalStorage check
  const localStorageData = getFromLocalStorage(cacheKey);
  if (localStorageData) {
    cache[cacheKey] = localStorageData;
    return localStorageData[month];
  }

  const yearHolidays = await fetchYearOff(year);

  // Save data to cache and LS
  cache[cacheKey] = yearHolidays;
  saveToLocalStorage(cacheKey, yearHolidays);

  return yearHolidays[month];
};
