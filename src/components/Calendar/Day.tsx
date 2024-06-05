import React from "react";

interface DayProps {
  date: number;
  hasTasks: boolean;
  isHoliday?: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ date, hasTasks, isHoliday, onClick }) => {
  if (date === 0) {
    return <div className="calendar-table__day empty"></div>;
  }
  return (
    <button
      className={`calendar-table__day ${
        hasTasks ? "calendar-table__day--has-tasks" : ""
      } ${isHoliday ? "calendar-table__day--holiday" : ""}`}
      onClick={onClick}
    >
      {date}
    </button>
  );
};

export default Day;