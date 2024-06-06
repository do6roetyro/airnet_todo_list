import React from "react";
import NavLink from "./NavLink";
import { useUser } from "../../../contexts/UserContext";
import { Button } from "@mui/material";

const Navigation: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <nav className="main-header__nav main-nav">
    <ul className="main-nav__list list">
      {!user ? (
        <>
          <NavLink title="Регистрация" link="register" />
          <NavLink title="Логин" link="login" />
        </>
      ) : (
        <Button
          className="main-nav__logout-button"
          onClick={logout}
          variant="text"
          color="primary"
          size="medium"
          sx={{ color: 'white' }}
        >
          Выйти
        </Button>
      )}
    </ul>
  </nav>
  );
};

export default Navigation;
