import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/Register/RegisterForm';
import '@testing-library/jest-dom';

describe('RegisterForm', () => {
  it('Рендер формы регистрации', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/фамилия/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/почта/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/повторите пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });

  it('показывает ошибки валидации при отправке с пустыми полями', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(await screen.findAllByText(/обязательное поле/i)).toHaveLength(5);
  });

  it('показывает ошибку при несовпадении паролей', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/повторите пароль/i), {
      target: { value: 'differentpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(await screen.findByText(/пароли должны совпадать/i)).toBeInTheDocument();
  });

  it('регистрирует пользователя с правильными данными', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/имя/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/фамилия/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/почта/i), {
      target: { value: 'john.doe@fake.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/повторите пароль/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(await screen.findByText(/успешная регистрация/i)).toBeInTheDocument();
  });
});