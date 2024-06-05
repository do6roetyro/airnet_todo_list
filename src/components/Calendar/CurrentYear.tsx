import React from "react";

interface CurrentYearProps {
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

const CurrentYear: React.FC<CurrentYearProps> = ({ year, onPrev, onNext }) => {
  return (
    <div className="calendar__current-year current-year">
      <button className="current-year__button current-year__button--prev" onClick={onPrev}>⟵</button>
      <span className="current-year__date">{year}</span>
      <button className="current-year__button current-year__button--next" onClick={onNext}>⟶</button>
    </div>
  );
};

export default CurrentYear;
