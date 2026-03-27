import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'password') {
      login(username.trim());
      navigate('/');
    } else {
      setError('Invalid credentials. Use admin / password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-hero">
          <span className="login-hero-icon">🍽</span>
          <h1 className="login-title">RecipeFinder</h1>
          <p className="login-subtitle">Discover thousands of delicious recipes</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit-btn">Sign In</button>
          <p className="login-hint">Demo: <strong>admin</strong> / <strong>password</strong></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
