import React from "react";
import NavLink from "./NavLink";
import { useUser } from "../../../contexts/UserContext";
import { Button } from "@mui/material";
import log_out from "../../../assets/images/logout.svg";

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
          <li className="main-nav__item">
            <Button
              className="main-nav__logout-button"
              onClick={logout}
              variant="text"
              color="primary"
              size="medium"
              sx={{ color: "white" }}
            >
              <span className="visually-hidden">Выйти из профиля</span>
              <img
                src={log_out as unknown as string}
                alt="Выход"
                className="logout-button__icon"
                width={32}
                height={32}
              />
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
