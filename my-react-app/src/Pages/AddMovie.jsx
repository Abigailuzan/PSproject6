import React from 'react'
import Navbar from '../Conponents/Navbar'
import AddMovieForm from '../Conponents/AddMovieForm'
import axios from "axios";
function AddMovie() {
  function onSubmit(movie){
      axios.post('http://localhost:5000/movies',movie)
          .then(response => {
              console.log('movie added')
              const addedMovie = response.data;
              console.log(addedMovie)
              alert('movie added successfully');
          })
          .catch(error => {
              console.error('There was an error fetching the message!', error);
          });
  }
  return (
    <div>
      <Navbar/>
      <h1>Add a New Movie</h1>
      <AddMovieForm onSubmit={onSubmit}/>
    </div>
  )
}

export default AddMovie