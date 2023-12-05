// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentlyPlaying from './CurrentlyPlaying';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const token = localStorage.getItem('spotifyAuthToken');

  useEffect(() => {
    if (token) {
      fetchSpotifyData();
    }
  }, [token]);

  const fetchSpotifyData = async () => {
    // Example function to fetch data from Spotify API
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUserName(data.display_name);
    // Set the user's profile image URL
    if (data.images && data.images.length > 0) {
        setUserImage(data.images[1].url); 
      }
    console.log(data); // Log the response for now
  };

  return (
    <div style={pageStyle}>
      {token ? (
        <>
          <div style={cardStyle}>
            {userImage && <img src={userImage} alt="User Profile" style={imageStyle} />}
            {userName && <p>Hi, {userName}</p>}
          </div>
          <div style={cardStyle}>
            <CurrentlyPlaying token={token} />
          </div>
        </>
      ) : (
        <div style={cardStyle}><p>Log in plz (:</p></div>
      )}
    </div>
  );
};

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px'
};

const cardStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  margin: '10px',
  padding: '20px',
  textAlign: 'center',
  width: '300px' // Adjust as needed
};

const imageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%'
};

export default Home;
