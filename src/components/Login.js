// src/components/Login.js

const CLIENT_ID = 'da1f1acb01854c77a810994dbdac08ab'; // Replace with your Spotify Client ID
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_CALLBACK_URL;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
    'user-library-modify',
    'user-library-read',
    'user-follow-read',
    'user-follow-modify',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'streaming',
    'app-remote-control',
    'ugc-image-upload'
  ];
  
const Login = () => {
  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join('%20')}`;
  };

  return (
    <button style={buttonStyle} onClick={handleLogin}>Login with Spotify</button>
  );
};

const buttonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
  };

export default Login;
