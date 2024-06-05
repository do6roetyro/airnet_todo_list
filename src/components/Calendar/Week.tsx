import React from "react";
import Day from "./Day";

interface WeekProps {
    days: { date: number; hasTasks: boolean }[];
    onDayClick: (date: number) => void;
}

const Week: React.FC<WeekProps> = ({ days, onDayClick }) => {
  return (
    <div className="calendar-table__week week">
      {days.map((day, index) => (
        <Day
          key={index}
          date={day.date}
          hasTasks={day.hasTasks}
          onClick={() => onDayClick(day.date)}
        />
      ))}
    </div>
  );
};

export default Week;
