import React from "react";

interface DayProps {
  date: number;
  hasTasks: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ date, hasTasks, onClick }) => {
  return (
    <div
      className={`calendar-table__day ${
        hasTasks ? "calendar-table__day--has-tasks" : ""
      }`}
      onClick={onClick}
    >
      {" "}
      {date}
      {hasTasks && <span>!</span>}
    </div>
  );
};

export default Day;
