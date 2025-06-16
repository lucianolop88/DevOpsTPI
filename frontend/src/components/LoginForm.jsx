import React, { useState } from 'react';
import { useNavigate } from 'react-router';


export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      
      sessionStorage.setItem('token', data.token);
      onLogin();
      navigate('/');
    } else {
      alert('Login fallido');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-3">Iniciar sesión</h3>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input id="password"  type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Entrar</button>
    </form>
  );
}