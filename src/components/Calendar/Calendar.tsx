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
    const startDay = (new Date(year, month, 1).getDay() + 6) % 7; // Смещение начала недели

    for (let i = 0; i < startDay; i++) {
      week.push({ date: 0, hasTasks: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const hasTasks = tasks[year]?.[month + 1]?.[i] !== undefined;
      week.push({ date: i, hasTasks });
      if (week.length === 7 || i === daysInMonth) {
        weeks.push(week);
        week = [];
      }
    }
    return weeks;
  };

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  return (
    <div className="calendar__table calendar-table">
      <div className="calendar-table__header">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-table__header-day">
            {day}
          </div>
        ))}
      </div>
      {generateCalendar().map((week, index) => (
        <div className="calendar-table__week" key={index}>
          <Week days={week} onDayClick={onDayClick} />
        </div>
      ))}
    </div>
  );
};

export default Calendar;
