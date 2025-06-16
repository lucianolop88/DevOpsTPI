import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { MemoryRouter } from 'react-router';

describe('LoginForm', () => {
  it('renderiza el formulario de login', () => {
    render(
      <MemoryRouter>
        <LoginForm onLogin={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('llama a onLogin al loguear con datos válidos', async () => {
    const mockLogin = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mocktoken' }),
      })
    );

    render(
      <MemoryRouter>
        <LoginForm onLogin={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));


    await screen.findByText(/Iniciar sesión/i);
    expect(mockLogin).toHaveBeenCalled();
  });
});