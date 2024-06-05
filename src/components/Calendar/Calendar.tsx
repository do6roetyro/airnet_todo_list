import React from "react";
import Week from "./Week";

interface CalendarProps {
  year: number;
  month: number;
  tasks: any;
  onDayClick: (date: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  tasks,
  onDayClick,
}) => {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const weeks: { date: number; hasTasks: boolean }[][] = [];
    let week: { date: number; hasTasks: boolean }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const hasTasks = tasks[year]?.[month + 1]?.[i] !== undefined;
      week.push({ date: i, hasTasks });
      if (date.getDay() === 0 || i === daysInMonth) {
        weeks.push(week);
        week = [];
      }
    }
    return weeks;
  };

  return (
    <div className="calendar__table calendar-table">
      {generateCalendar().map((week, index) => (
        <Week key={index} days={week} onDayClick={onDayClick} />
      ))}
    </div>
  );
};

export default Calendar;
