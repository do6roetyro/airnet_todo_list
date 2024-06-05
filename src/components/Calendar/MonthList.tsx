import React from "react";

const months = [
  "янв",
  "фев",
  "март",
  "апр",
  "май",
  "июнь",
  "июль",
  "авг",
  "сент",
  "окт",
  "нояб",
  "дек",
];

interface MonthListProps {
    currentMonth: number;
    onSelectMonth: (month: number) => void;
    tasksByMonth: { [key: number]: boolean }; // Ключ - номер месяца (0-11), значение - есть ли задачи в месяце
  }

const MonthList: React.FC<MonthListProps> = ({
  currentMonth,
  onSelectMonth,
  tasksByMonth,
}) => {
  return (
    <div className="calendar__months months">
      {months.map((month, index) => (
        <button
          key={index}
          className={`months__button ${
            currentMonth === index ? "months__button--active" : ""
          } ${tasksByMonth[index] ? "months__button--has-tasks" : ""}`}
          onClick={() => onSelectMonth(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthList;
