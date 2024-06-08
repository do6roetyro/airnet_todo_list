import React from "react";

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  logo: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, logo }) => {
  return (
    <button
      className={`current-year__button current-year__button--${direction}`}
      onClick={onClick}
    >
      <span className="visually-hidden">
        {direction === "prev" ? "предыдущий год" : "следующий год"}
      </span>
      <img
        src={logo}
        alt="стрелка"
        className="current-year__logo"
        width={32}
        height={32}
      />
    </button>
  );
};

export default ArrowButton;
