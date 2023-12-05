// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
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
    console.log(data); // Log the response for now
  };

  React.useEffect(() => {
    if (token) {
      fetchSpotifyData();
    }
  }, [token]);

  return (
    <div>
      <h1>Welcome to the Spotify Integration App</h1>
      {/* Display Spotify data or other content here */}
    </div>
  );
};

export default Home;
