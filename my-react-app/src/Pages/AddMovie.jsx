import React from 'react'
import Navbar from '../Conponents/Navbar'
import AddMovieForm from '../Conponents/AddMovieForm'
function AddMovie() {
  function onSubmit(movie){
    console.log(movie);
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