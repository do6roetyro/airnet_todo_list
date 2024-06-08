import React from "react";
import ArrowButton from "./ArrowButton";
import arrow from "../../../assets/images/arrow.svg";

interface CurrentYearProps {
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

const CurrentYear: React.FC<CurrentYearProps> = ({ year, onPrev, onNext }) => {
  return (
    <div className="calendar__current-year current-year">
      <ArrowButton
        direction="prev"
        onClick={onPrev}
        logo={arrow as any}
      />
      <span className="current-year__date">{year}</span>
      <ArrowButton
        direction="next"
        onClick={onNext}
        logo={arrow as any}
      />
    </div>
  );
};

export default CurrentYear;
