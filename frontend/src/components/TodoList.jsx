import React from 'react';

export default function TodoList({ todos, onDelete, onToggle }) {
    

  return (
    <div className="row">
      {todos.map(todo => (
        <div className="col-md-6 mb-3" key={todo._id}>
          <div className={`card ${todo.completed ? 'bg-light text-muted' : ''}`}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <div>
                <button className="btn btn-sm btn-outline-success me-2" aria-label="Marcar" onClick={() => onToggle(todo._id)}>
                  ✔
                </button>
                <button className="btn btn-sm btn-outline-danger" aria-label="Eliminar"  onClick={() => onDelete(todo._id)}>
                  🗑
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}