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
          <label key={index} className="months__label">
            <input
              type="radio"
              name="month"
              value={index}
              checked={currentMonth === index}
              onChange={() => onSelectMonth(index)}
              className="months__radio"
            />
            <span
              className={`months__name ${
                currentMonth === index ? "months__name--active" : ""
              } ${tasksByMonth[index] ? "months__name--has-tasks" : ""}`}
            >
              {month}
            </span>
          </label>
        ))}
      </div>
    );
  };

export default MonthList;
