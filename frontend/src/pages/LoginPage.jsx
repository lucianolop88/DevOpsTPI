import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage({ onLogin }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}