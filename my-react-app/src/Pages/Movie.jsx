import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from '../Conponents/Navbar';
import MovieInfo from '../Conponents/MovieInfo';
import MovieCard from '../Conponents/MovieCard';
import useLocalStorage from '../UseHooks/useLocalStorage';
import '../Styles/Movie.css';
import axios from 'axios';
import {getTotalMovieInfo} from '../Tools/movieTotalInformation';
const removeDuplicates = (movieList) => {
    const seen = new Set();
    return movieList.filter(movie => {
        const duplicate = seen.has(movie.film_id);
        seen.add(movie.film_id);
        return !duplicate;
    });
};
function Movie() {
    const storage = useLocalStorage();
    const {id, title} = useParams();
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        setMovie({});
        setMovies([]);
        const fetchMovieData = async () => {
            const fetchedMovie = await getTotalMovieInfo(id);
            setMovie(fetchedMovie);
        };

        fetchMovieData().then(r => null);
    }, [id]);
    useEffect(() => {
        const fetchMoviesForCategoryAndActors = async () => {
            let combinedMovieList = []; 
            try {
                if (movie.category_id) {
                    const categoryResponse = await axios.get(`http://localhost:5000/categories/movies/${movie.category_id}`);
                    let categoryMovies = categoryResponse.data.filter(m => m.film_id !== parseInt(id));
                    combinedMovieList = [...categoryMovies];
                }
                if (movie.actors_list && movie.actors_list.length > 0) {
                    for (const actor of movie.actors_list) {
                        if (combinedMovieList.length >= 10) break;

                        try {
                            const actorResponse = await axios.get(`http://localhost:5000/actors/movies/${actor.actor_id}`);
                            let actorMovies = actorResponse.data.filter(m => m.film_id !== parseInt(id));
                            combinedMovieList = [...combinedMovieList, ...actorMovies];
                        } catch (error) {
                            console.error('There was an error fetching movies for actors!', error);
                        }
                    }
                }
                combinedMovieList = removeDuplicates(combinedMovieList);
                setMovies(combinedMovieList.slice(0, 10));
            } catch (error) {
                console.error('There was an error fetching category or actor movies!', error);
            }
        };

        if (movie.category_id || (movie.actors_list && movie.actors_list.length > 0)) {
            fetchMoviesForCategoryAndActors().then(r => null);
        }
    }, [movie.category_id, movie.actors_list, id, movie]);

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
