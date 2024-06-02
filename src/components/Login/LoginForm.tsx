import React from "react";
import { Button, TextField } from "@mui/material";




const LoginForm: React.FC = () => {
  return (
    <form className="login__form form" action="/submit" method="post">
      <TextField
        className="form__input"
        id="email"
        name="email"
        label="Почта"
        variant="outlined"
        type="email"
      />
      <TextField
        className="form__input"
        id="password"
        name="password"
        label="Пароль"
        variant="outlined"
        type="password"
      />
      <Button
        className="form__button button"
        type="submit"
        variant="outlined"
        color="primary"
        size="medium"
      >
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;