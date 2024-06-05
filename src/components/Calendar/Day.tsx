import React from "react";

interface DayProps {
  date: number;
  hasTasks: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ date, hasTasks, onClick }) => {
  if (date === 0) {
    return <div className="calendar-table__day empty"></div>;
  }
  return (
    <button
      className={`calendar-table__day ${
        hasTasks ? "calendar-table__day--has-tasks" : ""
      }`}
      onClick={onClick}
    >
      {date}
      {/* {hasTasks && <span>!</span>} */}
    </button>
  );
};

export default Day;
