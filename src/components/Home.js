// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login'; // Assuming Login is your login button component

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const token = localStorage.getItem('spotifyAuthToken');

  if (!token) {
    // If not logged in, redirect to login or show a message
    navigate('/login');
    // Alternatively, you can display a login prompt instead of redirecting
    // return <div>Please log in to view this page</div>;
  }

  const fetchSpotifyData = async () => {
    // Example function to fetch data from Spotify API
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUserName(data.display_name);
    console.log(data); // Log the response for now
  };

  React.useEffect(() => {
    if (token) {
      fetchSpotifyData();
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <h1>{userName && <p>Hi {userName}</p>}</h1>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
