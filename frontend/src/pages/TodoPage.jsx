import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchTodos = async () => {
    console.log(sessionStorage.getItem('token'));
    const res = await fetch(`${API_URL}/api/todos`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
 
    });
    const data = await res.json();
    setTodos(data);
  };

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    setTodos(todos.filter(t => t._id !== id));
  };

  const handleToggle = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  
    setTodos(todos.map(t => t._id === id ? { ...t, completed: !t.completed } : t));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Mis tareas</h2>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}