import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [isWordPress, setIsWordPress] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('URL cannot be empty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/check-wordpress', { url });
      console.log('Response from server:', response.data); // Выводим данные ответа в консоль
      if (response.data.hasOwnProperty('isWordPress')) {
        setIsWordPress(response.data.isWordPress);
        setError('');
      } else {
        throw new Error('Invalid response from server');
      }
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
