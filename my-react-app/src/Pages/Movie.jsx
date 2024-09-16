import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from '../Conponents/Navbar';
import MovieInfo from '../Conponents/MovieInfo';
import MovieCard from '../Conponents/MovieCard';
import useLocalStorage from '../UseHooks/useLocalStorage';
import '../Stlyles/Movie.css';
import axios from 'axios';
import {getTotalMovieInfo}from '../Tools/movieTotalInformation'
function Movie() {
    const storage = useLocalStorage();
    const {id, title} = useParams();
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState({});


    useEffect(() => {
        setMovie({});
        setMovies([]);
        const fetchMovieData = async () => {
            const fetchedMovie = await getTotalMovieInfo(id); // מחכה עד שהפונקציה תחזיר את הערכים
            setMovie(fetchedMovie); // שומר את הערך שהתקבל במשתנה movie
        };

        fetchMovieData().then(r => null); // קריאה לפונקציה האסינכרונית
    }, [id]);

    useEffect(() => {
        const fetchMoviesForCategory = async () => {
            try {
                let movieList = []; // איפוס רשימת הסרטים
                const response = await axios.get(`http://localhost:5000/categories/movies/${movie.category_id}`);
                const categoryMovies = response.data;
                console.log(categoryMovies)
                // נוסיף עד 5 סרטים מאותה קטגוריה
                movieList = [...categoryMovies.slice(0, 5)];

                setMovies(movieList); // עדכון state של הסרטים
            } catch (error) {
                console.error('There was an error fetching category movies!', error);
            }
        };

        if (movie.category_id) {
            fetchMoviesForCategory().then();
        }
    }, [movie.category_id]);
    useEffect(() => {
        const fetchMoviesForActors = async () => {
            let movieList = [...movies]; // רשימה מצטברת לסרטים
            if (movie.actors_list && movie.actors_list.length > 0) {
                for (const actor of movie.actors_list) {
                    if (movieList.length >= 10) break; // אם כבר יש 10 סרטים, מפסיקים

                    try {
                        const response = await axios.get(`http://localhost:5000/actors/movies/${actor.actor_id}`);
                        const actorMovies = response.data;
                        console.log(actorMovies)

                        // נוסיף סרטים רק עד שנגיע ל-10 סרטים בסה"כ
                        if (actorMovies.length + movieList.length <= 10) {
                            movieList = [...movieList, ...actorMovies];
                        } else {
                            const remaining = 10 - movieList.length;
                            movieList = [...movieList, ...actorMovies.slice(0, remaining)];
                        }
                    } catch (error) {
                        console.error('There was an error fetching movies for actors!', error);
                    }
                }
                setMovies(movieList); // עדכון state של הסרטים
            }
        };

        if (movie.actors_list && movie.actors_list.length > 0) {
            fetchMoviesForActors().then(r => null);
        }
    }, [movie.actors_list]);

    return (
        <div>
            <Navbar/>
            <h1>{title}</h1>
            <MovieInfo movie={movie}/>
            <h2>Recommended</h2>
            <div className="home-content">
                {movies.map((movie, index) => (
                    <MovieCard key={index} {...movie} storage={storage}/>
                ))}
            </div>
        </div>
    );
}

export default Movie;
