import React from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Conponents/Navbar'
import EditMovieForm from '../Conponents/EditMovieForm';

function EditMovie() {
  const { id ,title } = useParams();
  const movieData = {
    title:'title',
    description:'description',
    release_year: 1999,
    length:134,
    rating:'PG',
    last_update : new Date(),
    movie_image: "movieImageUrl",
    movie_video: "movieVideoUrl",
  };
  return (
    <div>
       <Navbar/>
       <h1>Edit Movie</h1>
       <EditMovieForm movie={movieData}/>
       </div>
  )
}

export default EditMovie