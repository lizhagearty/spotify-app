// src/components/CurrentlyPlaying.js
import React, { useState, useEffect } from 'react';

const CurrentlyPlaying = ({ token }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    if (token) {
      fetchCurrentlyPlaying();
    }
  }, [token]);

  const fetchCurrentlyPlaying = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentTrack(data.item); // Assuming 'item' contains the current track info
    } catch (error) {
      console.error('Error fetching currently playing track:', error);
    }
  };

  if (!currentTrack) return null;

  return (
    <div>
      <img src={currentTrack.album.images[0].url} alt={currentTrack.name} style={{ width: '100px', height: '100px' }} />
      <p>Now Playing: {currentTrack.name}</p>
      <p>Artist: {currentTrack.artists.map(artist => artist.name).join(', ')}</p>
    </div>
  );
};

export default CurrentlyPlaying;
