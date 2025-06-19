import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../components/TodoList';
import React from 'react';




describe('TodoList', () => {
    beforeEach(() => {
  sessionStorage.setItem('token', 'mock-token');
});

afterEach(() => {
  jest.resetAllMocks();
  sessionStorage.clear();
});
 test('renderiza tareas del backend', async () => {
    
    const mockTodos = [
      { _id: '1', text: 'Tarea 1', completed: false },
      { _id: '2', text: 'Tarea 2', completed: false },
    ];

    render(<TodoList todos={mockTodos} onDelete={() => {}} onToggle={() => {}} />);

    
    expect(await screen.findByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
  });



test('llama onDelete al eliminar tarea', () => {
  const todos = [{ _id: '1', text: 'Tarea a borrar', completed: false }];
  const onDelete = jest.fn();

  render(<TodoList todos={todos} onDelete={onDelete} onToggle={() => {}} />);

  const deleteBtn = screen.getByRole('button', { name: /Eliminar/i });
  fireEvent.click(deleteBtn);

  expect(onDelete).toHaveBeenCalledWith('1');
});

test('llama onToggle al marcar tarea como hecha', () => {
  const todos = [{ _id: '1', text: 'Tarea a marcar', completed: false }];
  const onToggle = jest.fn();

  render(<TodoList todos={todos} onDelete={()=>{}} onToggle={onToggle} />);

  const toggleBtn = screen.getByRole('button', { name: /Marcar/i });
  fireEvent.click(toggleBtn);

  expect(onToggle).toHaveBeenCalledWith('1');
});
});