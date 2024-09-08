import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import CreateAccount from './Pages/CreateAccount';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import UserInfo from './Pages/UserInfo'
import {Route,Routes,Navigate} from "react-router-dom";
import Movie from './Pages/Movie';
import EditMovie from './Pages/EditMovie';
import AddAdmin from './Pages/AddAdmin';
import AddMovie from './Pages/AddMovie';

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
      <Route path="sign-in"element={<SignIn />} />
      <Route path="create-account"element={<CreateAccount />} />
      <Route path="contact-us"element={<ContactUs />} />
      <Route path="about-us"element={<AboutUs />} />
      <Route path="user-info"element={<UserInfo />} />
      <Route path="movie/:id/:title"  >
              <Route index element={<Movie />}/>
              <Route path="edit" element={<EditMovie/>} />
       </Route>
       <Route path="add-admin" element={<AddAdmin />} />
       <Route path="add-movie" element={<AddMovie />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </>
    
  );
}

export default App;
