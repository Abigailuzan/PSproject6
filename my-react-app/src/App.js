import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"

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
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </>
    
  );
}

export default App;
