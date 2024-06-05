import React from "react";
import Day from "./Day";

interface WeekProps {
  days: { date: number; hasTasks: boolean }[];
  holidays: { [key: number]: boolean };
  onDayClick: (date: number) => void;
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
          onClick={() => onDayClick(day.date)}
        />
      ))}
    </div>
  );
};

export default Week;
