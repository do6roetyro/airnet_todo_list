import React from "react";
import { MONTHS } from "../../utils/variables";

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
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLabelElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelectMonth(index);
    }
  };

  return (
    <div className="calendar__months months">
      {MONTHS.map((month, index) => (
        <label
          key={index}
          className="months__label"
          tabIndex={0} // Добавляем tabindex для участия в последовательности табуляции
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
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
