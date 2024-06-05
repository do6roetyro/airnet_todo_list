// const API_URL = "https://api.isdayoff.ru/";

// export const isDayOff = async (year: number, month: number): Promise<{ [key: number]: boolean }> => {
//   const response = await fetch(`${API_URL}?year=${year}&month=${month}`);
//   const data = await response.json();
//   const holidays: { [key: number]: boolean } = {};
  
//   data.forEach((day: number, index: number) => {
//     if (day === 1) {
//       holidays[index + 1] = true; // Assuming the API returns an array with 0 for workdays and 1 for holidays
//     }
//   });

//   return holidays;
// };

const API_URL = "https://isdayoff.ru/";

export const isDayOff = async (year: number, month: number): Promise<{ [key: number]: boolean }> => {
  const holidays: { [key: number]: boolean } = {};
  
  for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const response = await fetch(`${API_URL}${year}${formattedMonth}${formattedDay}`);
    
    if (response.ok) {
      const data = await response.text(); // API возвращает текст
      holidays[day] = data === '1'; // '1' означает выходной
      console.log('ok')
    } else {
      console.error(`Failed to fetch data for ${year}-${formattedMonth}-${formattedDay}`);
    }
  }
  
  return holidays;
};
