// src/components/Callback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');

    if (token) {
      // Save the token for future API calls
      localStorage.setItem('spotifyAuthToken', token);
      navigate('/'); // Redirect to home page or dashboard
    }
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
};

export default Callback;
