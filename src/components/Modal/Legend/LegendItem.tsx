import React from "react";

interface LegendItemProps {
  text: string;
  description: string;
  type: string;
  color: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ text, description, type, color }) => {
  return (
    <li className="legend__item">
      <span className={`legend__${type} legend__${type}--${color}`}>{text}</span>
      <span className="legend__text">{`— ${description};`}</span>
    </li>
  );
};

export default LegendItem;
