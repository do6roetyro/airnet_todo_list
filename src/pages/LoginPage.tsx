import React from "react";
import LoginForm from "../components/Login/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <section className="login">
    <h2 className="login__title form__title title">Войти в аккаунт</h2>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
