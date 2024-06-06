import pLimit from "p-limit";

const API_URL = "https://isdayoff.ru/api/getdata?year=";

const limit = pLimit(5); // Ограничиваем количество одновременных запросов
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
  const response = await fetch(`${API_URL}${year}&delimeter=%0A`);

  if (response.ok) {
    const data = await response.text();
    const daysOff = data.split("\n");
    const holidays: { [month: number]: { [day: number]: boolean } } = {};

    daysOff.forEach((day, index) => {
      const date = new Date(year, 0, index + 1);
      const month = date.getMonth();
      const dayOfMonth = date.getDate();
      if (!holidays[month]) {
        holidays[month] = {};
      }
      holidays[month][dayOfMonth] = day === "1";
    });

    return holidays;
  } else {
    console.error(`Failed to fetch data for year ${year}`);
    return {};
  }
};

export const isDayOff = async (year: number): Promise<{ [month: number]: { [day: number]: boolean } }> => {
  const cacheKey = `${year}`;

  //cache check
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  //localStorage check
  const localStorageData = getFromLocalStorage(cacheKey);
  if (localStorageData) {
    cache[cacheKey] = localStorageData;
    return localStorageData;
  }

  const holidays = await fetchYearOff(year);

  // save data to cache and LS
  cache[cacheKey] = holidays;
  saveToLocalStorage(cacheKey, holidays);

  return holidays;
};