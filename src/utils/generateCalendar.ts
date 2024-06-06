const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const generateCalendar = (
  year: number,
  month: number,
  tasks: any
): { date: number; hasTasks: boolean }[][] => {
  const daysInMonth = getDaysInMonth(year, month);
  const weeks: { date: number; hasTasks: boolean }[][] = [];
  let week: { date: number; hasTasks: boolean }[] = [];
  const startDay = (new Date(year, month, 1).getDay() + 6) % 7; 

  console.log(`Generating calendar for ${year}-${month + 1}`);
  console.log(`Days in month: ${daysInMonth}`);
  console.log(`Start day of the week: ${startDay}`);

  for (let i = 0; i < startDay; i++) {
    week.push({ date: 0, hasTasks: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const hasTasks = tasks[year]?.[month + 1]?.[i] !== undefined;
    week.push({ date: i, hasTasks });
    if (week.length === 7 || i === daysInMonth) {
      weeks.push(week);
      week = [];
    }
  }
  return weeks;
};

export { generateCalendar };
