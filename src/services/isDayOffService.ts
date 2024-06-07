const API_URL = "https://isdayoff.ru/api/getdata?year=";

const cache: { [key: string]: { [day: number]: boolean } } = {};

// Получение данных из localStorage
const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Сохранение данных в localStorage
const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const fetchMonthOff = async (year: number, month: number): Promise<{ [day: number]: boolean }> => {
  const response = await fetch(`${API_URL}${year}&month=${month + 1}&delimeter=%0A`);

  if (response.ok) {
    const data = await response.text();
    const daysOff = data.split("\n");
    const holidays: { [day: number]: boolean } = {};

    daysOff.forEach((day, index) => {
      const dayOfMonth = index + 1;
      holidays[dayOfMonth] = day === "1";
    });

    return holidays;
  } else {
    console.error(`Failed to fetch data for ${year}-${month + 1}`);
    return {};
  }
};

export const isDayOff = async (year: number, month: number): Promise<{ [day: number]: boolean }> => {
  const cacheKey = `${year}-${month}`;

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

  const holidays = await fetchMonthOff(year, month);

  // save data to cache and LS
  cache[cacheKey] = holidays;
  saveToLocalStorage(cacheKey, holidays);

  return holidays;
};