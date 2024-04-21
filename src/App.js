import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [isWordPress, setIsWordPress] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/check-wordpress', { url });
      setIsWordPress(response.data.isWordPress);
      setError('');
    } catch (error) {
      setError('Failed to check WordPress');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>WordPress Detector</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
        <button type="submit">Check</button>
      </form>
      {error && <p>{error}</p>}
      {isWordPress !== null && (
        <p>{isWordPress ? 'This site is using WordPress' : 'This site is not using WordPress'}</p>
      )}
    </div>
  );
}

export default App;
