// src/components/PlaylistGenerator.js
import React, { useState } from 'react';

const PlaylistGenerator = ({ token }) => {
  const [keyword, setKeyword] = useState('');
  const [playlistCreated, setPlaylistCreated] = useState(false);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const createPlaylist = async () => {
    try {
      const trackUris = await searchTracks();
      const userId = await fetchUserId();
      const playlistId = await createNewPlaylist(userId);
      await addTracksToPlaylist(playlistId, trackUris);
      setPlaylistCreated(true);
    } catch (error) {
      console.error('Error in creating playlist:', error);
      // Implement error handling
    }
  };

  const searchTracks = async () => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.tracks.items.map(track => track.uri);
  };

  const fetchUserId = async () => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.id; // User's Spotify ID
  };

  const createNewPlaylist = async (userId) => {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `Playlist for ${keyword}`,
        description: 'Created via Spotify App',
        public: false,
      }),
    });
    const data = await response.json();
    return data.id; // New playlist ID
  };

  const addTracksToPlaylist = async (playlistId, trackUris) => {
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: trackUris }),
    });
  };

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="Enter a word"
        style={{ padding: '10px', marginRight: '10px' }}
      />
      <button onClick={createPlaylist} disabled={!keyword || playlistCreated} style={{ padding: '10px' }}>
        Create Playlist
      </button>
      {playlistCreated && <p>Playlist created successfully!</p>}
    </div>
  );
};

export default PlaylistGenerator;
