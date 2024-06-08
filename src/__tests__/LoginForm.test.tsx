import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/Login/LoginForm';
import { UserProvider } from '../contexts/UserContext';
import '@testing-library/jest-dom/extend-expect';

describe('LoginForm', () => {
  it('рендер формы логина', () => {
    render(
      <UserProvider>
        <LoginForm />
      </UserProvider>
    );
    expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('показывает ошибки валидации при отправке с пустыми полями', async () => {
    render(
      <UserProvider>
        <LoginForm />
      </UserProvider>
    );

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    expect(await screen.findByText(/обязательное поле/i)).toBeInTheDocument();
  });

  it('вход в систему с правильными учетными данными', async () => {
    render(
      <UserProvider>
        <LoginForm />
      </UserProvider>
    );

    userEvent.type(screen.getByLabelText(/почта/i), 'john.bid@fake.com');
    userEvent.type(screen.getByLabelText(/пароль/i), 'password123');

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    expect(await screen.findByText(/успешный вход/i)).toBeInTheDocument();
  });
});