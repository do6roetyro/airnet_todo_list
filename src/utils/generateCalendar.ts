const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const generateCalendar = (
  year: number,
  month: number,
  tasks: any
): {
  date: number;
  hasTasks: boolean;
  currentMonth: boolean;
  month: number;
  year: number;
}[][] => {
  const daysInMonth = getDaysInMonth(year, month);
  const weeks: {
    date: number;
    hasTasks: boolean;
    currentMonth: boolean;
    month: number;
    year: number;
  }[][] = [];
  let week: {
    date: number;
    hasTasks: boolean;
    currentMonth: boolean;
    month: number;
    year: number;
  }[] = [];
  const startDay = (new Date(year, month, 1).getDay() + 6) % 7; // Смещение начала недели

  // Добавляем пустые ячейки до первого дня текущего месяца
  for (let i = 0; i < startDay; i++) {
    week.push({ date: 0, hasTasks: false, currentMonth: false, month, year });
  }

  // Дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const hasTasks = tasks[year]?.[month + 1]?.[i]?.length > 0;
    week.push({
      date: i,
      hasTasks,
      currentMonth: true,
      month: month + 1,
      year,
    });
    if (week.length === 7 || i === daysInMonth) {
      weeks.push(week);
      week = [];
    }
  }

  // Добавляем пустые ячейки после последнего дня текущего месяца
  if (week.length > 0 && week.length < 7) {
    const remainingDays = 7 - week.length;
    for (let i = 0; i < remainingDays; i++) {
      week.push({ date: 0, hasTasks: false, currentMonth: false, month, year });
    }
    weeks.push(week);
  }

  return weeks;
};

export { generateCalendar };
