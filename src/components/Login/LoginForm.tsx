import React, { useState } from "react";
import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ModalSuccess from "../Modal/ModalSuccess";
import { useUser, User } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import data from "../../data.json";
import FormikField from "../../utils/FormikField";

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
    navigate("/calendar");
  };

  const parseTasks = (tasks: any): User["tasks"] => {
    const parsedTasks: User["tasks"] = {};

    Object.keys(tasks).forEach((year) => {
      const yearNum = parseInt(year);
      parsedTasks[yearNum] = {};
      Object.keys(tasks[year]).forEach((month) => {
        const monthNum = parseInt(month);
        parsedTasks[yearNum][monthNum] = tasks[year][month];
      });
    });

    return parsedTasks;
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
            (u: any) =>
              u.email === values.email && u.password === values.password
          );

          if (user) {
            login({
              ...user,
              id: user.id.toString(), // Преобразование id в строку
              tasks: parseTasks(user.tasks), // Парсинг задач
            });
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
