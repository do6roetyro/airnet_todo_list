import { isDayOff } from "../services/isDayOffService";

export const hasTasksForWeek = (startOfWeek: Date, tasks: any): boolean => {
    const tasksForWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (tasks[year]?.[month]?.[day]?.length > 0) {
        tasksForWeek.push(tasks[year][month][day]);
      }
    }
    return tasksForWeek.length > 0;
  };
  
  export const startOfWeekOffset = (startOfWeek: Date): Date => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // Смещение к понедельнику
    return date;
  };
  
  export const fetchHolidays = async (year: number, month: number, setHolidays: (holidays: { [day: number]: boolean }) => void, setIsLoading: (isLoading: boolean) => void) => {
    setIsLoading(true);
    try {
      const monthHolidays = await isDayOff(year, month);
      setHolidays(monthHolidays);
    } finally {
      setIsLoading(false);
    }
  };