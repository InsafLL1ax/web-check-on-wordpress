import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWordPress, setIsWordPress] = useState(null);
  const [error, setError] = useState(false);
  const [errorServ, setErrorServ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!url.trim()) {
    setError(true);
    }
    try {
      const response = await axios.post('http://localhost:3001/check-wordpress', { url });
      console.log('Response from server:', response.data); // Выводим данные ответа в консоль
      if (response.data.hasOwnProperty('isWordPress')) {
        setIsWordPress(response.data.isWordPress);
        setError(false);
        setErrorServ(false);
      } else {
        setErrorServ(true);
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError(true);
      } else {
       setErrorServ(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className='header_block'>
      <h1>WordPress Detector</h1>
      <form onSubmit={handleSubmit}>
        <input className='header_block_string' type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
        <button className='header_block_button' type="submit">Check</button>
      </form>
      {loading && <p>Loading...</p>} 
      {!loading && errorServ && <p className='header_block_error_serv'>Invalid response from server</p>} 
      {!loading && !errorServ && error && <p className='header_block_error'>Failed to check WordPress <br /> (the site doesn"t open) <br /> (or site is incorrect)</p>} 
      {!loading && !errorServ && !error && isWordPress !== null && (
        <p className={isWordPress ? 'using_wordpress' : 'non_using_wordpress'}>
        {isWordPress ? 'This site is using WordPress' : 'This site is not using WordPress'}</p>
      )}
    </div>
  );
}

export default App;
