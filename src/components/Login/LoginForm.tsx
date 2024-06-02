import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Неправильный формат email")
    .required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
});

const LoginForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
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
  );
};

export default LoginForm;
