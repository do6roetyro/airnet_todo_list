import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Link to="/">ToDoList</Link>
      </div>
    </header>
  );
};

export default Header