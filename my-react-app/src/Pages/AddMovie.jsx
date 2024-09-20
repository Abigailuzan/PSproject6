import React, {useEffect, useState} from 'react';
import Navbar from '../Conponents/Navbar';
import AddMovieForm from '../Conponents/AddMovieForm';
import axios from "axios";
import {getAllActorsList, getAllCategoryList} from "../Tools/movieTotalInformation";
import { useNavigate } from 'react-router-dom';

function AddMovie() {
    const [categoryList, setCategoryList] = useState([]);
    const [actors, setActors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategoryList(setCategoryList).then(r => null);
        getAllActorsList(setActors).then(r => null);
    }, []);

    async function onSubmit(movie) {
        try {
            const response = await axios.post('http://localhost:5000/movies', movie);
            console.log('Movie added:', response.data);
            const filmId = response.data.film_id;


            if (movie.actor && movie.actor.length > 0) {
                for (const actor of movie.actor) {
                    const actor_movie_create = {
                        actor_id: actor.actor_id,
                        film_id: filmId,
                        last_update: movie.last_update,
                        verification_email: movie.verification_email
                    };
                    await axios.post(`http://localhost:5000/movieactors`, actor_movie_create);
                }
            }

            const category_movie_create = {
                film_id: filmId,  // שימוש ב filmId מתוך response
                category_id: movie.category.category_id,
                last_update: movie.last_update,
                verification_email: movie.verification_email
            };
            await axios.post(`http://localhost:5000/moviecategories`, category_movie_create);

            alert('Movie added successfully');
            navigate('/home');
        } catch (error) {
            console.error('There was an error submitting the movie data:', error);
        }
    }

    return (
        <div>
            <Navbar />
            <h1>Add a New Movie</h1>
            <AddMovieForm onSubmit={onSubmit} categoryList={categoryList} actorsList={actors} />
        </div>
    );
}

export default AddMovie;
