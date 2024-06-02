import React from "react";
import { Link } from "react-router-dom";

import HomeLink from "./HomeLink";
import Navigation from "./Navigation/Navigation";

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="main-header__wrapper wrapper">
        <HomeLink title="ToDoList" />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
