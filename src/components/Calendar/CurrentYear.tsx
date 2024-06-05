import React from 'react';

const CurrentYear: React.FC<{ year: number; onPrev: () => void; onNext: () => void; }> = ({ year, onPrev, onNext }) => {
  return (
    <div className="current-year">
      <button onClick={onPrev}>⟵</button>
      <span>{year}</span>
      <button onClick={onNext}>⟶</button>
    </div>
  );
};

export default CurrentYear;