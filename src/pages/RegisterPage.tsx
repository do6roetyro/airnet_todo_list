import React from "react";
import RegisterForm from "../components/Register/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <section className="register">
      <h2 className="register__title form__title title">Регистрация пользователя</h2>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
