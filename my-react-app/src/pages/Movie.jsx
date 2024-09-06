import React from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Conponents/Navbar';
import MovieInfo from '../Conponents/MovieInfo'

function Movie() {
  const { title } = useParams();
  return (
    <div>
      <Navbar/>
      <h1>{title} </h1>
      <MovieInfo/>
    </div>
  )
}

export default Movie