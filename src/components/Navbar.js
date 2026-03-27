import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🍽</span>
        <span className="brand-text">RecipeFinder</span>
      </Link>
      <div className="navbar-links">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${location.pathname === path ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>
      {user && (
        <div className="navbar-user">
          <span className="nav-username">Hi, {user.username}</span>
          <button className="nav-logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
