import React, { useState } from "react";
import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ModalSuccess from "../Modal/ModalSuccess";
import FormikField from "../../utils/FormikField";

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
              component={FormikField}
              name="firstName"
              label="Имя"
              type="text"
            />
            <Field
              component={FormikField}
              name="lastName"
              label="Фамилия"
              type="text"
            />
            <Field
              component={FormikField}
              name="email"
              label="Почта"
              type="email"
            />
            <Field
              component={FormikField}
              name="password"
              label="Пароль"
              type="password"
            />
            <Field
              component={FormikField}
              name="confirmPassword"
              label="Повторите пароль"
              type="password"
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
      <ModalSuccess
        isOpen={isRegistrationSuccessModalOpen}
        onClose={() => setIsRegistrationSuccessModalOpen(false)}
        title="Успешная регистрация!"
        info="Поздравляем! Вы можете начать пользоваться приложением!"
      />
    </>
  );
};

export default RegisterForm;
