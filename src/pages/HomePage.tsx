import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <section className="hero">
      <h2 className="hero__title title">
        ToDoList - твой помощник в течение дня.
      </h2>
      <p className="hero__description description">
        Чтобы начать - зарегистируйтесь или войдите в свой профиль
      </p>
      <Link to="/calendar" className="hero__link link">
      Перейти в календарь
    </Link>
    </section>
  );
};

export default HomePage;
