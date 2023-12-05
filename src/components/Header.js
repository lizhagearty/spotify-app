// src/components/Header.js
import React from 'react';
import Login from './Login'; // Assuming Login is your login button component
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('spotifyAuthToken');

  const handleLogout = () => {
    localStorage.removeItem('spotifyAuthToken');
    navigate('/');
  };

  return (
    <div style={headerStyle}>
      <h1 style={{ margin: '0' }}></h1>
      {token ? (
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      ) : (
        <Login />
      )}
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#8fd694',
  padding: '10px 20px',
  color: 'white'
};

const buttonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Header;
