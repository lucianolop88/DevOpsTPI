import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
   const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({ text })
    });

    if (res.ok) {
      const newTodo = await res.json();
      onAdd(newTodo);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-4">
      <input type="text" className="form-control" placeholder="Nueva tarea" value={text} onChange={e => setText(e.target.value)} required />
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
}