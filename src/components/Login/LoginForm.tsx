import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ModalSuccess from "../Modal/ModalSuccess";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import data from '../../data.json';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Неправильный формат email")
    .required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
});

const LoginForm: React.FC = () => {
  const [isLoginSuccessModalOpen, setIsLoginSuccessModalOpen] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsLoginSuccessModalOpen(false);
    navigate('/calendar');
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const user = data.find(
            (u: any) => u.email === values.email && u.password === values.password
          );

          if (user) {
            login(user);
            setIsLoginSuccessModalOpen(true);
          } else {
            alert("Неправильный email или пароль");
          }

          actions.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="login__form form" action="/submit" method="post">
            <Field
              as={TextField}
              className="form__input"
              id="email"
              name="email"
              label="Почта"
              variant="outlined"
              type="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              className="form__input"
              id="password"
              name="password"
              label="Пароль"
              variant="outlined"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
          </Form>
        )}
      </Formik>
      <ModalSuccess
        isOpen={isLoginSuccessModalOpen}
        onClose={handleCloseModal}
        title="Успешный вход!"
        info={`Добро пожаловать, ${useUser().user?.firstName}`}
      />
    </>
  );
};

export default LoginForm;
