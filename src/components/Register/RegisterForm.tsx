import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import RegistrationSuccessModal from "./RegisterSuccess";

const validationSchema = yup.object({
  firstName: yup.string().required("Обязательное поле"),
  lastName: yup.string().required("Обязательное поле"),
  email: yup
    .string()
    .email("Неправильный формат email")
    .required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать не менее 6 символов")
    .required("Обязательное поле"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Обязательное поле"),
});

const RegisterForm: React.FC = () => {
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] =
    useState(false);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          setIsRegistrationSuccessModalOpen(true);
          actions.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="login__form form" action="/submit" method="post">
            <Field
              as={TextField}
              className="form__input"
              id="firstName"
              name="firstName"
              label="Имя"
              variant="outlined"
              type="text"
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              as={TextField}
              className="form__input"
              id="lastName"
              name="lastName"
              label="Фамилия"
              variant="outlined"
              type="text"
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
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
            <Field
              as={TextField}
              className="form__input"
              id="confirmPassword"
              name="confirmPassword"
              label="Повторите пароль"
              variant="outlined"
              type="password"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            <Button
              className="form__button button"
              type="submit"
              variant="outlined"
              color="primary"
            >
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
      <RegistrationSuccessModal
        isOpen={isRegistrationSuccessModalOpen}
        onClose={() => setIsRegistrationSuccessModalOpen(false)}
      />
    </>
  );
};

export default RegisterForm;
