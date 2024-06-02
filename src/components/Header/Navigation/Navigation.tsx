import React from "react";
import { Link } from "react-router-dom";

import NavLink from "./NavLink";

const Navigation: React.FC = () => {
  return (
    <nav className="main-header__nav main-nav">
      <ul className="main-nav__list list">
        <NavLink title="Регистрация" link="register" />
        <NavLink title="Логин" link="login" />
      </ul>
    </nav>
  );
};

export default Navigation;
