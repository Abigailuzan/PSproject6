import React from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Conponents/Navbar';
import MovieInfo from '../Conponents/MovieInfo'
import MovieCard  from '../Conponents/MovieCard'
import useLocalStorage from '../UseHooks/useLocalStorage'
import '../Stlyles/Movie.css'
function Movie() {
  const storage = useLocalStorage();
  const { id ,title } = useParams();
  const movies = [
    { title: 'Bruh',  image: 'bruh.jpg' },
    { title: 'Bruh',  image: 'bruh.jpg' },
    { title: 'Bruh',  image: 'bruh.jpg' },
    { title: 'Bruh', image: 'bruh.jpg' },
    { title: 'Bruh',  image: 'bruh.jpg' },
    { title: 'Bruh',  image: 'bruh.jpg' },
    { title: 'Bruh',  image: 'bruh.jpg' },
    { title: 'Movie',  image: 'bruh.jpg' },
  ];
  return (
    <div>
      <Navbar/>
      <h1>{title} </h1>
      < MovieInfo id={id} title={title} />
      <h2>Recommended</h2>
      <div className="home-content">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} storage={storage}/>
        ))}
      </div>
    </div>
  )
}

export default Movie