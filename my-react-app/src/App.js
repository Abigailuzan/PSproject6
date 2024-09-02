import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Conponents/Home';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          console.error('There was an error fetching the message!', error);
        });
  }, []);

  return (
      <div>
        <h1>{message}</h1> 
        {/* <Home/> */}
      </div>
    
  );
}

export default App;
