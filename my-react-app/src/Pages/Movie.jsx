import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Conponents/Navbar';
import MovieInfo from '../Conponents/MovieInfo'
import MovieCard  from '../Conponents/MovieCard'
import useLocalStorage from '../UseHooks/useLocalStorage'
import '../Stlyles/Movie.css'
import axios from "axios";
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
  const [movie,setMovie] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/movies/${id}`) // קריאה לשרת כדי להביא את הסרטים
            .then(response => {
                console.log("response data: ",response.data); // תדפיס את הנתונים ב-console לבדיקה
                setMovie(response.data); // שמור את הנתונים ב-state
                console.log(movie)
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, []);
  return (
    <div>
      <Navbar/>
      <h1>{title} </h1>
      < MovieInfo movie={movie} />
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