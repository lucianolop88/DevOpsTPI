import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router';
import React from 'react';

describe('App routing', () => {
  it('muestra Login si no está autenticado', () => {
    sessionStorage.clear(); 
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });
});