import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/Login/LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';

describe('LoginForm', () => {
  it('рендер формы логина', () => {
    render(
      <Router>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </Router>
    );

    expect(screen.getByLabelText('Почта')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('показывает ошибки валидации при отправке с пустыми полями', async () => {
    render(
      <Router>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </Router>
    );

    userEvent.click(screen.getByRole('button', { name: /войти/i }));
    const errors = await screen.findAllByText(/обязательное поле/i);
    expect(errors).toHaveLength(2);
  });

  // it('вход в систему с правильными учетными данными', async () => {
  //   render(
  //     <Router>
  //       <UserProvider>
  //         <LoginForm />
  //       </UserProvider>
  //     </Router>
  //   );

  //   userEvent.type(screen.getByLabelText('Почта'), 'john.bid@fake.com');
  //   userEvent.type(screen.getByLabelText('Пароль'), 'password123');

  //   userEvent.click(screen.getByRole('button', { name: /войти/i }));

  //   await waitFor(() => {
  //     const modalTitle = screen.getByTestId('modal-title');
  //     console.log("Modal title found:", modalTitle.textContent);
  //     expect(modalTitle).toHaveTextContent('Успешный вход!');
  //   });

  //   await waitFor(() => {
  //     const modalInfo = screen.getByTestId('modal-info');
  //     console.log("Modal info found:", modalInfo.textContent);
  //     expect(modalInfo).toHaveTextContent('Добро пожаловать, John');
  //   });
  // });
});