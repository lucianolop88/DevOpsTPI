import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Registro exitoso. Redirigiendo al login.');
      navigate('/');
    } else {
      alert('Error al registrarse');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-3">Registrarse</h3>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-success w-100">Registrarse</button>
    </form>
  );
}