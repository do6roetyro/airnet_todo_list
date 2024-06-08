import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../components/Register/RegisterForm';
import { BrowserRouter as Router } from 'react-router-dom';

describe('RegisterForm', () => {
  it('рендер формы регистрации', () => {
    render(
      <Router>
        <RegisterForm />
      </Router>
    );

    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Фамилия')).toBeInTheDocument();
    expect(screen.getByLabelText('Почта')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Повторите пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });

  it('показывает ошибки валидации при отправке с пустыми полями', async () => {
    render(
      <Router>
        <RegisterForm />
      </Router>
    );

    userEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(await screen.findAllByText(/обязательное поле/i)).toHaveLength(5);
  });

  // it('регистрирует пользователя с правильными данными', async () => {
  //   render(
  //     <Router>
  //       <RegisterForm />
  //     </Router>
  //   );

  //   userEvent.type(screen.getByLabelText('Имя'), 'John');
  //   userEvent.type(screen.getByLabelText('Фамилия'), 'Doe');
  //   userEvent.type(screen.getByLabelText('Почта'), 'john.doe@fake.com');
  //   userEvent.type(screen.getByLabelText('Пароль'), 'password123');
  //   userEvent.type(screen.getByLabelText('Повторите пароль'), 'password123');

  //   userEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

  //   await waitFor(() => {
  //     const modalTitle = screen.getByTestId('modal-title');
  //     console.log("Modal title found:", modalTitle.textContent);
  //     expect(modalTitle).toHaveTextContent('Успешная регистрация!');
  //   });

  //   await waitFor(() => {
  //     const modalInfo = screen.getByTestId('modal-info');
  //     console.log("Modal info found:", modalInfo.textContent);
  //     expect(modalInfo).toHaveTextContent('Поздравляем! Вы можете начать пользоваться приложением!');
  //   });
  // });
});