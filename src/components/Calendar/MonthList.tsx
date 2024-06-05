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
}

const MonthList: React.FC<MonthListProps> = ({
  currentMonth,
  onSelectMonth,
}) => {
  return (
    <div className="calendar__months months">
      {months.map((month, index) => (
        <button 
          key={index}
          className={`months__button ${currentMonth === index ? "months__button--active" : ""}`}
          onClick={() => onSelectMonth(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthList;
