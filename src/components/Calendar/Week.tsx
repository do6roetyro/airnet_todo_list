import React from "react";
import Day from "./Day";

interface WeekProps {
  days: { date: number; hasTasks: boolean; currentMonth: boolean; month: number; year: number }[];
  holidays: { [key: number]: boolean };
  onDayClick: (date: { date: number; month: number; year: number }) => void;
}

const Week: React.FC<WeekProps> = ({ days, holidays, onDayClick }) => {
  return (
    <div className="calendar-table__week week">
      {days.map((day, index) => (
        <Day
          key={index}
          date={day.date}
          hasTasks={day.hasTasks}
          isHoliday={holidays[day.date]}
          currentMonth={day.currentMonth}
          onClick={() => onDayClick(day)}
        />
      ))}
    </div>
  );
};

export default Week;
