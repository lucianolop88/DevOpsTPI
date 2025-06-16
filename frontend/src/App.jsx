import React, { useState } from 'react';
import { Routes, Route, Navigate, Link, BrowserRouter } from 'react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';

function AppContent({ authenticated, handleLogin, handleLogout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">
          To-Do App
        </Link>
        <div className="ms-auto">
          {authenticated ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Iniciar sesión
              </Link>
              <Link className="btn btn-outline-light" to="/register">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? <TodoPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    !!sessionStorage.getItem('token')
  );

  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setAuthenticated(false);
  };

  const content = (
    <AppContent
      authenticated={authenticated}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
    />
  );

  
  if (process.env.NODE_ENV === 'test') {
    return content;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
}
